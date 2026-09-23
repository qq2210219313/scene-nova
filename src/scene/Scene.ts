import * as THREE from "three";

import { loadColorTexture } from "./loaders";
import type {
  BackgroundImageOptions,
  BackgroundInput,
  BackgroundOptions,
  ExpFogOptions,
  LinearFogOptions,
  SceneOptions,
} from "./types";

/**
 * Scene（场景）
 *
 * 继承自 `THREE.Scene`，在保留 Three.js 原生能力的基础上，提供三维环境的简化管理：
 *
 * - 背景（纯色 / 二维图片 / 立方体天空盒 / 等距柱状全景，支持亮度与模糊度）
 * - 环境贴图（environment）
 * - 雾（线性雾 / 指数距离雾）
 * - 覆盖材质（overrideMaterial）
 *
 * 所有设置方法均返回实例本身，支持链式调用：
 *
 * ```ts
 * const scene = new Scene({
 *   background: { equirectangular: hdrTexture, blurriness: 0.4 },
 *   fog: { color: "#0b0e14", near: 10, far: 100 },
 * });
 * ```
 */
export class Scene extends THREE.Scene {
  /**
   * 创建场景，可在构造时传入初始配置（详见 {@link SceneOptions}）。
   *
   * ```ts
   * const scene = new Scene({
   *   background: "#0b0e14",
   *   fog: { color: "#0b0e14", near: 10, far: 100 },
   *   backgroundIntensity: 1.2,
   * });
   * ```
   */
  constructor(options: SceneOptions = {}) {
    super();

    if (options.background !== undefined) {
      this.setBackground(options.background);
    }

    if (options.backgroundBlurriness !== undefined) {
      this.setBackgroundBlurriness(options.backgroundBlurriness);
    }

    if (options.backgroundIntensity !== undefined) {
      this.setBackgroundIntensity(options.backgroundIntensity);
    }

    if (options.environment !== undefined) {
      this.setEnvironment(options.environment);
    }

    if (options.fog !== undefined) {
      if (options.fog.type === "exp2") {
        this.setFogExp2(options.fog);
      } else {
        this.setFog(options.fog);
      }
    }

    if (options.overrideMaterial !== undefined) {
      this.setOverrideMaterial(options.overrideMaterial);
    }
  }

  /**
   * 设置场景背景，支持四种类型（详见 {@link BackgroundInput}）：
   *
   * - 纯色：传 `ColorRepresentation`，或 `{ color }`
   * - 二维图片：传纹理，或 `{ texture, intensity? }`
   * - 立方体天空盒：传 `CubeTexture`，或 `{ cube, intensity?, blurriness? }`
   * - 全景（HDR / 360°）：`{ equirectangular, intensity?, blurriness? }`
   *
   * 传入 `null` 清除背景。
   */
  setBackground(background: BackgroundInput): this {
    if (background === null) {
      this.background = null;

      return this;
    }

    if (background instanceof THREE.Color || background instanceof THREE.Texture) {
      this.background = background;

      return this;
    }

    if (typeof background === "object") {
      return this.applyBackgroundOptions(background);
    }

    this.background = new THREE.Color(background);

    return this;
  }

  /**
   * 加载图片并设置为场景背景。
   *
   * @param url 图片地址
   * @param options 背景图片配置（全景、亮度、模糊度）
   */
  async setBackgroundFromUrl(url: string, options: BackgroundImageOptions = {}): Promise<this> {
    const texture = await loadColorTexture(url);

    if (options.equirectangular === true) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    }

    this.background = texture;

    if (options.intensity !== undefined) {
      this.backgroundIntensity = options.intensity;
    }

    if (options.blurriness !== undefined) {
      this.backgroundBlurriness = options.blurriness;
    }

    return this;
  }

  /**
   * 设置背景模糊度（`0` - `1`，默认 `0`）。
   *
   * 仅对天空盒（CubeTexture）与等距柱状全景背景生效。
   */
  setBackgroundBlurriness(blurriness: number): this {
    this.backgroundBlurriness = blurriness;

    return this;
  }

  /**
   * 设置背景亮度（默认 `1`）。
   */
  setBackgroundIntensity(intensity: number): this {
    this.backgroundIntensity = intensity;

    return this;
  }

  /**
   * 设置环境贴图（`null` 为清除）。
   *
   * 如需使用 360° 全景图，请将纹理的 `mapping` 设置为
   * `THREE.EquirectangularReflectionMapping`，或直接使用 {@link setEnvironmentFromUrl}。
   */
  setEnvironment(environment: THREE.Texture | null): this {
    this.environment = environment;

    return this;
  }

  /**
   * 加载图片并按等距柱状（equirectangular）360° 全景图设置为环境贴图。
   */
  async setEnvironmentFromUrl(url: string): Promise<this> {
    const texture = await loadColorTexture(url);
    texture.mapping = THREE.EquirectangularReflectionMapping;

    this.environment = texture;

    return this;
  }

  /**
   * 设置线性距离雾（对应 `THREE.Fog`）：从 `near` 开始，到 `far` 完全遮蔽。
   */
  setFog(options: LinearFogOptions = {}): this {
    const { color = "#ffffff", near = 1, far = 1000 } = options;
    this.fog = new THREE.Fog(color, near, far);

    return this;
  }

  /**
   * 设置指数距离雾（对应 `THREE.FogExp2`）：按 `density` 指数衰减。
   */
  setFogExp2(options: ExpFogOptions = {}): this {
    const { color = "#ffffff", density = 0.00025 } = options;
    this.fog = new THREE.FogExp2(color, density);

    return this;
  }

  /**
   * 清除雾效。
   */
  clearFog(): this {
    this.fog = null;

    return this;
  }

  /**
   * 设置覆盖材质（`null` 为清除）：设置后场景内所有对象都使用该材质渲染。
   */
  setOverrideMaterial(material: THREE.Material | null): this {
    this.overrideMaterial = material;

    return this;
  }

  /**
   * 应用配置形式的背景（纯色 / 二维图片 / 天空盒 / 全景）。
   */
  private applyBackgroundOptions(options: BackgroundOptions): this {
    if ("color" in options) {
      this.background = new THREE.Color(options.color);

      return this;
    }

    if ("texture" in options) {
      this.background = options.texture;
    } else if ("cube" in options) {
      this.background = options.cube;
    } else {
      options.equirectangular.mapping = THREE.EquirectangularReflectionMapping;
      this.background = options.equirectangular;
    }

    if ("intensity" in options && options.intensity !== undefined) {
      this.backgroundIntensity = options.intensity;
    }

    if ("blurriness" in options && options.blurriness !== undefined) {
      this.backgroundBlurriness = options.blurriness;
    }

    return this;
  }
}

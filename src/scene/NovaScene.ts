import * as THREE from "three";

import { loadColorTexture } from "./loaders";
import type { BackgroundImageOptions, ExpFogOptions, LinearFogOptions } from "./types";

/**
 * NovaScene（场景）
 *
 * 继承自 `THREE.Scene`，在保留 Three.js 原生能力的基础上，提供三维环境的简化管理：
 *
 * - 背景（背景颜色 / 背景图片 / 360° 全景）
 * - 环境贴图（environment）
 * - 雾（线性雾 / 指数距离雾）
 * - 覆盖材质（overrideMaterial）
 *
 * 所有设置方法均返回实例本身，支持链式调用：
 *
 * ```ts
 * const scene = new NovaScene()
 *   .setBackground("#0b0e14")
 *   .setFog({ color: "#0b0e14", near: 10, far: 100 });
 * ```
 */
export class NovaScene extends THREE.Scene {
  /**
   * 设置场景背景。
   *
   * - `string` / `number` / `THREE.Color`：纯色背景
   * - `THREE.Texture`：图片背景
   * - `null`：清除背景
   */
  setBackground(background: THREE.ColorRepresentation | THREE.Texture | null): this {
    if (
      background === null ||
      background instanceof THREE.Color ||
      background instanceof THREE.Texture
    ) {
      this.background = background;
    } else {
      this.background = new THREE.Color(background);
    }

    return this;
  }

  /**
   * 加载图片并设置为场景背景。
   *
   * @param url 图片地址
   * @param options 背景图片配置（如是否为 360° 全景图）
   */
  async setBackgroundFromUrl(url: string, options: BackgroundImageOptions = {}): Promise<this> {
    const texture = await loadColorTexture(url);

    if (options.equirectangular === true) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    }

    this.background = texture;

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
}

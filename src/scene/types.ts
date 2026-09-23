import type * as THREE from "three";

/**
 * 纯色背景配置。
 */
export interface ColorBackgroundOptions {
  /** 背景颜色 */
  color: THREE.ColorRepresentation;
}

/**
 * 二维图片背景配置。
 */
export interface TextureBackgroundOptions {
  /** 背景纹理 */
  texture: THREE.Texture;
  /** 背景亮度，默认 `1` */
  intensity?: number;
}

/**
 * 立方体天空盒背景配置。
 */
export interface CubeBackgroundOptions {
  /** 立方体纹理（天空盒） */
  cube: THREE.CubeTexture;
  /** 背景亮度，默认 `1` */
  intensity?: number;
  /** 背景模糊度（`0` - `1`），默认 `0` */
  blurriness?: number;
}

/**
 * 等距柱状（HDR / 全景图）背景配置。
 *
 * 会自动将纹理的 `mapping` 设置为 `THREE.EquirectangularReflectionMapping`。
 */
export interface EquirectangularBackgroundOptions {
  /** 等距柱状全景纹理（HDR / 360° 全景图） */
  equirectangular: THREE.Texture;
  /** 背景亮度，默认 `1` */
  intensity?: number;
  /** 背景模糊度（`0` - `1`），默认 `0` */
  blurriness?: number;
}

/**
 * 背景配置：按背景类型传入对应参数。
 */
export type BackgroundOptions =
  | ColorBackgroundOptions
  | TextureBackgroundOptions
  | CubeBackgroundOptions
  | EquirectangularBackgroundOptions;

/**
 * `setBackground` 支持的输入：
 *
 * - `ColorRepresentation`：纯色背景
 * - `THREE.Texture`：二维图片背景
 * - `THREE.CubeTexture`：立方体天空盒背景
 * - {@link BackgroundOptions}：需要附加参数（亮度 / 模糊度）或全景背景时使用
 * - `null`：清除背景
 */
export type BackgroundInput = THREE.ColorRepresentation | THREE.Texture | BackgroundOptions | null;

/**
 * 线性距离雾（`THREE.Fog`）配置。
 */
export interface LinearFogOptions {
  /** 雾颜色，默认 `"#ffffff"` */
  color?: THREE.ColorRepresentation;
  /** 雾开始的距离，默认 `1` */
  near?: number;
  /** 雾完全遮蔽的距离，默认 `1000` */
  far?: number;
}

/**
 * 指数距离雾（`THREE.FogExp2`）配置。
 */
export interface ExpFogOptions {
  /** 雾颜色，默认 `"#ffffff"` */
  color?: THREE.ColorRepresentation;
  /** 雾浓度，默认 `0.00025` */
  density?: number;
}

/**
 * 雾配置（线性雾或指数距离雾）。
 */
export type FogOptions =
  ({ type?: "linear" } & LinearFogOptions) | ({ type: "exp2" } & ExpFogOptions);

/**
 * 背景图片配置（用于 `setBackgroundFromUrl`）。
 */
export interface BackgroundImageOptions {
  /**
   * 是否按等距柱状（equirectangular）360° 全景图处理。
   *
   * - `false`（默认）：普通图片背景
   * - `true`：全景背景
   */
  equirectangular?: boolean;
  /** 背景亮度，默认 `1` */
  intensity?: number;
  /** 背景模糊度（`0` - `1`），默认 `0`（仅全景背景生效） */
  blurriness?: number;
}

/**
 * 场景初始化配置（`new Scene(options)`）。
 */
export interface SceneOptions {
  /** 初始背景，参数同 {@link BackgroundInput} */
  background?: BackgroundInput;
  /** 初始背景模糊度（`0` - `1`），设置后优先级高于背景配置中的同名参数 */
  backgroundBlurriness?: number;
  /** 初始背景亮度，设置后优先级高于背景配置中的同名参数 */
  backgroundIntensity?: number;
  /** 初始环境贴图 */
  environment?: THREE.Texture | null;
  /** 初始雾 */
  fog?: FogOptions;
  /** 初始覆盖材质 */
  overrideMaterial?: THREE.Material | null;
}

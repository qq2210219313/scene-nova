import type * as THREE from "three";

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
 * 背景图片配置。
 */
export interface BackgroundImageOptions {
  /**
   * 是否按等距柱状（equirectangular）360° 全景图处理。
   *
   * - `false`（默认）：普通图片背景
   * - `true`：全景背景
   */
  equirectangular?: boolean;
}

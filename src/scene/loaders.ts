import * as THREE from "three";

/**
 * 加载颜色纹理（图片），并按 sRGB 颜色空间处理。
 *
 * 仅供模块内部使用。
 */
export function loadColorTexture(url: string): Promise<THREE.Texture> {
  const loader = new THREE.TextureLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        // LDR 图片使用 sRGB 颜色空间（three r152+ 需要显式设置）
        texture.colorSpace = THREE.SRGBColorSpace;
        resolve(texture);
      },
      undefined,
      (error) => {
        reject(new Error(`纹理加载失败：${url}`, { cause: error }));
      },
    );
  });
}

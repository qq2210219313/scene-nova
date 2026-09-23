import * as THREE from "three";
import { describe, expect, it } from "vitest";

import { Scene } from "../src";

describe("Scene", () => {
  it("继承自 THREE.Scene", () => {
    expect(new Scene()).toBeInstanceOf(THREE.Scene);
  });

  describe("构造函数", () => {
    it("支持传入初始配置", () => {
      const scene = new Scene({
        background: "#0b0e14",
        backgroundBlurriness: 0.5,
        backgroundIntensity: 1.2,
        environment: null,
        fog: { color: "#aabbcc", near: 5, far: 50 },
        overrideMaterial: null,
      });

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect(scene.backgroundBlurriness).toBe(0.5);
      expect(scene.backgroundIntensity).toBe(1.2);
      expect(scene.fog).toBeInstanceOf(THREE.Fog);
      expect((scene.fog as THREE.Fog).near).toBe(5);
    });

    it("fog 支持指数雾配置", () => {
      const scene = new Scene({ fog: { type: "exp2", color: "#123456", density: 0.05 } });

      expect(scene.fog).toBeInstanceOf(THREE.FogExp2);
      expect((scene.fog as THREE.FogExp2).density).toBe(0.05);
    });

    it("背景配置中的亮度与模糊度生效", () => {
      const scene = new Scene({
        background: { equirectangular: new THREE.Texture(), blurriness: 0.4, intensity: 1.5 },
      });

      expect(scene.backgroundBlurriness).toBe(0.4);
      expect(scene.backgroundIntensity).toBe(1.5);
    });
  });

  it("所有设置方法支持链式调用", () => {
    const scene = new Scene();
    const result = scene
      .setBackground({ color: "#000000" })
      .setBackgroundBlurriness(0)
      .setBackgroundIntensity(1)
      .setEnvironment(null)
      .setFog({})
      .setOverrideMaterial(null)
      .clearFog();

    expect(result).toBe(scene);
  });

  describe("背景", () => {
    it("支持十六进制字符串颜色", () => {
      const scene = new Scene();
      scene.setBackground("#112233");

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect((scene.background as THREE.Color).getHexString()).toBe("112233");
    });

    it("支持数值颜色", () => {
      const scene = new Scene();
      scene.setBackground(0xff0000);

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect((scene.background as THREE.Color).getHexString()).toBe("ff0000");
    });

    it("支持 THREE.Color 实例", () => {
      const scene = new Scene();
      const color = new THREE.Color("#336699");
      scene.setBackground(color);

      expect(scene.background).toBe(color);
    });

    it("支持纹理", () => {
      const scene = new Scene();
      const texture = new THREE.Texture();
      scene.setBackground(texture);

      expect(scene.background).toBe(texture);
    });

    it("传入 null 清除背景", () => {
      const scene = new Scene();
      scene.setBackground("#ffffff").setBackground(null);

      expect(scene.background).toBeNull();
    });
  });

  describe("背景（配置对象）", () => {
    it("{ color } 纯色背景", () => {
      const scene = new Scene();
      scene.setBackground({ color: "#112233" });

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect((scene.background as THREE.Color).getHexString()).toBe("112233");
    });

    it("{ texture } 二维图片背景（可带亮度）", () => {
      const scene = new Scene();
      const texture = new THREE.Texture();
      scene.setBackground({ texture, intensity: 0.8 });

      expect(scene.background).toBe(texture);
      expect(scene.backgroundIntensity).toBe(0.8);
    });

    it("{ cube } 立方体天空盒背景（可带亮度与模糊度）", () => {
      const scene = new Scene();
      const cube = new THREE.CubeTexture();
      scene.setBackground({ cube, intensity: 1.5, blurriness: 0.4 });

      expect(scene.background).toBe(cube);
      expect(scene.backgroundIntensity).toBe(1.5);
      expect(scene.backgroundBlurriness).toBe(0.4);
    });

    it("{ equirectangular } HDR / 全景背景（自动设置映射）", () => {
      const scene = new Scene();
      const texture = new THREE.Texture();
      scene.setBackground({ equirectangular: texture, blurriness: 0.3 });

      expect(scene.background).toBe(texture);
      expect(texture.mapping).toBe(THREE.EquirectangularReflectionMapping);
      expect(scene.backgroundBlurriness).toBe(0.3);
    });

    it("支持传入裸 CubeTexture（自动作为天空盒）", () => {
      const scene = new Scene();
      const cube = new THREE.CubeTexture();
      scene.setBackground(cube);

      expect(scene.background).toBe(cube);
    });
  });

  describe("背景模糊度与亮度", () => {
    it("支持独立设置并返回实例", () => {
      const scene = new Scene();

      expect(scene.setBackgroundBlurriness(0.6)).toBe(scene);
      expect(scene.setBackgroundIntensity(2)).toBe(scene);
      expect(scene.backgroundBlurriness).toBe(0.6);
      expect(scene.backgroundIntensity).toBe(2);
    });
  });

  describe("雾", () => {
    it("setFog 使用默认值创建线性雾", () => {
      const scene = new Scene();
      scene.setFog();

      expect(scene.fog).toBeInstanceOf(THREE.Fog);
      const fog = scene.fog as THREE.Fog;
      expect(fog.near).toBe(1);
      expect(fog.far).toBe(1000);
    });

    it("setFog 应用自定义参数", () => {
      const scene = new Scene();
      scene.setFog({ color: "#aabbcc", near: 5, far: 50 });

      const fog = scene.fog as THREE.Fog;
      expect(fog.color.getHexString()).toBe("aabbcc");
      expect(fog.near).toBe(5);
      expect(fog.far).toBe(50);
    });

    it("setFogExp2 使用默认浓度创建指数雾", () => {
      const scene = new Scene();
      scene.setFogExp2();

      expect(scene.fog).toBeInstanceOf(THREE.FogExp2);
      expect((scene.fog as THREE.FogExp2).density).toBe(0.00025);
    });

    it("setFogExp2 应用自定义参数", () => {
      const scene = new Scene();
      scene.setFogExp2({ color: "#123456", density: 0.05 });

      const fog = scene.fog as THREE.FogExp2;
      expect(fog.color.getHexString()).toBe("123456");
      expect(fog.density).toBe(0.05);
    });

    it("clearFog 清除雾效", () => {
      const scene = new Scene();
      scene.setFog().clearFog();

      expect(scene.fog).toBeNull();
    });
  });

  describe("环境贴图", () => {
    it("支持设置与清除", () => {
      const scene = new Scene();
      const texture = new THREE.Texture();

      scene.setEnvironment(texture);
      expect(scene.environment).toBe(texture);

      scene.setEnvironment(null);
      expect(scene.environment).toBeNull();
    });
  });

  describe("覆盖材质", () => {
    it("支持设置与清除", () => {
      const scene = new Scene();
      const material = new THREE.MeshBasicMaterial();

      scene.setOverrideMaterial(material);
      expect(scene.overrideMaterial).toBe(material);

      scene.setOverrideMaterial(null);
      expect(scene.overrideMaterial).toBeNull();
    });
  });
});

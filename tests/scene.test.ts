import * as THREE from "three";
import { describe, expect, it } from "vitest";

import { NovaScene } from "../src";

describe("NovaScene", () => {
  it("继承自 THREE.Scene", () => {
    expect(new NovaScene()).toBeInstanceOf(THREE.Scene);
  });

  it("所有设置方法支持链式调用", () => {
    const scene = new NovaScene();
    const result = scene
      .setBackground("#000000")
      .setEnvironment(null)
      .setFog({})
      .setOverrideMaterial(null)
      .clearFog();

    expect(result).toBe(scene);
  });

  describe("背景", () => {
    it("支持十六进制字符串颜色", () => {
      const scene = new NovaScene();
      scene.setBackground("#112233");

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect((scene.background as THREE.Color).getHexString()).toBe("112233");
    });

    it("支持数值颜色", () => {
      const scene = new NovaScene();
      scene.setBackground(0xff0000);

      expect(scene.background).toBeInstanceOf(THREE.Color);
      expect((scene.background as THREE.Color).getHexString()).toBe("ff0000");
    });

    it("支持 THREE.Color 实例", () => {
      const scene = new NovaScene();
      const color = new THREE.Color("#336699");
      scene.setBackground(color);

      expect(scene.background).toBe(color);
    });

    it("支持纹理", () => {
      const scene = new NovaScene();
      const texture = new THREE.Texture();
      scene.setBackground(texture);

      expect(scene.background).toBe(texture);
    });

    it("传入 null 清除背景", () => {
      const scene = new NovaScene();
      scene.setBackground("#ffffff").setBackground(null);

      expect(scene.background).toBeNull();
    });
  });

  describe("雾", () => {
    it("setFog 使用默认值创建线性雾", () => {
      const scene = new NovaScene();
      scene.setFog();

      expect(scene.fog).toBeInstanceOf(THREE.Fog);
      const fog = scene.fog as THREE.Fog;
      expect(fog.near).toBe(1);
      expect(fog.far).toBe(1000);
    });

    it("setFog 应用自定义参数", () => {
      const scene = new NovaScene();
      scene.setFog({ color: "#aabbcc", near: 5, far: 50 });

      const fog = scene.fog as THREE.Fog;
      expect(fog.color.getHexString()).toBe("aabbcc");
      expect(fog.near).toBe(5);
      expect(fog.far).toBe(50);
    });

    it("setFogExp2 使用默认浓度创建指数雾", () => {
      const scene = new NovaScene();
      scene.setFogExp2();

      expect(scene.fog).toBeInstanceOf(THREE.FogExp2);
      expect((scene.fog as THREE.FogExp2).density).toBe(0.00025);
    });

    it("setFogExp2 应用自定义参数", () => {
      const scene = new NovaScene();
      scene.setFogExp2({ color: "#123456", density: 0.05 });

      const fog = scene.fog as THREE.FogExp2;
      expect(fog.color.getHexString()).toBe("123456");
      expect(fog.density).toBe(0.05);
    });

    it("clearFog 清除雾效", () => {
      const scene = new NovaScene();
      scene.setFog().clearFog();

      expect(scene.fog).toBeNull();
    });
  });

  describe("环境贴图", () => {
    it("支持设置与清除", () => {
      const scene = new NovaScene();
      const texture = new THREE.Texture();

      scene.setEnvironment(texture);
      expect(scene.environment).toBe(texture);

      scene.setEnvironment(null);
      expect(scene.environment).toBeNull();
    });
  });

  describe("覆盖材质", () => {
    it("支持设置与清除", () => {
      const scene = new NovaScene();
      const material = new THREE.MeshBasicMaterial();

      scene.setOverrideMaterial(material);
      expect(scene.overrideMaterial).toBe(material);

      scene.setOverrideMaterial(null);
      expect(scene.overrideMaterial).toBeNull();
    });
  });
});

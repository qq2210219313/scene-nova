<script setup lang="ts">
import * as THREE from "three";
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 基础场景演示（占位实现）
 *
 * TODO: scene-nova 模块 API 实现后，用 Engine / Scene / Camera / Render 替换以下原生 Three.js 代码。
 */

const container = ref<HTMLDivElement>();

let dispose: (() => void) | undefined;

onMounted(() => {
  const el = container.value;
  if (!el) {
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0e14);

  const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
  camera.position.set(2, 2, 3);
  camera.lookAt(0, 0, 0);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x4f8cff }),
  );
  scene.add(cube);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2.5));

  const onResize = () => {
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(el.clientWidth, el.clientHeight);
  };
  window.addEventListener("resize", onResize);

  renderer.setAnimationLoop(() => {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  });

  dispose = () => {
    window.removeEventListener("resize", onResize);
    renderer.setAnimationLoop(null);
    renderer.dispose();
    el.removeChild(renderer.domElement);
  };
});

onBeforeUnmount(() => {
  dispose?.();
});
</script>

<template>
  <div ref="container" class="scene-demo" />
</template>

<style scoped>
.scene-demo {
  width: 100%;
  height: 420px;
  overflow: hidden;
  background: #0b0e14;
  border-radius: 8px;
}
</style>

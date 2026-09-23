import * as THREE from "three";

import { Scene } from "scene-nova";

/**
 * scene-nova 开发沙盒
 *
 * 用于在开发期间快速验证库功能（源码直连，修改 `src/` 会立即热更新）。
 * Scene 模块已接入；Camera / Render / Factory 等模块实现后将逐步替换为库能力。
 */

const canvas = document.querySelector<HTMLCanvasElement>("#app");
if (!canvas) {
  throw new Error("未找到 #app canvas 元素");
}

// 渲染器（待 Render 模块实现后替换）
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// —— Scene：使用 scene-nova 管理三维环境 ——
const scene = new Scene();
scene.setBackground("#0b0e14");
scene.setFog({ color: "#0b0e14", near: 5, far: 15 });

// 相机（待 Camera 模块实现后替换）
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x4f8cff }),
);
scene.add(cube);
scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2.5));

// 地面网格：用于观察雾效
const grid = new THREE.GridHelper(24, 24, 0x335588, 0x223344);
grid.position.y = -1;
scene.add(grid);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});

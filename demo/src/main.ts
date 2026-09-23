import * as THREE from "three";

/**
 * scene-nova 开发沙盒
 *
 * 用于在开发期间快速验证库功能（源码直连，修改 `src/` 会立即热更新）。
 * 下面是一个原生 Three.js 的最小场景，待模块 API 实现后替换为 scene-nova 用法。
 */

const canvas = document.querySelector<HTMLCanvasElement>("#app");
if (!canvas) {
  throw new Error("未找到 #app canvas 元素");
}

// TODO: 使用 scene-nova 的 Engine / Scene / Camera / Render 替换以下原生代码
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0e14);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x4f8cff }),
);
scene.add(cube);
scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2.5));

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

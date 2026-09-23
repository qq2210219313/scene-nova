# 基础场景

一个最小化的 3D 场景演示：渲染循环 + 旋转立方体。

> 当前演示使用原生 Three.js 实现（占位），待 scene-nova 模块 API 就绪后替换为库的用法。

<ClientOnly>
  <SceneDemo />
</ClientOnly>

## 核心代码

```ts
// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0e14);

// 相机
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);

// 渲染循环
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});
```

完整源码见 `examples/.vitepress/theme/components/SceneDemo.vue`。

# 基础场景

一个最小化的 3D 场景演示：渲染循环 + 旋转立方体。

> 场景环境部分已使用 scene-nova 的 Scene 模块，其余部分待对应模块实现后替换。

<ClientOnly>
  <SceneDemo />
</ClientOnly>

## 核心代码

```ts
// 场景（scene-nova）
const scene = new Scene();
scene.setBackground("#0b0e14");
scene.setFog({ color: "#0b0e14", near: 5, far: 15 });

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

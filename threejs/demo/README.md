# render中调用动画效果

```js
// import { tadpoleMove } from './part/lightRain.js'
// import initLight from './part/pointLight.js'
// import getGroup from './group.js'

// 添加对象
// group中包含text对象需要引入字体文件后再操作，所以用了异步
let { group, lightRain, ring, lineCircleDash, point } = await getGroup();  // await
scene.add(group);
// 光源
initLight(scene)
// 动画
let angle = 0;
let R = 5.1;
function centerGroupAnimate() {
    ring.rotation.z += 0.002
    lineCircleDash.rotation.z -= 0.002
    angle -= 0.004;
    point.position.x = R * Math.sin(angle);
    point.position.y = R * Math.cos(angle);
    lightRain.forEach(item => {
        tadpoleMove(item)
    })
}
```



# part/modules.js 引用路径调整

```js
import { FontLoader } from '../../jsm/loaders/FontLoader.js';
import { TextGeometry } from '../../jsm/geometries/
...
// vue环境下路径调整
// 所有引用的模块都在此文件中统一引用
```


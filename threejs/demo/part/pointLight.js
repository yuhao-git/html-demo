import {THREE} from './modules.js'
// 光源
export default function getPointinitLight(scene,option) {
    const group = new THREE.Group();
    let params = {
        x: -10, y: 0, z: 10, ...option
    }
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    // let ambientLight = new THREE.AmbientLight("#111111");
    // group.add(ambientLight);
    // 电光源
    let pointLight = new THREE.PointLight("#ffffff", 0.8);
    pointLight.position.set(params.x, params.y, params.z);

    // 需要开启阴影投射
    pointLight.castShadow = true;
    group.add(pointLight)
    scene.add(group)
    return group
}

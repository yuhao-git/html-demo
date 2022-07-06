export default function getPointinitLight(option) {
    const group = new THREE.Group();
    let params = {
        x: -10, y: 0, z: 10, ...option
    }
    let ambientLight = new THREE.AmbientLight("#111111");
    group.add(ambientLight);

    let pointLight = new THREE.PointLight("#ffffff", 0.8);
    pointLight.position.set(params.x, params.y, params.z);

    //告诉平行光需要开启阴影投射
    pointLight.castShadow = true;
    group.add(pointLight)
    return group
}

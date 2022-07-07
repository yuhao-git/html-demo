var spriteMap = new THREE.TextureLoader().load('./img/circle.png');
function getCirclePlane(position = { x: 0, y: 0, z: 0 }) {
    var material = new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0xffffff,
        map: spriteMap,
        side: THREE.DoubleSide,
        opacity: 0.8
    });

    const geometry = new THREE.CircleGeometry(5, 100);
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(position.x,position.y,position.z);
    return circle;
}

export default getCirclePlane;


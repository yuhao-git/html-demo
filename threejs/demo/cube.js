
var spriteMap = new THREE.TextureLoader().load('../../assets/img/circle.png');
// mesh
var geometry = new THREE.BoxGeometry(1, 0.2, 1);
// 材质
var material = new THREE.MeshBasicMaterial({ map: spriteMap });
// var material = new THREE.MeshMatcapMaterial({ color: 0xf0f2f0 });

// 正方体
var cube = new THREE.Mesh(geometry, material);

export default cube;
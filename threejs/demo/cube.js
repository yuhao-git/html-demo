var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ffff
});

let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 2;
cube.rotateZ(10)
cube.rotateY(10)
//告诉立方体需要投射阴影
cube.castShadow = true;

export default cube
// Smiley
let size = 2;
let holeSize = 2;
const shape = new THREE.Shape()
    .moveTo(0, 0)
    .absarc(size, size, size, 0, Math.PI * 2, false);


const smileyEye1Path = new THREE.Path()
    .moveTo(2, 2)
    .absellipse(holeSize, holeSize, holeSize, holeSize, 0, Math.PI * 2, true);

// const smileyEye2Path = new THREE.Path()
//     .moveTo(65, 20)
//     .absarc(55, 20, 10, 0, Math.PI * 2, true);

// const smileyMouthPath = new THREE.Path()
//     .moveTo(20, 40)
//     .quadraticCurveTo(40, 60, 60, 40)
//     .bezierCurveTo(70, 45, 70, 50, 60, 60)
//     .quadraticCurveTo(40, 80, 20, 60)
//     .quadraticCurveTo(5, 50, 20, 40);

// shape.holes.push(smileyEye1Path);
// shape.holes.push(smileyEye2Path);
// shape.holes.push(smileyMouthPath);


var geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.8,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1
});
let material = new THREE.MeshMatcapMaterial({
    transparent: true,
    color: 0xffffff,
    opacity: 0.2,

})

var mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(-size, -size, 0);

export default mesh;


var textureLoader = new THREE.TextureLoader();
// 加载贴图
var texture = textureLoader.load("../../assets/img/point.png");
// 点精灵材质
var spriteMaterial = new THREE.SpriteMaterial({
  map: texture,//贴图
  color: 0xffffff,
  // transparent: true,
  blending: THREE.AdditiveBlending,//在使用此材质显示对象时要使用何种混合。加法
});
var sprite = new THREE.Sprite(spriteMaterial);

var geometry = new THREE.SphereGeometry(0, 0, 0);
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  
});
var mesh = new THREE.Mesh(geometry, material);
// 发光范围
mesh.scale.set(1.2, 0.5, 1);
mesh.position.set(4.77, 0, -0.1)

mesh.add(sprite);

export default mesh
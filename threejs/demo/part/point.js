import {THREE} from './modules.js'

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load("../../assets/img/point.png");

// 点精灵材质
var spriteMaterial = new THREE.SpriteMaterial({
  map: texture,//贴图
  color: 0xffffff,
  transparent: true,
  opacity: 1,
  blending: THREE.AdditiveBlending,//在使用此材质显示对象时要使用何种混合。加法
  alphaTest: 0.025  // 不透明度低于此值，则不会渲染材质
});


var sprite = new THREE.Sprite(spriteMaterial);

var geometry = new THREE.SphereGeometry(0, 0, 0);
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0,
});
var mesh = new THREE.Mesh(geometry, material);
// 发光范围
mesh.scale.set(2, 2, 1);
mesh.position.set(5.25, 0, -0.3)


// let angle = 3.5;
// let R = 5.2
// mesh.position.x = R * Math.sin(angle);
// mesh.position.y = R * Math.cos(angle);

mesh.add(sprite);


export default mesh
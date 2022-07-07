/**
 * 流动能量柱
 *  */
import { THREE,Face3 ,Geometry} from './modules.js'
// 材质
const textureLoader = new THREE.TextureLoader();
const mapA = textureLoader.load('./img/bg.png');
const mapB = textureLoader.load('./img/light-point-s.png');
const mapC = textureLoader.load('./img/light-point-l.png');
const bgHeight = 5;

// 渐变柱状体
function getAureole(radius = 2, height = 5, color = "#ffffff"){
  let geo, mat;
  let segment = 64;
  //geo
  {
    let bottomPos = [];
    let topPos = [];
    let angleOffset = Math.PI * 2 / segment;
    for (var i = 0; i < segment; i++) {
      let x = Math.cos(angleOffset * i) * radius;
      let z = Math.sin(angleOffset * i) * radius;
      bottomPos.push(new THREE.Vector3(x, 0, z));
      topPos.push(new THREE.Vector3(x, height, z));
    }
    bottomPos = bottomPos.concat(topPos);

    let face = []
    for (var i = 0; i < segment; i++) {
      if (i != segment - 1) {
        face.push(new Face3(i + segment + 1, i, i + segment));
        face.push(new Face3(i, i + segment + 1, i + 1));
      }
      else {
        face.push(new Face3(segment, i, i + segment));
        face.push(new Face3(i, segment, 0));
      }
    }

    geo = new Geometry();
    geo.vertices = bottomPos;
    geo.faces = face;
  }
  //mat
  {
    let c = new THREE.Color(color);
    mat = new ShaderMaterial({
      uniforms: {
        targetColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
        height: { value: height },
      },
      side: DoubleSide,
      transparent: true,
      //depthTest:false,
      depthWrite: false,
      vertexShader: [
        "varying vec3 modelPos;",
        "void main() {",
        "   modelPos = position;",
        "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 targetColor;",
        "uniform float height;",
        "varying vec3 modelPos;",

        "void main() {",
        "   gl_FragColor = vec4(targetColor.xyz,(1.0 - modelPos.y/height)*(1.0 - modelPos.y/height));",
        "}"
      ].join("\n")
    });
  }

  let mesh = new Mesh(geo, mat);
  mesh.renderOrder = 9999
  return mesh;
}

// 添加背景光柱
function getBg(group, option) {
  let params = {
    height: bgHeight,
    x: 0,
    y: 0,
    z: 0,
    ...option
  }
  const materialA = new THREE.SpriteMaterial({
    map: mapA,
    color: 0xffffff,
    fog: true,
    transparent: true,
    opacity: 1,
  });

  let bg = new THREE.Sprite(materialA);
  bg.position.set(...group.position);
  bg.scale.set(0.4, params.height, 1.0);
  bg.name = "spriteBg"
  group.add(bg);
  
}

// 添加拖尾
function getTadpole(group, amount = 5) {
  const materialC = new THREE.SpriteMaterial({
    map: mapC,
    color: 0xffffff,
    transparent: true,
    fog: true
  });
  const materialB = new THREE.SpriteMaterial({
    map: mapB,
    color: 0xffffff,
    transparent: true,
    fog: true
  });
  for (let a = 0; a < amount; a++) {
    let isSmall = Math.random() > 0.3;
    const x = isSmall ? Math.random() * 0.22 - 0.1 + group.position.x : group.position.x;
    const y = group.position.y - 1;
    const z = group.bottom + bgHeight - 1;
    let material = isSmall ? materialB.clone() : materialC.clone();
    let scale = isSmall ? [0.08, 1.2, 1.0] : [0.4, 1.6, 1.0]
    const sprite = new THREE.Sprite(material);
    sprite.name = isSmall ? "small" : "big"
    sprite.position.set(x, y, z);
    sprite.scale.set(...scale);
    sprite.speed = Math.random() * 0.018 + 0.005; // 下降速度
    group.add(sprite);
  }
}

// 移动  需要在render中调用
export function tadpoleMove(group) {
  let bg = group.children.find((item) => {
    return item.name = 'spriteBg';
  })
  let tadpoles = group.children.filter((item) => {
    return item.name == 'small' || item.name == 'big';
  })
  // 光点的位置限制在背景的大小范围内
  for (let i = 0; i < tadpoles.length; i++) {
    const sprite = tadpoles[i];
    sprite.position.z -= sprite.speed;
    // sprite.material.opacity = sprite.position.z  / 2
    if (sprite.position.z < group.bottom) {
      let x = Math.random() * 0.22 - 0.1 + group.position.x
      sprite.position.z = group.bottom + bgHeight - 1;
      sprite.position.x = x;
    }
  }
}

// 设置整个分组的位置信息
function getLightRain(option) {
  let params = {
    r: 1.4,
    z: 1.4,
    angle: 4,
    bottom: -0.6,  //流线消失位置
    ...option
  }
  const group = new THREE.Group();
  group.bottom = params.bottom;
  let r = params.r
  let angle = (Math.PI * 2) / params.angle
  let x = r * Math.sin(angle);
  let y = r * Math.cos(angle);
  let z = params.z
  group.position.set(x, y, z)
  getBg(group)
  getTadpole(group)
  return group
}

export default getLightRain
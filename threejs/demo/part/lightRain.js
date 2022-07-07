/**
 * 流动能量柱
 *  */

// 材质
const textureLoader = new THREE.TextureLoader();
const mapA = textureLoader.load('./img/bg.png');
const mapB = textureLoader.load('./img/light-point-s.png');
const mapC = textureLoader.load('./img/light-point-l.png');


// 添加背景光柱
function getBg(group, option) {
  let params = {
    height: 5,
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
    const y = -0.1;
    const z = 3;
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
    if (sprite.position.z < group.position.z - 3) {
      let x = Math.random() * 0.22 - 0.1 + group.position.x
      sprite.position.z = bg.scale.y - sprite.scale.y;
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
    ...option
  }
  const group = new THREE.Group();
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
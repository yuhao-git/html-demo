let commonUniforms = {
  u_time: {
    value: 0.0
  }
};
const BLOOM_SCENE = 1;
export function changeCommonUniforms(speed) {
  commonUniforms.u_time.value += speed || 0.01;
}

// 飞线
function initFlyLine(curve, matSetting, pointsNumber) {

  var points = curve.getPoints(pointsNumber);
  var geometry = new THREE.BufferGeometry().setFromPoints(points);

  let length = points.length;
  var percents = new Float32Array(length);
  for (let i = 0; i < points.length; i += 1) {
    percents[i] = (i / length);
  }

  geometry.setAttribute('percent', new THREE.BufferAttribute(percents, 1));

  let lineMaterial = initLineMaterial(matSetting);

  var flyLine = new THREE.Points(geometry, lineMaterial);
  // 旋转
  // let euler = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0); 
  let euler = new THREE.Euler(0, 0, 0);
  flyLine.setRotationFromEuler(euler);
  flyLine.layers.enable(BLOOM_SCENE); 
  flyLine.position.set(0, 0, 0);
  return flyLine
}

// 材质
function initLineMaterial(setting) {
  let number = setting ? (Number(setting.number) || 1.0) : 1.0;
  let speed = setting ? (Number(setting.speed) || 1.0) : 1.0;
  let length = setting ? (Number(setting.length) || 0.5) : 0.5;
  let size = setting ? (Number(setting.size) || 3.0) : 3.0;
  let color = setting ? setting.color || new THREE.Vector3(0, 1, 1) : new THREE.Vector3(0, 1, 1);
  let singleUniforms = {
    u_time: commonUniforms.u_time,
    number: {
      type: 'f',
      value: number
    },
    speed: {
      type: 'f',
      value: speed
    },
    length: {
      type: 'f',
      value: length
    },
    size: {
      type: 'f',
      value: size
    },
    color: {
      type: 'v3',
      value: color
    },
    height:{
      value: 1
    }
  };
  var spriteMap = new THREE.TextureLoader().load('../../assets/img/circle.png');
  let lineMaterial = new THREE.ShaderMaterial({
    uniforms: singleUniforms,
    vertexShader: `
      varying vec2 vUv;
      attribute float percent;
      uniform float u_time;
      uniform float number;
      uniform float speed;
      uniform float length;
      varying float opacity;
      uniform float size;
      varying vec3 modelPos;
      void main()
    {
      // vUv = uv;
      modelPos = position;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      float l = clamp(1.0-length,0.0,1.0);//空白部分长度

      gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);

      opacity = gl_PointSize/size;
      gl_Position = projectionMatrix * mvPosition;
    }`,
    fragmentShader: `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec3 modelPos;
    varying float opacity;
    uniform vec3 color;
    uniform float height;
    void main(){
        // if(opacity <=0.2){
        //   discard;
        // }
        gl_FragColor = vec4(color,1.0);
    }`,
    transparent: true,
    map: spriteMap,
    //blending:THREE.AdditiveBlending,
  });
  return lineMaterial;
}



let curve = new THREE.EllipseCurve(
  0, 0, // ax, aY
  4.7, 4.7, // xRadius, yRadius
  0, 2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0 // aRotation
);

export default initFlyLine(curve, {
  speed: 0.2,
  color: new THREE.Vector3(1.0, 1.0, 1.0),
  number: 1.0,
  length: 0.6,
  size: 4.0
}, 4000);




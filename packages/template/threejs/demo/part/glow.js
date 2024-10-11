import {THREE} from './modules.js'
var innerfrag = [
  'uniform vec3	glowColor;',
  'uniform float	coeficient;',
  'varying vec3	vVertexNormal;',
  'varying vec3	vVertexWorldPosition;',
  'void main(){',
  '	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',
  '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;',
  '	viewCameraToVertex	= normalize(viewCameraToVertex);',
  '	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
  '	if(intensity > 0.65 && intensity < 0.8){ intensity = 0.8;}',
  '	if(intensity > 0.8){ intensity = 1.0;}',
  '	gl_FragColor = vec4(glowColor, intensity);',
  '}'
].join('\n');

var vertexShader = [
  'varying vec3	vVertexWorldPosition;',
  'varying vec3	vVertexNormal;',
  'varying vec4	vFragColor;',
  'void main(){',
  '	vVertexNormal	= normalize(normalMatrix * normal);',//将法线转换到视图坐标系中
  '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',//将顶点转换到世界坐标系中
  '	// set gl_Position',
  '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
  '}'

].join('\n');
//大气层效果
let aeroSphere = {
  uniforms: {
    coeficient: {
      type: "f",
      value: 1.0
    },
    power: {
      type: "f",
      value: 2
    },
    glowColor: {
      type: "c",
      value: new THREE.Color(0xffff00)
    },
    center: {
      value: new THREE.Vector3()
    }
  },
  vertexShader: vertexShader,
  fragmentShader: [
    'uniform vec3	glowColor;',
    'uniform float	coeficient;',
    'uniform float	power;',

    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',

    'varying vec4	vFragColor;',

    'void main(){',
    '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',	//世界坐标系中从相机位置到顶点位置的距离
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',//视图坐标系中从相机位置到顶点位置的距离
    '	viewCameraToVertex	= normalize(viewCameraToVertex);',//规一化
    '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
    '	gl_FragColor		= vec4(glowColor, intensity);',
    '}'//vVertexNormal视图坐标系中点的法向量
    //viewCameraToVertex视图坐标系中点到摄像机的距离向量
    //dot点乘得到它们的夹角的cos值
    //从中心向外面角度越来越小（从钝角到锐角）从cos函数也可以知道这个值由负变正，不透明度最终从低到高
  ].join('\n')
}
//辉光效果Grow
let glowSphere = {
  uniforms: {
    coeficient: {
      type: "f",
      value: 0.0
    },
    power: {
      type: "f",
      value: 2
    },
    glowColor: {
      type: "c",
      value: new THREE.Color(0xff22ff)
    }
  },
  vertexShader: vertexShader,
  fragmentShader: [
    'uniform vec3	glowColor;',
    'uniform float	coeficient;',
    'uniform float	power;',

    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',

    'varying vec4	vFragColor;',

    'void main(){',
    '	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',	//世界坐标系中顶点位置到相机位置到的距离
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;',//视图坐标系中从相机位置到顶点位置的距离
    '	viewCameraToVertex	= normalize(viewCameraToVertex);',//规一化
    '	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
    '	if(intensity > 0.65){ intensity = 0.0;}',
    '	gl_FragColor		= vec4(glowColor, intensity);',
    '}'//vVertexNormal视图坐标系中点的法向量
    //viewCameraToVertex视图坐标系中点到摄像机的距离向量
    //dot点乘得到它们的夹角的cos值
    //从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
  ].join('\n')
}

// 平面
let glowPlane = {
  uniforms: {
    center: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
    color: {
      value: new THREE.Color(0x00bbff)
    },
    radius: { value: 5.1 }, // 半径
    min: { value: 4.6 }, // 小于隐藏
  },
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader: [
    "varying vec3 modelPos;",
    "void main() {",
    " modelPos = position;",
    "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),
  fragmentShader: [
    "varying vec3 modelPos;",
    "uniform vec3 center;",
    "uniform vec3 color;",
    "uniform float radius;",
    "uniform float min;",
    "void main() {",
    "float dis = distance(center,modelPos.xyz ) ;",
    "if(dis > min){",
    "float o = 1.0-(radius  - dis) / (radius  - min);",
    "gl_FragColor = vec4(color,  o*o*0.5);",
    "}",
    "else{",
    "gl_FragColor = vec4(color, 0);", 
    "}",
    "}"
  ].join("\n")
}

//球体 辉光 大气层
export default function shad() {
  var material1 = new THREE.ShaderMaterial({
    uniforms: aeroSphere.uniforms,
    vertexShader: aeroSphere.vertexShader,
    fragmentShader: aeroSphere.fragmentShader,
    blending: THREE.NormalBlending,
    transparent: true,
    depthWrite: false
  });
  var material2 = new THREE.ShaderMaterial({
    uniforms: glowSphere.uniforms,
    vertexShader: glowSphere.vertexShader,
    fragmentShader: glowSphere.fragmentShader,
    blending: THREE.NormalBlending,
    transparent: true
  });

  var material3 = new THREE.ShaderMaterial({
    uniforms: glowPlane.uniforms,
    vertexShader: glowPlane.vertexShader,
    fragmentShader: glowPlane.fragmentShader,
    blending: THREE.NormalBlending,
    transparent: true,
    side: THREE.DoubleSide,
  });

  var sphere = new THREE.SphereBufferGeometry(2, 200, 200);
  var mesh = new THREE.Mesh(sphere, material1);

  var sphere2 = new THREE.SphereBufferGeometry(0.1, 20, 20);
  var mesh2 = new THREE.Mesh(sphere2, material2);

  const geometry = new THREE.CircleGeometry(5.15, 100);
  const circle = new THREE.Mesh(geometry, material3);
  circle.position.z = -0.3;

  return mesh;
}


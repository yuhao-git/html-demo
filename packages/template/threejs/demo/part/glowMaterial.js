import {THREE} from './modules.js'
let glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    coeficient: {
      type: "f",
      value: 1.0,
    },
    power: {
      type: "f",
      value: 3,
    },
    glowColor: {
      type: "c",
      value: new THREE.Color("#ffffff"),
    },
  },
  vertexShader: [
    "varying vec3 vVertexWorldPosition;",
    "varying vec3 vVertexNormal;",
    "varying vec4 vFragColor;",
    "void main(){",
    " vVertexNormal = normalize(normalMatrix * normal);", //将法线转换到视图坐标系中
    " vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;", //将顶点转换到世界坐标系中
    " // set gl_Position",
    " gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
    "}",
  ].join("\n"),
  fragmentShader: [
    "uniform vec3 glowColor;",
    "uniform float coeficient;",
    "uniform float power;",

    "varying vec3 vVertexNormal;",
    "varying vec3 vVertexWorldPosition;",

    "varying vec4 vFragColor;",

    "void main(){",
    " vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;", //世界坐标系中从相机位置到顶点位置的距离
    " vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;", //视图坐标系中从相机位置到顶点位置的距离
    " viewCameraToVertex = normalize(viewCameraToVertex);", //规一化
    " float intensity = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);",
    " gl_FragColor = vec4(glowColor, intensity);",
    "}", //vVertexNormal视图坐标系中点的法向量
    //viewCameraToVertex视图坐标系中点到摄像机的距离向量
    //dot点乘得到它们的夹角的cos值
    //从中心向外面角度越来越小（从钝角到锐角）从cos函数也可以知道这个值由负变正，不透明度最终从低到高
  ].join("\n"),
  opacity: 1,
  transparent: true,
});

// 发光材质
export default glowMaterial
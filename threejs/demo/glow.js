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
THREE.AeroSphere = {
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
THREE.GlowSphere = {
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

//球体 辉光 大气层
export default function shad() {
  var material1 = new THREE.ShaderMaterial({
    uniforms: THREE.AeroSphere.uniforms,
    vertexShader: THREE.AeroSphere.vertexShader,
    fragmentShader: THREE.AeroSphere.fragmentShader,
    blending: THREE.NormalBlending,
    transparent: true,
    depthWrite: false
  });
  var material2 = new THREE.ShaderMaterial({
    uniforms: THREE.GlowSphere.uniforms,
    vertexShader: THREE.GlowSphere.vertexShader,
    fragmentShader: THREE.GlowSphere.fragmentShader,
    blending: THREE.NormalBlending,
    transparent: true
  });
  var sphere = new THREE.SphereBufferGeometry(0.1, 20, 20);
  
  var mesh = new THREE.Mesh(sphere, material1);
  // scene.add(mesh);

  var sphere2 = new THREE.SphereBufferGeometry(0.1, 20, 20);
  var mesh2 = new THREE.Mesh(sphere2, material2);
  //mesh2.position.x = 15;
  // scene.add(mesh2);
  mesh2.position.z = 2;
  return mesh2;
}


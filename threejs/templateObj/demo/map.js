function extrudeMesh(mapMinMax, pointsArrs, height, name, type) {
  const shapeArr = [];
  const curveArr = [];
  pointsArrs.forEach((pointsArr) => {
    const vertice2Arr = [];
    pointsArr[0].forEach((elem) => {
      vertice2Arr.push(
        new THREE.Vector3(
          elem[0] * this.pointScale,
          elem[1] * this.pointScale,
          0
        )
      );
    });
    var curve = new THREE.CatmullRomCurve3(vertice2Arr);
    var vectorArray = curve.getPoints(200);
    const shape = new THREE.Shape(vectorArray);
    curveArr.push(...vertice2Arr);
    shapeArr.push(shape);
  });
  const geometry = new THREE.ExtrudeBufferGeometry(shapeArr, {
    depth: height,
    bevelEnabled: false,
  });
  const shapeGeometry = new THREE.ShapeGeometry(shapeArr);
  //设置原型参数
  let uniforms = {
    time: { value: 0.0 },
    opacity: { value: 1 },
    mapHeight: { value: this.meshHeight },
    minX: { value: mapMinMax.minX },
    minY: { value: mapMinMax.minY },
    mapXWidth: { value: mapMinMax.maxX - mapMinMax.minX },
    mapYHeight: { value: mapMinMax.maxY - mapMinMax.minY },
  };
  const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
            //通过默参数uv赋值vUv
            vUv=uv;
    //通过默认参数position 当前点在3D世界中的坐标位置 赋值vPosition
            vPosition=position;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
  `;
  const fragmentShader = `
    precision highp float;
uniform sampler2D mapTexture;//边缘纹理
    uniform vec3 color;//默认颜色
    uniform float opacity;//透明度
    uniform float mapHeight;//地图高度
    uniform float minX;//地图上的最小X坐标
    uniform float minY;//地图上的最小Y坐标
    uniform float mapXWidth;//地图上的X坐标的最大最小值距离
    uniform float mapYHeight;//地图上的Y坐标最大最小值距离
    uniform float time;//事件
varying vec2 vUv;//顶点处理的参数 平面坐标
    varying vec3 vPosition;//顶点处理的参数 点的三维坐标
void main() {
        //代码中用到的值 13是对应的地图高度   通过此计算保证地图背景纹理在整个地图上平摊分布
        vec4 color2=texture2D(mapTexture,vec2((vPosition.x-minX)/mapXWidth,fract((vPosition.y-minY+time)/mapYHeight)));
        //底部采用地图背景
       if(vPosition.z<=0.0){
        //    gl_FragColor=vec4(color2.xyz,1.0);
           //gl_FragColor=color2;
           //顶部采用地图背景
        }else if(vPosition.z>=mapHeight){
            gl_FragColor=vec4(color2.xyz,1);

        }else{
           //其他的就是侧边了 直接使用侧边颜色即可
  //    gl_FragColor = vec4(color3.xyz,1.0);
  }
}
  `;
  const fragmentShader2 = `
    precision highp float;
    uniform vec3 color;//默认颜色
    uniform float opacity;//透明度
    uniform float minX;//地图上的最小X坐标
    uniform float minY;//地图上的最小Y坐标
    uniform float mapXWidth;//地图上的X坐标的最大最小值距离
    uniform float mapYHeight;//地图上的Y坐标最大最小值距离
    uniform float time;//事件
varying vec2 vUv;//顶点处理的参数 平面坐标
    varying vec3 vPosition;//顶点处理的参数 点的三维坐标
void main() {
       //gl_FragColor=vec4(color,abs(vUv.x) / mapXWidth > abs(vUv.y) / mapYHeight ? abs(vUv.x) / mapXWidth : abs(vUv.y) / mapYHeight) ;
    //    gl_FragColor=vec4(color,0.3) ;
       float op = max(abs((vPosition.x) - (mapXWidth / 2.0 + minX)) / (mapXWidth*1.8),abs((vPosition.y) - (mapYHeight / 2.0 + minY)) / (mapYHeight*1.8));
       gl_FragColor=vec4(color,op);

    }
  `;
  const paramObj = {
    isFirst: true,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  };
  if (type === 2) {
    const mapBg = new THREE.TextureLoader().load("img/cq-map.png");
    uniforms.mapTexture = { value: mapBg };
    uniforms.color = { value: new THREE.Color("#ffffff") };
    const material1 = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.7,
      roughness: 0.4,
      reflectivity: 0.5,
    });
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: false,
    });
    const material3 = new THREE.MeshBasicMaterial({
      opacity: 0,
      color: "#ffffff",
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, [material, material1]); //网络模型对象，顶点组成三角形
    const materialUper = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader2,
      transparent: true,
    });
    const mesh2 = new THREE.Mesh(shapeGeometry, materialUper); //网络模型对象，顶点组成三角形
    const mesh3 = new THREE.Mesh(shapeGeometry, material3); //网络模型对象，顶点组成三角形
    mesh3.name = name;
    mesh2.position.z = this.meshHeight + 0.0001;
    mesh3.position.z = this.meshHeight + 0.003;
    this.fnGetPointMinMax(pointsArrs, paramObj);
    this.meshs.set(name, mesh3);
    return { mesh: [mesh, mesh2, mesh3], shapeArr: shapeArr };
  } else {
    const fragmentShader2 = `
    precision highp float;
    uniform vec3 color;//默认颜色
    uniform float opacity;//透明度
    uniform float minX;//地图上的最小X坐标
    uniform float minY;//地图上的最小Y坐标
    uniform float mapXWidth;//地图上的X坐标的最大最小值距离
    uniform float mapYHeight;//地图上的Y坐标最大最小值距离
    uniform float time;//事件
varying vec2 vUv;//顶点处理的参数 平面坐标
    varying vec3 vPosition;//顶点处理的参数 点的三维坐标
void main() {
       //gl_FragColor=vec4(color,abs(vUv.x) / mapXWidth > abs(vUv.y) / mapYHeight ? abs(vUv.x) / mapXWidth : abs(vUv.y) / mapYHeight) ;
    //    gl_FragColor=vec4(color,0.3) ;
       float op = max(abs((vPosition.x) - (mapXWidth / 2.0 + minX)) / (mapXWidth*1.2),abs((vPosition.y) - (mapYHeight / 2.0 + minY)) / (mapYHeight*1.2));
       gl_FragColor=vec4(color,op);

    }
  `;
    const mapBg = new THREE.TextureLoader().load("img/sc-map.jpg");
    uniforms.mapTexture = { value: mapBg };
    uniforms.color = { value: new THREE.Color("#ffffff") };
    const material1 = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.7,
      roughness: 0.4,
      reflectivity: 0.5,
    });
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: false,
    });
    const material3 = new THREE.MeshBasicMaterial({
      opacity: 0,
      color: "#ffffff",
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, [material, material1]); //网络模型对象，顶点组成三角形
    const materialUper = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader2,
      transparent: true,
    });
    const mesh2 = new THREE.Mesh(shapeGeometry, materialUper); //网络模型对象，顶点组成三角形
    const mesh3 = new THREE.Mesh(shapeGeometry, material3); //网络模型对象，顶点组成三角形
    mesh3.name = name;
    mesh2.position.z = this.meshHeight + 0.0001;
    this.fnGetPointMinMax(pointsArrs, paramObj);
    this.meshs.set(name, mesh3);
    mesh3.position.z = this.meshHeight + 0.003;
    return { mesh: [mesh, mesh2, mesh3], shapeArr: shapeArr };
  }
}
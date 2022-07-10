Material##
抽象的所有材料的基类，展示了对象的外观
构造函数
Material()
特性

```
alphaTest : Float 渲染的材质的opacity小于这个设定的值时将不会被渲染出来
blendDst: Integer 材料的混合必须设置为CustomBlend,这样才能产生任何效果
blendDstAlpha: Integer 默认null
blendSrc 混合源，默认SrcAlphaFactor
blendSrcAlpha
blendEquation: Integer 应用混合时使用的混合方程，默认AddEquation
blendEquationAlpha: Integer 默认null
blending: Blending 设置为CustomBlending时才可用blendSrc,blendDst,blendEquation,默认NormalBlending 只显示材质的上层
clipIntersection: Boolean 改变裁剪平面行为，只要交集被裁剪不是他们的结合，默认false
clipShadows 默认false，定义是否根据此材料上指定的剪裁平面剪裁阴影
colorWrite 渲染材料的颜色，默认true
customDepthmaterial: Material 投射的阴影是太阳光或点光源 默认undefined
customDistanceMaterail 用在点光源 默认undefined
defines/depthTest/depthWrite/depthFunc/flatShading/fog/id/name/opacity/needsUpdate 自动设为true
precision:String 覆盖渲染器对此材料的默认精度,有highp/mediump/lowp，默认null
overdraw: Float 当使用CanvasRenderer时三角形之间出现间隙时，这是一种解决方法。0.5倾向于跨浏览器提供好的结果。默认值为0
opacity: 如果未设定材质的 transparent属性为true,则材质任然保持完全不透明。该值只会影响颜色
lights: 默认true,表示材质受到灯光的影响
shadowSide : Integer 哪一个面投影阴影，默认null
type: 值为Material,找相应的类型/uuid/visible/userData
transparent: Boolean 默认false
side: Integer 定义那一面被渲染 THREE.FrontSide/BackSide/DoubleSide
uuid/visible/userData
overdraw: Float 使用CanvasRender时，三角形之间出现间隙，可以设置0.5给浏览器提供好的结果
```


方法

```
clone()/copy(material)/dispose()/setValue(value)/toJSON()/onBrforeCompline(shader,renderer)
LineBasicMaterial##
```

构造函数

```
LineBasicMaterial(parameters: Object) 可选的参数

color/linewidth/linecap 线的结尾样式(butt,默认round,square,)/linejoin 相交的样式(默认round，bevel,miter)
```


特性
lights 是否收到光的影响，默认false
LineDashMaterial
构造函数
LineDashMaterial(parameters: Object) 可选的参数

color/linewidth/dashSize默认3/gapSize默认1/scale默认1，
MeshBasicMaterial
不会对光源有任何的反应，只会使用指定的颜色来渲染物体
构造函数
MeshBasicMaterial (parameters: Object)
特性

```
alphaMap: 一个灰度贴图，控制表面的不透明度，黑丝透明，白色不透明
aoMap: 该纹理的红色通道用来环境遮挡图
aoMapIntensity: 默认1
color 默认0xffffff
combine 如何将便面颜色和envMap结合起来(存在的话)，默认THREE.Multiply
isMeshBasicMaterial 默认true
envMap: 环境贴图，默认null
lightMap(null)/lightMapIntersity(1)/lights 是否受灯光的影响，默认false
map (color贴图,null)/morphTargets 材料是否启用形态目标，默认false
reflectivity envMap对表面的影响。默认1，完全影响/reflactionRatio 0~1 默认0.98
skinning 材料是否使用skinning,默认false
specularMap 镜面图，默认false
wireframe 默认false,渲染几何体为线条
wireframeLinecap/wireframeLinejoin/wireframeLinewidth
```

MeshDepthMaterial
使用从摄像机到物体的距离来给网格上色
白色最近的，黑色最远的

属性

alaphMap/displacementMap/dissplacementScale
displacementBias/fog/map
morphTarget(false) 发生变形(将顶点发生位置变化)时需要设为true
skinning(false)
wireframe/wireframeLineWidth
depthPacking: Constant 编码
MeshLambertMaterial
用于暗淡的不光亮的物体(漫反射)
特性

emissive : Color 默认黑色black,材料发射出的光
emissiveMap/emissiveIntensity: Float 强度默认1
MeshNormalMaterial
将法向量映射到RGB颜色的材料

MeshStandarMaterial
特性

metalness 这种材料多像金属，默认0.5
metalnessMap 纹理的蓝色通道用来改变材料的金属度
MeshPhongMaterial
有镜面高光的有光泽的材料(镜面反射)
特性

bumpMap/bumpScale 凹凸贴图/凹凸贴图对材料的影响0-1，默认1
shininess: Float 镜面高光部分的亮度，默认30
specular: Color 决定了材料的光泽和光泽的颜色，默认0x111111
MeshToonMaterial
MeshPhongMaterial的扩展，带有toon 阴影
特性

gradientMap 梯度图，给toon 阴影，默认null
PointsMaterial
特性

size points的大小 默认1.0
sizeAttenuation 随这距离的边缘，点的大小变小，默认true
ShaderMaterial
定制着色器渲染的材料
[OpenGL ES着色语言1.0](https://www.khronos.org/files/opengles_shading_language.pdf)写着色器
自定义的着色器的渲染材料只能通过WebGLRenderer来渲染，因为vertexShader 和fragmentShader属性中的GLSL代码必须使用WebGL在GPU上编译和运行
从Three r72开始不再支持在ShaderMatary中直接赋值属性 BufferGeomery实例替代Geometry实例，用BufferAttribute实例去定义自定义属性
从Three r77开始，WebGLRenderTarget或WebGLRenderTargetCube实例将不再被用作uniforms。必须使用它们的texture属性
内置的属性和uniforms连同代码一起传递给着色器。如果您不希望WebGLProgram向您的着色器代码添加任何内容，您可以使用RawShaderMatary而不是这个类
vertexShader顶点着色器首先运行；它接收属性，计算/操作每个单独顶点的位置，并将附加数据(变量)传递给片段着色器。fragmentShader片段(或像素)着色器运行第二；它设置每个单独的“片段”(像素)呈现到屏幕上的颜色
着色器中有三种类型的变量uniforms, attributes, 和 varyings
uniforms可以访问顶点着色器和片段着色器
uniforms, attributes就像常量一样；您只能通过从JavaScript代码向缓冲区传递不同的值来修改它们的值
内置的uniforms, attributes可以查看WebGLProgram
为了自定义atributes.uniforms必须子啊GLSL着色器代码中声明，自定义uniforms必须在ShaderMaterial的uniforms属性中，任何的自定义属性都应该通过BufferAttribute实例来定义
要声明一个自定义属性，请参考BufferGeics获得概述，并在BufferAttribute页面中查看BufferAttribute API的详细信息
在创建属性时，为保存属性数据而创建的每个类型化数组必须是数据类型大小的倍数。如果您的属性是THREE.Vector 3类型，而您的BufferGeics中有3000个顶点，则必须创建长度为3000*3或9000
请注意，属性缓冲区的值更改时不会自动刷新。若要更新自定义属性，请在几何图形的BufferAttribute上将需更新标志设置为true
特性

clipping：Boolean 材料是否支持裁剪，默认false。true需要通过Uniform 中的clippingPlanes
defaultAttributeValues
defines 转化成GLSL中的#define指令给顶点片段着色器
extensions: Object/fog:Boolean
fragmentShader: String 片段着色器GLSL代码
lights: Boolean 默认false
lineWidth: Float/program: WebGLProgram
skinning:Boolean 默认false
uniforms: Object /vertexColors: Number (THREE.NoColors/FaceColors/VertexColors) 同样的信息会发送给每一个顶点和片段
vertexShader: String 顶点着色器GLSL代码
wireframe/wireframeLinewidth
着色器-fragmentShader代码
顶点和片段着色器有三种类型的变量：

uniforms:
attributes:
varyings:
RawShaderMaterial
和上面的差不多，但内置的uniform和属性不会自动添加到GLSL着色器代码中

ShadowMaterial
用来接收阴影，但其他的地方全是透明的
特性

transparent: 材料是否透明，默认true
SpriteMaterial
和Sprite一起使用的材料
特性
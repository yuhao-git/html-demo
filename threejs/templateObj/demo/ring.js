import { THREE } from './modules.js'
import { GUI } from '../../jsm/libs/lil-gui.module.min.js';

function getTextToCanvas() {
    let width = 1;
    let height = 10;
    let canvas = document.createElement('canvas');
    canvas.width = width; // 设置画布的宽度
    canvas.height = height; // 设置画布的高度
    let contentStyle = canvas.getContext('2d'); // 设置画布内2D相关属性
    // 创建渐变
    var grd = contentStyle.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "rgba(49, 43, 150,0)");
    grd.addColorStop(0.5, "rgba(49, 43, 150,1)");
    grd.addColorStop(1, "rgba(49, 43, 150,0)");
    // 填充渐变
    contentStyle.fillStyle = grd;
    contentStyle.fillRect(0, 0, width, height);
    return canvas;
}
// 立圆环
function getRing(option) {
    // const length = 6, width = 8;

    const shape = new THREE.Shape();
    // shape.moveTo(0, 0);
    // shape.lineTo(0, width);
    // shape.lineTo(length, width);
    // shape.lineTo(length, 0);
    // shape.lineTo(0, 0);

    let params = { r: 2, depth: 1 }
    shape.moveTo(0, 0);
    // shape.lineTo(params.r, 0);
    // shape.absarc(0, 0, params.r, 0, Math.PI * 2 / 6 / 6 * 5.8, false);
    shape.absarc(0, 0, 4, 0, Math.PI * 2, false);

    // shape.absarc(0, 0, params.r - params.depth, Math.PI * 2 / 6 / 6 * 5.8, 0, true);

    /**
     *  curveSegments — int，曲线上点的数量，默认值是12。
        steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为1。
        depth — float，挤出的形状的深度，默认值为1。
        bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为true。
        bevelThickness — float，设置原始形状上斜角的厚度。默认值为0.2。
        bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
        bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.
        bevelSegments — int。斜角的分段层数，默认值为3。
        extrudePath — THREE.Curve对象。一条沿着被挤出形状的三维样条线。Bevels not supported for path extrusion.
        UVGenerator — Object。提供了UV生成器函数的对象。
     */
    const extrudeSettings = {
        steps: 1,
        depth: 10,
        bevelEnabled: false,
        bevelThickness: 0,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 3
    };

    let happy = new THREE.TextureLoader().load('../../assets/img/happy.png');
    happy.mapping = 10
    
    let texture = new THREE.CanvasTexture(getTextToCanvas());
    // texture.wrapS =  THREE.RepeatWrapping; //横向重复
    // texture.wrapT = THREE.RepeatWrapping;   // 纵向
    texture.repeat.set(1, 0.1);   // 放大
    texture.offset.height = 0.9;
    // texture.needsUpdate = true;

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = [new THREE.MeshBasicMaterial({
        color: "#ffffff",
        map:happy,
        transparent: true,
        // opacity: 0,
        alphaTest: 0.01
    }),
    new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        color: "#ffffff",
        transparent: true,

    }),];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 20, 0)
    mesh.rotateX(Math.PI / 2)
    setGui(mesh)
    return mesh
}

function setGui(mesh) {
    // gui调试
    const gui = new GUI();
    let data = {
        x: 0, y: 0, z: 0,
    }
    gui.add(data, 'x', -100, 100).onChange(function (d) {
        mesh.position.x = d
    });
    gui.add(data, 'y', -100, 100).onChange(function (d) {
        mesh.position.y = d
    });
    gui.add(data, 'z', -100, 100).onChange(function (d) {
        mesh.position.z = d
    });

    gui.open();
}

export default getRing;
import getGradientMaterial from "./gradientMaterial.js"
import {THREE} from './modules.js'
// 立圆环
function getRing(option) {
    let params = {
        r: 3.5,
        z: 75,
        color: "#6188d2",
        depth: 0.02,
        height: 0.6,
        ...option
    }
    var group = new THREE.Group();
    function addShapeDRN(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        // var material = new THREE.MeshPhysicalMaterial({ color: color, opacity: 0.6, transparent: true })

        var mesh = new THREE.Mesh(geometry, getGradientMaterial({
            height: params.height + 0.15,
            width: params.r,
        }));
        mesh.position.set(x, y, z - 75);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);
        for (let i = 0; i < 5; i++) {
            let meshn = mesh.clone();
            meshn.rotateZ(Math.PI * 2 * (i + 1) / 6)
            group.add(meshn);
        }
    }
    // Arc circle圆弧drn
    /**
     * absarc ( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, clockwise : Float ) : null
     * x, y -- 弧线的绝对中心。
     * radius -- 弧线的半径。
     * startAngle -- 起始角，以弧度来表示。
     *endAngle -- 终止角，以弧度来表示。
     *clockwise -- 以顺时针方向创建（扫过）弧线。默认值为false。
     * @type {Shape}
     */
    /**
     *.arc ( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, clockwise : Float ) : null
     x, y -- 弧线的中心来自上次调用后的偏移量。
     radius -- 弧线的半径。
     startAngle -- 起始角，以弧度来表示。
     endAngle -- 终止角，以弧度来表示。
     clockwise -- 以顺时针方向创建（扫过）弧线。默认值为false。
     */
    var arcShapeDrn01 = new THREE.Shape();
    arcShapeDrn01.moveTo(params.r - params.depth, 0);
    arcShapeDrn01.lineTo(params.r, 0);
    arcShapeDrn01.absarc(0, 0, params.r, 0, Math.PI * 2 / 6 / 6 * 5.8, false);
    arcShapeDrn01.absarc(0, 0, params.r - params.depth, Math.PI * 2 / 6 / 6 * 5.8, 0, true);
    var arcShapeDrn02 = arcShapeDrn01


    var extrudeSettings = {
        depth: params.height,
        bevelEnabled: false,
        bevelSegments: 9,
        steps: 20,
        bevelSize: 0,
        bevelThickness: 0
    };

    addShapeDRN(arcShapeDrn02, extrudeSettings, params.color, 0, 0, 0, 0, 0, 0, 1);

    group.position.set(0, 0, params.z)
    return group;
}

export default getRing;
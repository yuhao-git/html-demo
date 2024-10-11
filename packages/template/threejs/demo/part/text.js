
//http://gero3.github.io/facetype.js/ 字体转换
import {THREE} from './modules.js'
import { TextGeometry, FontLoader } from './modules.js';
async function getText(option) {
    let params = {
        x: -1.2,
        y: 1.0,
        z: 0.5,
        size: 0.6,
        text: "共享平台",
        ...option
    }
    let response = await new Promise(res => {
        new FontLoader().load("font/YaHei_Bold.json", (response) => {
            res(response)
        })
    })

    let textMesh = new TextGeometry(params.text, {
        font: response,
        fontName: "YaHei_Bold",
        size: params.size,             // 字体大小，默认值为100
        height: 0.2,           // 挤出文本的厚度。默认值为50
        hover: 10,
        curveSegments: 10,   // 弧线分段数，使得文字的曲线更加光滑
        bevelThickness: 2,   // 文本上斜角的深度，默认值为20
        bevelSize: 1,        // 斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 3,    // 斜角的分段数。默认值为3
        bevelEnabled: false  // 是否使用倒角，意为在边缘处斜切
    });

    // let material = new THREE.MeshMatcapMaterial({
    //     color: 0xffffff,
    // })

    var material = new THREE.MeshLambertMaterial({
        color: 0x80ffff
    });

    let fontObj = new THREE.Mesh(textMesh, material);
    fontObj.position.set(params.x, params.y, params.z);
    fontObj.rotateZ(-Math.PI / 5)
    fontObj.rotateX(Math.PI / 2)
    fontObj.castShadow = true;
    return fontObj
}

export default getText;
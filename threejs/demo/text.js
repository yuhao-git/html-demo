
//https://blog.csdn.net/qq_34122822/article/details/122473154 字体
import { FontLoader } from "../jsm/loaders/FontLoader.js";
import { TextGeometry } from '../jsm/geometries/TextGeometry.js';
async function getText() {
    let response = await new Promise(res => {
        new FontLoader().load("./FZHei.json", (response) => {
            res(response)
        })
    })

    let textMesh = new TextGeometry("共享平台", {
        font: response,
        fontName: "FZHei",
        size: 0.8,             // 字体大小，默认值为100
        height: 0.3,           // 挤出文本的厚度。默认值为50
        hover: 10,
        curveSegments: 10,   // 弧线分段数，使得文字的曲线更加光滑
        bevelThickness: 2,   // 文本上斜角的深度，默认值为20
        bevelSize: 1,        // 斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 3,    // 斜角的分段数。默认值为3
        bevelEnabled: false  // 是否使用倒角，意为在边缘处斜切
    });

    let material = new THREE.MeshMatcapMaterial({ color: 0xffffff, })


    let fontObj = new THREE.Mesh(textMesh, material);
    fontObj.position.set(-2.2, 0.15, 0.12);
    // fontObj.rotateX(Math.PI / 2)
    fontObj.rotateX(Math.PI / 2)
    return fontObj
}

export default getText;
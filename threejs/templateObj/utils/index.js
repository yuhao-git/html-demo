// import * as THREE from 'three'

/**
 * canvas 绘制渐变色纹理
 * @param {*} colors 颜色列表
 * @returns 纹理，对应metrial->map 
 */

export function getTextToCanvas(colors) {
    let params = [
        { step: 0, color: "rgba(49, 43, 150,0)" },
        { step: 0.5, color: "rgba(49, 43, 150,1)" },
        { step: 1, color: "rgba(49, 43, 150,0)" }
    ]
    if (colors) {
        params = colors
    }
    let width = 1;
    let height = 10;
    let canvas = document.createElement('canvas');
    canvas.width = width; // 设置画布的宽度
    canvas.height = height; // 设置画布的高度
    let contentStyle = canvas.getContext('2d'); // 设置画布内2D相关属性
    // 创建渐变
    var grd = contentStyle.createLinearGradient(0, 0, 0, height);

    params.forEach(item => {
        grd.addColorStop(item.step, item.color)
    })
    // 填充渐变
    contentStyle.fillStyle = grd;
    contentStyle.fillRect(0, 0, width, height);
    let texture = new THREE.CanvasTexture(canvas);
    return texture;
}
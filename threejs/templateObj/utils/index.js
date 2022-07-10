export function getTextToCanvas() {
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
    let texture = new THREE.CanvasTexture(canvas);
    return texture;
}
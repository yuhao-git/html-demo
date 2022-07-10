function getTextToCanvas(text) {
    let width = 512;
    let height = 64;
    let canvas = document.createElement('canvas');
    canvas.width = width; // 设置画布的宽度
    canvas.height = height; // 设置画布的高度
    let contentStyle = canvas.getContext('2d'); // 设置画布内2D相关属性
    // 创建渐变
    var grd = contentStyle.createLinearGradient(0, 0, 0, height );
    grd.addColorStop(0, "rgba(49, 43, 150,0)");
    grd.addColorStop(0.5, "rgba(49, 43, 150,1)");
    grd.addColorStop(1, "rgba(49, 43, 150,0)");
    // 填充渐变
    contentStyle.fillStyle = grd;
    contentStyle.fillRect(0, 0, width, height);
    contentStyle.font = 32 + 'px " bold';
    contentStyle.fillStyle = '#2891FF';
    contentStyle.textAlign = 'center';
    contentStyle.textBaseline = 'middle';
    contentStyle.fillText(text, width / 2, height / 2);
    return canvas;
}

function getTexture() {

    let geometry = new THREE.CylinderGeometry(10, 10, 6, 64, 1, true, 0, Math.PI * 2);
    let canvas = getTextToCanvas("人生没有彩排,每一天都是现场直播")
    var canvasTexture = new THREE.CanvasTexture(canvas);
    
    // canvasTexture.wrapS = THREE.RepeatWrapping;
    var material = new THREE.MeshBasicMaterial({
        map: canvasTexture, // 设置纹理贴图
        side: THREE.DoubleSide,
        transparent: true,

    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0)
    return cube
}

export default getTexture
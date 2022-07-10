// 轨道漫游
function createLine(){
    //创建样条曲线，作为运动轨迹
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(自定义x, 自定义y, 自定义z),
      new THREE.Vector3(自定义x, 自定义y, 自定义z),
      new THREE.Vector3(自定义x, 自定义y, 自定义z),
    ])
    const geometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(5000))
    // 材质对象
    var material = new THREE.LineBasicMaterial({
      color: 'red'
    })
    // 线条模型对象
    var line = new THREE.Line(geometry, material)
    this.scene.add(line) // 线条对象添加到场景中
}


function render(){
    requestAnimationFrame(this.render)
    if (progress <= 1 - 0.0004 * 20){
        const point = this.curve.getPointAt(progress) //获取样条曲线指定点坐标，作为相机的位置
        const pointBox = this.curve.getPointAt(progress + 0.0004 * 20) //获取样条曲线指定点坐标
        this.camera.position.set(point.x, point.y + 5, point.z)
        this.camera.lookAt(pointBox.x, pointBox.y + 5, pointBox.z)
        this.controls.position0.set(point.x, point.y + 5, point.z) //非必要，场景有控件时才加上
        this.controls.target.set(pointBox.x, pointBox.y + 5, pointBox.z) //非必要，场景有控件时才加上
        progress += 0.0004
    } else {
        progress = 0
    }
    this.renderer.render(this.scene, this.camera)
}

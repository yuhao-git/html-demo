export default class Model {
  constructor(canvas, option) {
    //传参 画布
    this.puppleArr = new Array(); //泡泡数组
    this.puppleNum = 500; //泡泡个数
    this.canvas = canvas; //获取画布元素
    this.context = canvas.getContext("2d"); //获取用于在画布上绘图的环境
    this.isDisposed = false; // 是否已经销毁对象
    this.timer = null;
    for (let i = 0; i < this.puppleNum; i++) {
      this.puppleArr.push(this.genPupple()); //将泡泡属性添加到数组
    }
    this.shake(); //泡泡发射（移动）
  }
  dispose() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.isDisposed = true;
  }
  genPupple() {
    let radius = Math.random() * 5 + 5;
    return {
      //返回泡泡的各种属性
      radius: radius, //半径
      v: Math.random() * 20 + 10, //速度
      r: (Math.random() * 255) | 0, //|0是取整   random()是0~1之间的随机数
      g: (Math.random() * 255) | 0,
      b: (Math.random() * 255) | 0, //r g b 三原色
      a: Math.random() + 0.3, //透明度
      angle: -Math.PI * Math.random(), //泡泡移动方向
      x: Math.random() * this.canvas.width, //泡泡位置坐标
      y: this.canvas.height - radius * 2,
      isChangeAlpha: Math.random() > 0.5, // 是否修改透明度
      isChangeRadius: Math.random() > 0.5, // 是否修改半径
    };
  }
  shake() {
    let ctx = this.context;
    let foo = () => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //清空画布
      for (let i = 0; i < this.puppleNum; i++) {
        let o = this.puppleArr[i];
        ctx.fillStyle =
          "rgba(" + o.r + "," + o.g + "," + o.b + "," + o.a + ")"; //设定绘制颜色及透明度
        ctx.beginPath(); //开始绘制
        ctx.arc(o.x, o.y, o.radius, 0, 360, false); //绘制一个圆
        ctx.fill(); //填充颜色
        ctx.closePath(); //结束绘制
        o.x += o.v * Math.cos(o.angle) * 0.03; //泡泡位置移动
        o.y += o.v * Math.sin(o.angle) * 0.4;
        o.isChangeRadius && (o.radius -= 0.01);
        o.a -= Math.random() * 0.01; //透明度逐渐降低
        if (o.a <= 0 || o.radius <= 0 || o.y < 0) {
          this.puppleArr[i] = this.genPupple(); //重置泡泡
        }
      }
      // setTimeout(foo, 1);     //定时器
      if (this.isDisposed) {
        cancelAnimationFrame(this.timer);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.timer = null;
        this.canvas = null;
        this.puppleArr = null;
        return;
      }
      this.timer = requestAnimationFrame(foo);
    }
    foo(); //绘制到画布上
  }
}

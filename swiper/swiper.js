/**
 * 滚动
 * @container 列表容器 
 */
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame

class Swiper {
  constructor(config) {
    // 内置变量
    this.state = {
      timer: null,             // 定时器
      offset: 0,               // 偏移量
      frameAnimateStart: true, // 帧动画开始
      wait: 0,                 // 延时计数
    }
    // 配置
    this.config = {
      container: null,         // 容器
      interval: 2,             // 时间间隔,单位为秒
      speed: 1,                // 移动速度,单位为px
      step: true,              // 开启步进
      duraction: 1,            // 动画持续时间,step==true时有效 
      animationType: 'frame',  // 动画方式:'interval' | 'frame'
      ...config
    }
    this.init();
  }

  init = () => {
    if (this.config.step) {
      // 监听过渡动画结束后触发回调
      this.config.container.removeEventListener("transitionend", this.animationEndHandler);
      this.config.container.addEventListener("transitionend", this.animationEndHandler);
    }
    this.config.container.addEventListener('mouseenter', this.mouseEnterHander);
    this.config.container.addEventListener('mouseleave', this.mouseLeaveHandler);

    this.startAnimate()
  }

  startAnimate = () => {
    if (this.config.animationType === 'interval') {
      this.initInterval();
    }
    else {
      this.startAnimation();
    }
  }

  /**
   * 动画结束 将头部dom移动到末尾
   * */
  animationEndHandler = () => {
    this.config.container.style.transform = "translateY(0)";
    this.state.offset = 0;
    this.config.container.style.transition = "";
    this.config.container.appendChild(this.config.container.children[0]);
  };

  /**
   * 开始滚动
   * */
  initInterval() {
    this.state.timer = setInterval(() => {
      if (this.config.container.children[0]) {
        let scrollHeight = parseFloat(this.config.container.children[0].offsetHeight);
        if (this.config.step) {
          this.config.container.style.transform = `translateY(-${scrollHeight}px)`;
          this.config.container.style.transition = `all ${this.config.duraction}s ease-in-out`;
        }
        else {
          this.config.container.style.transform = `translateY(${this.state.offset -= this.config.speed}px)`;
          // this.config.container.style.transition = `all ${100 / 60}ms ease`;
          if (-this.state.offset >= scrollHeight) {
            this.animationEndHandler();
          }
        }

      }
    }, this.config.interval * 1000);
  }

  /**
   * 帧动画实现
   */
  startAnimation = () => {
    this.frameAnimation();
  }

  /**
   * 帧动画
   */
  frameAnimation = () => {
    if (!this.state.frameAnimateStart) {
      return
    }
    let scrollHeight = parseFloat(this.config.container.children[0].offsetHeight);
    if (this.state.wait < this.config.interval * 60) {
      this.state.wait++;
    }
    else {
      this.state.wait = 0;
      if (this.config.step) {
        this.config.container.style.transform = `translateY(-${scrollHeight}px)`;
        this.config.container.style.transition = `all ${this.config.duraction}s ease`;
      }
      else {
        this.state.offset += this.config.speed
        this.config.container.style.transform = `translateY(-${this.state.offset}px)`;
        if (this.state.offset >= scrollHeight) {
          this.animationEndHandler();
        }
      }
    }
    this.state.timer = requestAnimationFrame(this.frameAnimation)
  }

  /**
   * 鼠标进入
   * */
  mouseEnterHander = () => {
    this.dispose()
  };

  /**
   * 鼠标移出
   * */
  mouseLeaveHandler = () => {
    this.state.frameAnimateStart = true;
    this.startAnimate();
  };

  // 销毁
  dispose = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      cancelAnimationFrame(this.state.timer);
      this.state.frameAnimateStart = false;
      this.state.timer = null;
    }
  }
}

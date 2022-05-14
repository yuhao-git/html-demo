/**
 * 滚动
 * @container 列表容器 
 * @interval 间隔
 */
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame

class Swiper {
  constructor({ container, interval = 0, speed = 2, duraction = 0.01, step = false, animationType = 'frame' }) {
    this.container = container;
    this.timer = null; // 定时器
    this.offset = 0;  // 偏移量
    this.interval = interval; //时间间隔 单位为秒 interval>duraction
    this.speed = speed; // 移动速度
    this.duraction = duraction; //动画时间 step 为 true时有效 
    this.step = step; // 步进
    this.wait = 0;
    this.frameAnimateStart = true; // 帧动画开始
    this.animationType = animationType; // 动画方式 'interval' | 'frame'

    this.init();
  }

  init = () => {
    if (this.step) {
      // 监听过渡动画结束后触发回调
      this.container.removeEventListener("transitionend", this.animationEndHandler);
      this.container.addEventListener("transitionend", this.animationEndHandler);
    }
    this.container.addEventListener('mouseenter', this.mouseEnterHander);    
    this.container.addEventListener('mouseleave', this.mouseLeaveHandler);

    this.startAnimate()
  }

  startAnimate = () => {
    if (this.animationType === 'interval') {
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
    this.container.style.transform = "translateY(0)";
    this.offset = 0;
    this.container.style.transition = "";
    this.container.appendChild(this.container.children[0]);
  };

  /**
   * 开始滚动
   * */
  initInterval() {
    this.timer = setInterval(() => {
      if (this.container.children[0]) {
        let scrollHeight = parseInt(this.container.children[0].offsetHeight);
        if (this.step) {
          this.container.style.transform = `translateY(-${scrollHeight}px)`;
          this.container.style.transition = `all ${this.duraction}s ease-in-out`;
        }
        else {
          this.container.style.transform = `translateY(${this.offset -= this.speed}px)`;
          this.container.style.transition = `all ${100 / 60}ms ease`;
          if (-this.offset >= scrollHeight) {
            this.animationEndHandler();
          }
        }

      }
    }, this.interval * 1000);
  }

  /**
   * 帧动画实现定时
   */
  startAnimation = () => {
    this.frameAnimation();
  }

  /**
   * 帧动画
   */
  frameAnimation = () => {
    if (!this.frameAnimateStart) {
      return
    }
    let scrollHeight = parseInt(this.container.children[0].offsetHeight);
    if (this.wait < this.interval) {
      this.wait++;
    }
    else {
      this.wait = 0;
      if (this.step) {
        this.container.style.transform = `translateY(-${scrollHeight}px)`;
        this.container.style.transition = `all ${this.duraction}s ease-in-out`;
      }
      else {
        this.offset += this.speed
        this.container.style.transform = `translateY(-${this.offset}px)`;
        if (this.offset >= scrollHeight) {
          this.animationEndHandler();
        }
      }
    }
    this.timer = requestAnimationFrame(this.frameAnimation)
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
    this.frameAnimateStart = true;
    this.startAnimate();
  };

  // 销毁
  dispose = () => {
    if (this.timer) {
      clearInterval(this.timer);
      cancelAnimationFrame(this.timer);
      this.frameAnimateStart = false;
      this.timer = null;
    }
  }
}

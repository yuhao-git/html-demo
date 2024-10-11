<template>
  <div class="particle-container">
    <div style="width: 100%; height: 100%"
         id="container">
      <canvas id="c"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFinished: false,
    };
  },
  mounted() {
    let n = 25,
      //   duration = 1.25,
      duration = 1.25,
      container = document.getElementById("container");
    // ...not these
    let c = document.getElementById("c"),
      ctx = c.getContext("2d"),
      cw = (c.width = container.getBoundingClientRect().width),
      ch = (c.height = container.getBoundingClientRect().height),
      img = new Image(),
      // img.src="./icon.png"
      particles = [],
      particleNumber = 0,
      Particle = function (_i) {
        this.index = _i;
        this.draw = function () {
          ctx.globalAlpha = this.alpha;
          ctx.globalCompositeOperation = "lighter";
          // if (particleNumber%5==0) ctx.drawImage(img, this.x, this.y, this.size, this.size*1.1);
          if (particleNumber % this.index == 0)
            ctx.drawImage(
              img,
              this.x,
              this.y - 2,
              this.size * 0.1,
              this.size * 0.1
            );
          ctx.drawImage(img, this.x, this.y, this.size, this.size);
        };
      };
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNqEkDEKwkAQReMawRgLCxtv5AXS52ja6g28kI1FwJgIYRP/Dy8gojjwYNl9zMzf2X6oE1UQc/DZ1YsIfcrDQqxELjLEVjxEI7qULpa2Yic2iJW4ipuoJzFHKkSJeBBnOreB0RmdLK2h5M5vYVr8bwXSPdnp6H3EnXPF6DF1JJ0XP4nLRxinju9iQufll+8ZRY/uGNf8+vCXAAMAspIzJ26VQW4AAAAASUVORK5CYII=";

    // First run
    for (let i = 0; i < n; i++) {
      particles.push(new Particle(i));
      this.setParticle(particles[i], ch, cw, particleNumber, duration, n);
    }
    let draw = function () {
      ctx.clearRect(0, 0, cw, ch);
      for (let i = 0; i < n; i++) particles[i].draw();
    };
    TweenMax.ticker.addEventListener("tick", draw);

    // 清除动画回收内存
    // this.$once("hook:beforeDestroy", () => {
    //   this.isFinished = true;
    //   TweenMax.ticker.removeEventListener("tick", draw);
    //   TweenMax.killAll();
    //   this._tl.kill();
    //   this._tl.clear();
    //   this._tl.eventCallback("onComplete", null);

    //   TweenMax.killTweensOf(this._tl.target, false, null);
    //   this._tl.prevNode = null;
    //   this._tl.nextNode = null;
    //   this._tl.target = null;
    //   this._tl.vars = null;
    //   this._tl.data = null;
    //   this._tl = null;


    //   ctx.clearRect(0, 0, cw, ch);
    //   ctx = null;
    //   for (let i = 0; i < n; i++) {
    //     particles[i] = null;
    //   }
    //   c = null;
    //   img = null;
    //   this._tl = null;
    //   container = null;
    //   particles = [];

      
    // });
  },
  methods: {
    rand(min = 0, max = 1) {
      return min + (max - min) * Math.random();
    },
    setParticle(p, ch, cw, particleNumber, duration, n) {
      particleNumber++;
      let _size = this.rand(4, 12), // px width + height
        _dur = this.rand(duration, duration + _size / 10);
      this._tl = new TimelineMax()
        .fromTo(
          p,
          _dur,
          { x: this.rand(-_size, cw), y: ch, size: _size },
          {
            x: "+=" + this.rand(_size * -10, _size * 45),
            y: -_size,
            size: 15,
            ease: Sine.easeIn,
            onComplete: () => {
              if (this.isFinished) return;
              this.setParticle(p, ch, cw, particleNumber, duration, n);
            },
          },
          0
        )
        //.fromTo(p,  _dur/3, {alpha:0.3}, {alpha:1, ease:Power1.easeInOut}, 0)
        .to(p, _dur / 4, { size: 1 }, _dur - _dur / 4);
      if (particleNumber < n) this._tl.seek(_dur * this.rand()); //fast forward on first run

      
    },
  },
};
</script>
<style lang="less" scoped>
.particle-container {
  // position: absolute;
  // left: 280px;
  height: 100%;
  width: 100%;
}
</style>
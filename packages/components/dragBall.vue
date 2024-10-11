<template>
  <div>
    <transition>
      <div ref="breathingLamp"
           class="breathing-lamp"
           @touchstart.stop="handleTouchStart"
           @touchmove.prevent.stop="handleTouchMove($event)"
           @touchend.stop="handleTouchEnd"
           :style="{
            left: left + 'px',
            top: top + 'px',
            width: itemWidth + 'px',
            height: itemHeight + 'px',
           }">
        <cirle-menu ref="cirlMenu"
                    v-bind="$attrs"
                    :child-number="childNumber">
          <!-- 接受插槽 item-btn item-1 ... item-4 -->
          <template v-for="(index, name) in $slots"
                    :slot="name">
            <slot :name="name" />
          </template>
        </cirle-menu>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dragBall",
  props: {
    childNumber: {
      type: Number,
      default: 0,
    },
    // 球名字默认：“”
    text: {
      type: String,
      default: "",
    },
    // 球宽度默认：“40”
    itemWidth: {
      type: Number,
      default: 60,
    },
    // 球高度默认：“40”
    itemHeight: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      yOffset: 0, // 垂直偏移量
      left: 0, // 距离左边距离
      top: 0, // 距离抬头距离
      startToMove: false, // 开始移动时候不显示
      isShow: true, // 组件是否显示
      timer: null, // 定时器
      currentTop: null, // 获取当前页面的滚动条纵坐标位置
      clientW: document.documentElement.clientWidth, //视口宽
      clientH: document.documentElement.clientHeight, //视口高
      isSelected: false,
      showPopover: false,
      placement: "left-end",
      shotShow: false,
    };
  },
  created() {
    this.resize();
    // 初始化定义距离四周距离
    this.left = this.clientW - this.itemWidth - 15;
    this.top = (this.clientH - this.itemHeight) / 2;
    window.addEventListener("resize", () => {
      this.resize();
    });
  },
  methods: {
    // 点击小球事件
    onclick() {
      this.$router.replace("/digitalSigns/home");
    },

    // 开始移动方法
    handleTouchStart(e) {
      this.startToMove = true;
      this.$refs.breathingLamp.style.transition = "none";
      this.isSelected = true;
    },

    // 移动中方法
    handleTouchMove(e) {
      this.$refs.cirlMenu.closeMenuList();
      this.isSelected = true;
      const clientX = e.targetTouches[0].clientX; //手指相对视口的x
      const clientY = e.targetTouches[0].clientY; //手指相对视口的y

      const isInScreen =
        clientX <= this.clientW &&
        clientX >= 0 &&
        clientY <= this.clientH &&
        clientY >= 0;
      if (this.startToMove && e.targetTouches.length === 1) {
        if (isInScreen) {
          this.left = clientX - this.itemWidth / 2;
          this.top = clientY - this.itemHeight / 2 - this.yOffset;
        }
      }
    },

    // 移动结束方法
    handleTouchEnd() {
      this.isSelected = false;
      if (this.left < this.clientW / 2) {
        this.left = 15; //不让贴边
        // this.placement = "right-end";
        this.handleIconY();
      } else {
        this.left = this.clientW - this.itemWidth - 15;
        // this.placement = "left-end";
        this.handleIconY();
      }
      if (this.$refs.breathingLamp) {
        this.$refs.breathingLamp.style.transition = "all .3s";
      }
    },

    // 上下不贴边方法
    handleIconY() {
      if (this.top < 15) {
        this.top = 15; //不帖上边
        if (this.left === 15) {
          this.placement = "right-start";
        } else {
          this.placement = "left-start";
        }
      } else if (this.top + this.itemHeight > this.clientH - 15) {
        this.top = this.clientH - this.itemHeight - 15;
        if (this.left === 15) {
          this.placement = "right-end";
        } else {
          this.placement = "left-end";
        }
      } else {
        if (this.left === 15) {
          this.placement = "right";
        } else {
          this.placement = "left";
        }
      }
    },

    // 尺寸调整
    resize() {
      // this.yOffset = document.querySelector(
      //   ".van-nav-bar__content"
      // ).clientHeight;

      this.clientW = document.documentElement.clientWidth; //视口宽
      this.clientH = document.documentElement.clientHeight; //视口高

      this.handleTouchEnd();
    },
  },
};
</script>

<style lang="less" scoped>
.breathing-lamp {
  position: fixed;
  z-index: 2500;
  // opacity: 0.7;
  // display: flex;
  // color: #fff;
  // justify-content: center;
  // align-items: center;
  // background-color: rgb(44, 133, 233);
  // border-radius: 100%;
  // box-shadow: 0 0 6px rgb(123, 90, 233);
}

.screen-shot {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  // background-color: black;
  z-index: 2000;
}

.ball-selected {
  opacity: 1;
  box-shadow: 0 0 8px rgb(97, 63, 211);
  transform: scale(1.2);
}
</style>

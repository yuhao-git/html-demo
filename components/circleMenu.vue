<template>
  <div id='CircleMenu'>
    <div :class="type"
         :animate='animate'>
      <!-- 遮罩 -->
      <div class="oy-mask-black"
           v-show="MaskToggle"
           v-if="mask==='black'"
           @click="toggle"></div>
      <div class="oy-mask-white"
           v-show="MaskToggle"
           v-if="mask==='white'"
           @click="toggle"></div>
      <!-- 本体 -->
      <div class="oy-menu-group"
           :class="{'open':open}">
        <button class="oy-menu-btn btn-toggle"
                :class="{'oy-menu-btn-Circle':circle}"
                :style='{background:BtnColor}'
                @click="toggle">
          <slot name="item-btn"></slot>
        </button>
        <div class="btn-list">
          <div v-for="item in childNumber"
               :key="item"
               :class="['oy-menu-item',`oy-menu-item_${item}`,AnimateClass]">
            <slot :name="`item-${item}`"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const hexColors = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
const rgbColors =
  /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g;
function isColors(value) {
  return hexColors.test(value) || rgbColors.test(value);
}
export default {
  name: "cirleMenu",
  props: {
    type: {
      //top,bottom,left,right,middle,middle-around
      type: String,
      required: false,
      default: "top",
    },
    childNumber: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0 && value < 5;
      },
    },
    animate: String,
    mask: String,
    circle: {
      type: Boolean,
      default: true,
    },
    btn: Boolean,
    colors: Array,
  },
  data() {
    return {
      open: false,
      toggleAnimate: false,
      MaskToggle: false,
      BtnColor: "",
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.toggleAnimate = !this.toggleAnimate;
      this.MaskToggle = !this.MaskToggle;
    },
    closeMenuList() {
      this.open = false;
      this.toggleAnimate = false;
      this.MaskToggle = false;
    },
  },
  computed: {
    AnimateClass() {
      return this.toggleAnimate ? this.animate : "";
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
// 菜单基础间隔距离
@MenuSpace: 42px;
@MenuPrepSpace: -42px;
@btn-shadow: 0px 3px 5px rgba(0, 138, 254, 0.6);
@btn-bg: #118ff7;

//菜单type类型,middle-round因为有“-”会报错
@top: .top;
@bottom: .bottom;
@left: .left;
@right: .right;
@middle: .middle;

//圆环大小
@CircleWidth: 32px;
@CircleHeight: 32px;

// 遮罩基础样式
.mask() {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

// 菜单按钮基础样式
.meun-base() {
  width: @CircleWidth;
  height: @CircleHeight;
  // line-height: 50px;
  display: inline-block;
  border: none;
  text-align: center;
  position: relative;
}

//圆角
.circle() {
  border-radius: 50%;
}

//菜单位置
.CircleItem() {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
}

.oy-menu-group .btn-list .oy-menu-item {
  @{top} & {
    .CircleItem();
  }
  @{bottom} & {
    .CircleItem();
  }
  @{left} & {
    .CircleItem();
  }
  @{right} & {
    .CircleItem();
  }
  @{middle} & {
    .CircleItem();
  }
  .middle-around & {
    .CircleItem();
  }
}
.oy-menu-group.open .btn-list .oy-menu-item {
  @{top} & {
    opacity: 1;
  }
  @{bottom} & {
    opacity: 1;
  }
  @{left} & {
    opacity: 1;
  }
  @{right} & {
    opacity: 1;
  }
  @{middle} & {
    opacity: 1;
  }
  .middle-around & {
    opacity: 1;
  }
}

// tope 样式
.top-open(@n, @i: 1) when (@i =< @n) {
  .top .oy-menu-group.open .btn-list .oy-menu-item.oy-menu-item_@{i} {
    top: (@i * @MenuPrepSpace);
    transition: 0.2s 0.1s;
  }
  .top-open(@n, (@i + 1));
}
.top(@n, @i: 1) when (@i =< @n) {
  .top .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .top(@n, (@i + 1));
}

.top(4);
.top-open(4);

// bottom的样式
.bottom-open(@n, @i: 1) when (@i =< @n) {
  .bottom .oy-menu-group.open .btn-list .oy-menu-item.oy-menu-item_@{i} {
    top: (@i * @MenuSpace);
  }
  .bottom-open(@n, (@i + 1));
}
.bottom(@n, @i: 1) when (@i =< @n) {
  .bottom .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .bottom(@n, (@i + 1));
}
.bottom(4);
.bottom-open(4);

//left的样式
.left-open(@n, @i: 1) when (@i =< @n) {
  .left .oy-menu-group.open .btn-list .oy-menu-item.oy-menu-item_@{i} {
    left: (@i * @MenuSpace);
  }
  .left-open(@n, (@i + 1));
}
.left(@n, @i: 1) when (@i =< @n) {
  .left .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .left(@n, (@i + 1));
}
.left(4);
.left-open(4);

//right的样式
.right-open(@n, @i: 1) when (@i =< @n) {
  .right .oy-menu-group.open .btn-list .oy-menu-item.oy-menu-item_@{i} {
    left: (@i * @MenuPrepSpace);
  }
  .right-open(@n, (@i + 1));
}
.right(@n, @i: 1) when (@i =< @n) {
  .right .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .right(@n, (@i + 1));
}
.right-open(4);
.right(4);

//middle的样式
.middle(@n, @i: 1) when (@i =< @n) {
  .middle .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .middle(@n, (@i + 1));
}
.middle(4);
.middle .oy-menu-group.open .btn-list {
  & .oy-menu-item.oy-menu-item_1 {
    left: @MenuPrepSpace;
  }
  & .oy-menu-item.oy-menu-item_2 {
    left: @MenuSpace;
  }
  & .oy-menu-item.oy-menu-item_3 {
    left: 2 * @MenuPrepSpace;
  }
  & .oy-menu-item.oy-menu-item_4 {
    left: 2 * @MenuSpace;
  }
}

//middle-around的样式
.middle-around(@n, @i: 1) when (@i =< @n) {
  .middle-around .oy-menu-group .btn-list .oy-menu-item.oy-menu-item_@{i} {
    transition: 0.2s 0.1s;
  }
  .middle-around(@n, (@i + 1));
}
.middle-around(4);
.middle-around .oy-menu-group.open .btn-list {
  & .oy-menu-item.oy-menu-item_1 {
    left: (@MenuPrepSpace)-20px;
    top: 0px;
  }
  & .oy-menu-item.oy-menu-item_2 {
    left: @MenuSpace+20px;
    top: 0px;
  }
  & .oy-menu-item.oy-menu-item_3 {
    left: (@MenuSpace)-15px;
    top: (@MenuPrepSpace)-10px;
  }
  & .oy-menu-item.oy-menu-item_4 {
    left: @MenuPrepSpace+15px;
    top: (@MenuPrepSpace)-10px;
  }
}

//遮罩样式
.oy-mask-white {
  .mask();
  background: rgba(255, 255, 255, 0.8);
  &_transparent {
    .mask();
  }
}

.oy-mask-black {
  .mask();
  background: rgba(0, 0, 0, 0.6);
  &_transparent {
    .mask();
  }
}

// 菜单和子菜单的基础样式
.oy-menu-group {
  z-index: 1001;
}

.oy-menu-btn {
  background: @btn-bg;
  box-shadow: @btn-shadow;
  .meun-base();
  &:active {
    box-shadow: inset 0 0 1000px rgba(0, 0, 0, 0.5);
  }
}
.oy-menu-btn-Circle {
  .circle();
  outline: none;
}

.oy-menu-item {
  .meun-base();
  .circle();
  box-shadow: @btn-shadow;
  background-color: @btn-bg;
  color: #8a919f;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    box-shadow: inset 0 0 1000px rgba(0, 0, 0, 0.5);
  }
}

// 默认开关按钮样式
.icon-bars {
  background: #fff;
  height: 1px;
  width: 22px;
  margin: auto;
  display: block;
  position: relative;
  transition: 0.2s 0.2s;
  &:after {
    content: "";
    position: absolute;
    height: 22px;
    width: 1px;
    background: #fff;
    top: -10px;
  }
  .oy-menu-group.open & {
    transform: rotate(45deg);
  }
}
// 菜单和子菜单定位
.oy-menu-group {
  position: relative;
  float: right;
  transition: 0.2s;
}
.oy-menu-group .btn-toggle {
  z-index: 15;
}
</style>
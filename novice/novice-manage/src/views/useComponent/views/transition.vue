<template>
  <el-button @click="add">添加</el-button>
  <el-button @click="sub">减少</el-button>
  <el-button @click="exchange">交换</el-button>
  {{ state.currentIndex }}
  <div class="container">
    <transition-group>
    <div class="element" @click="toCenter(index)" 
         :style="{ '--i': index - 3, '--v': Math.abs(index - 3), '--z': -Math.abs(3 - Math.abs(index - 3)) }"
          v-for="(item, index) in  state.list " :key="item">
      {{ item }}
    </div>
    </transition-group>
  </div>
</template>

<script lang='ts' setup>
import { reactive, } from 'vue';
const state = reactive({ list: [1, 2, 3, 4, 5, 6, 7], currentIndex: 0 },);

function add() {
  state.list.push(state.list.length + 1);
}
function sub() {
  state.list.pop();
}
function exchange() {
  // 交换位置
  const temp = state.list[0];
  state.list[0] = state.list[5];
  state.list[5] = temp;
}

function toCenter(index) {

  state.currentIndex = index
  const center = Math.floor(state.list.length / 2);
  // 将点击的元素移动到第三位
  const temp = state.list[index];
  state.list[index] = state.list[center];
  state.list[center] = temp;

  // state.list.splice(index, 1);
  // state.list.splice(center, 0, temp);
}

// let index = 0;
// setInterval(() => {
//   index = (index + 1) % state.list.length;
//   toCenter(index)
// }, 500)

function getStyle(index) {
  return {
    transform: `rotate(${index * 30}deg)`
  }
}
</script>
<style scoped lang='less'>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  border: 1px solid #000;
  gap: 10px;
  overflow: hideen;
  // flex-wrap: wrap;
  position: relative;
  transform-style: preserve-3d;
  /* 启用子元素的三维变换 */
  transform: perspective(1000px) ;
  /* 视角和旋转 */
}

.element {
  height: 140px;
  width: 100px;
  background: #999;
  // position: absolute;
  cursor: pointer;
  transition: 0.6s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  // z-index: var(--v);
  // transform: translateX(calc(var(--i) * 120px)) rotateY(calc(var(--i) * -10deg));
}
</style>
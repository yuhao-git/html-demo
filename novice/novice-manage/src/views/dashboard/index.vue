<template>
    <canvas id="cns1" width="200" height="300"></canvas>
    <!--canvas画布-->
    <el-button @click="pause">暂停</el-button>
    <el-button type="primary" @click="start">开始</el-button>
</template>

<script lang='ts' setup>
// import menu from "@/store/modules/menu.ts"
import Model from './particle.js'
import { nextTick, onMounted } from 'vue'
// @ts-ignore
let model: any = null;

function start() {
  //获取CSS选择器的画布元素  并new一个粒子发生器的对象出来(即实例化)
  if (model) {
    model.dispose();
    model = null;
  }
  model = new Model(document.querySelector("#cns1"));
}
onMounted(() => {
  let width = document.body.clientWidth - 200;
  let height = document.body.clientHeight - 100;
  document.querySelector("#cns1").width = width;
  document.querySelector("#cns1").height = height;
  start()
})
function pause() {
  model?.dispose?.();
  model = null;
}

</script>
<style scoped lang='less'>

</style>
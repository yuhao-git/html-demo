<template>
  <div class="container">
    <div ref="chart"
         class="chart"></div>
  </div>

</template>

<script lang='ts' setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  nextTick,
  onUnmounted,
} from "vue";
import * as echarts from "echarts";
import { useRoute, useRouter } from "vue-router";

let chart = ref();
let myChart: any = null;
let option = null;
let chartDom = null;
nextTick(() => {
  chartDom = chart.value;
  myChart = echarts.init(chartDom);
  option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {},
      },
    ],
  };
  myChart.setOption(option);
});

/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});

onUnmounted(() => {
  // myChart.dispose();
  // myChart = null;
  // option = null;
  // chartDom = null;
});

watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang='less'>
.chart {
  height: 100%;
  widows: 100%;
}
.container {
  height: 100%;
  width: 100%;
  display: grid;
}
// grid-template-rows / grid-template-columns	设置列和行的尺寸。
// grid-template-areas	指定网格布局使用的网格项名称
// grid-auto-columns	指定行的尺寸（高度），以及列的自动尺寸。
// grid-auto-rows / grid-template-columns	指定行的自动尺寸，并设置 grid-template-columns 属性。
// grid-auto-flow grid-auto-columns	指定行的尺寸（高度），以及自动布局算法怎样运作，和列的自动尺寸。
// grid-auto-flow grid-auto-rows / grid-template-columns	指定自动布局算法怎样运作，和行的自动尺寸，以及设置 grid-template-columns 属性。
</style>
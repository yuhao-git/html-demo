<script setup lang="ts">
import echarts3dPie from "../components/echarts3dPie/echarts3dPie.vue";

const graphicOptions = {
  width: 260,
  height: 240,
};
const otherOptions = {
  legend: {
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 20,
    orient: "vertical",
    icon: "roundRect",
    right: 50,
    top: "center",
    // formatter: (name) => {
    //   let total = this.pieData.reduce((total, item) => {
    //     return total + parseFloat(item.value);
    //   }, 0);
    //   let item = this.pieData.find((t) => t.name === name);
    //   const unitObj = bgUtils.getUnitObjWithNumber(item.value);
    //   const percent = ((item.value / (total || 1)) * 100).toFixed(2);
    //   return (
    //     "{name|" +
    //     name +
    //     "} : {value|" +
    //     unitObj.value +
    //     " " +
    //     unitObj.dw +
    //     this.pieDw +
    //     " " +
    //     percent +
    //     "%}"
    //   );
    // },
    textStyle: {
      rich: {
        name: {
          align: "left",
          color: "#ffffff",
          fontSize: 12,
          fontFamily: "SourceHanSansCN-Regular",
        },
        value: {
          align: "left",
          color: "#78deff",
          fontSize: 12,
          fontFamily: "SourceHanSansCN-Regular",
        },
      },
    },
  },
};
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <echarts3dPie
      style="width: 600px; height: 200px"
      :graphicOptions="graphicOptions"
      :otherOptions="otherOptions"
      :gridPosition="{ top: '-2%', left: '-14%' }"
      :graphicPosition="{ top: '10%', left: '14.5%' }"
    />
  </div>
</template>
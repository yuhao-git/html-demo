<template>
  <div class="box">
    <div class="chart" ref="radarChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  // 雷达图
  name: "radar",
  data() {
    return {
      // radarChart: "",
    };
  },
  props: {
    // 颜色
    colors: {
      default: () => ["#d7c52e", "#1c81e9"],
    },
    // 数据
    data: {
      default: () => [
        { value: [10, 60, 10, 9, 2], name: "2020" },
        { value: [10, 10, 17, 9, 12], name: "2019" },
        { value: [10, 30, 18, 2, 22], name: "2018" },
        { value: [12, 20, 19, 2, 44], name: "2017" },
        { value: [30, 40, 14, 19, 23], name: "2016" },
      ],
    },
    //
    indicator: {
      default: () => [
        { name: "1-3期" },
        { name: "4-6期" },
        { name: "7-9期" },
        { name: "10-12期" },
        { name: "12期以上" },
      ],
    },
  },
  methods: {
    getRadarOption() {
      // let color = this.colors;
      const color = [
        "#1c81e9",
        "#91d7ff",
        "#44d2a9",
        "#41ded5",
        "#d7c52e",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#09a232",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ];
      // 固定值得大小
      let max = 0;
      this.data.forEach((item) => {
        const num = Math.max(...item.value);
        max = max < num ? num : max;
      });

      let data = this.data.map((item, index) => {
        return {
          ...item,
          itemStyle: {
            color: color[index * color.length],
          },
        };
      });
      const indicator = this.indicator.map((item, index) => {
        return { ...item };
      });
      const option = {
        title: {
          text: "",
          show: false,
        },
        tooltip: {
          trigger: "item",
          borderColor: "#1b60b7",
          borderWidth: 1,
          backgroundColor: "rgba(2, 17, 37, 0.5)",
          padding: [10, 12],
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          type: "scroll",
          bottom: 10,
          icon: "circle",
          textStyle: {
            color: "#fff",
          },
        },
        visualMap: {
          show: false,
          top: "middle",
          right: 10,
          color: color,
          calculable: true,
          // max: max,
        },
        radar: {
          indicator: indicator,
          // alignTicks: false,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ["rgba(0,0,0,0.2)"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            },
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: "#153269",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#153269", // 分隔线颜色
              width: 1, // 分隔线线宽
            },
          },
          axisName: {
            color: "#fff",
          },
        },
        series: {
          name: "",
          type: "radar",
          symbol: "none",
          lineStyle: {
            width: 2,
          },
          emphasis: {
            areaStyle: {
              // color: "rgba(0,250,0,0.3)",
            },
          },
          data: data,
        },
      };
      return option;
    },

    drawPie() {
      this.radarChart?.dispose?.();
      this.radarChart = echarts.init(this.$refs.radarChart);
      const option = this.getRadarOption();
      this.radarChart.setOption(option);
    },
  },
  watch: {
    data: {
      handler: function () {
        const that = this;
        if (that.data) {
          this.$nextTick(() => {
            this.drawPie();
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  position: relative;
}

.chart {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 5;
}
</style>

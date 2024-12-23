<!--
 * author: wangyf
 * description: 3dpie图-圆圈更薄
 * Date: 2024-07-22 15:48:10
 *-->
<template>
  <div class="echarts3dPie">
    <div class="container" ref="myChart"></div>
    <visLoading v-if="loading" />
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts-gl";
import RING1 from "./img/pie-bg.png";
import bgUtils from "../../js/bgUtils";
import visLoading from "../visLoading.vue";
export default {
  components: {
    visLoading,
  },
  props: {
    /**
     * 初始化延迟时间
     */
    delay: {
      type: Number,
      default: 0,
    },
    pieData: {
      type: Array,
      default: () => {
        return [
          {
            name: "重庆市",
            value: Math.round(Math.random() * 100),
          },
          {
            name: "京津冀",
            value: Math.round(Math.random() * 100),
          },
          {
            name: "长三角",
            value: Math.round(Math.random() * 100),
          },
          {
            name: "其他区域1",
            value: Math.round(Math.random() * 100),
          },
          {
            name: "珠三角",
            value: Math.round(Math.random() * 100),
          },
          {
            name: "其他区域2",
            value: Math.round(Math.random() * 100),
          },
        ];
      },
    },
    colorList: {
      type: Array,
      default: () => {
        return [
          "#8858f9",
          "#f5406b",
          "#1943ff",
          "#f77a66",
          "#3ed9de",
          "#ffdd30",
        ];
      },
    },
    otherOptions: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 背景图片位置
    graphicPosition: {
      type: Object,
      default: () => {
        return {
          top: "20%",
          left: "10%",
        };
      },
    },
    // 3dPie图位置
    gridPosition: {
      type: Object,
      default: () => {
        return {
          top: "7%",
          left: "-8%",
        };
      },
    },
    pieDw: {
      type: String,
      default: "人",
    },
    graphicOptions: {
      type: Object,
      default: () => {
        return {
          width: 325,
          height: 275,
        };
      },
    },
  },
  watch: {
    pieData: {
      handler() {
        // 第一次加载时，延迟初始化
        if (this.loading) {
          setTimeout(() => {
            this.initChart();
          }, this.delay);
          return;
        }
        this.$nextTick(() => {
          this.initChart();
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      // myChart: null,
      RING1,
      loading: true,
    };
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },
  methods: {
    initChart() {
      if (this.myChart) {
        this.myChart.dispose();
      }
      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.formatOption());
      this.loading = false;
    },
    formatOption() {
      let legend = {};
      if (!this.otherOptions.legend) {
        legend = this.getLegend();
      }

      const series = this.getPie3D(this.pieData, 0.9, 240, 28, 26, 0.5);
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        // backgroundColor:'red',
        legend,
        // animation: true,
        tooltip: {
          trigger: "item",
          borderColor: "#1b60b7",
          borderWidth: 1,
          backgroundColor: "rgba(2, 17, 37, 0.5)",
          padding: [10, 12],
          formatter: (params) => {
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              const unitObj = bgUtils.getUnitObjWithNumber(
                option.series[params.seriesIndex].pieData.value
              );
              let total = this.pieData.reduce((total, item) => {
                return total + parseFloat(item.value);
              }, 0);
              const percent = (
                (option.series[params.seriesIndex].pieData.value /
                  (total || 1)) *
                100
              ).toFixed(2);
              return `${params.seriesName} : ${unitObj.value} ${unitObj.dw}${this.pieDw}<br/>占比：${percent}%`;
            }
          },
          textStyle: {
            align: "left",
            color: "#fff",
            fontSize: "14",
          },
        },
        graphic: [
          {
            type: "image",
            style: {
              image: this.graphicOptions.image || RING1, // 图片的 URL
              width: this.graphicOptions.width, // 图片宽度
              height: this.graphicOptions.height, // 图片高度
            },
            scaleY: 0.75,
            scaleX: 1,
            // rotation:50,
            left: this.graphicPosition.left,
            top: this.graphicPosition.top,
            z: -99,
            zlevel: 0,
          },
        ],
        title: {
          x: "center",
          top: "20",
          textStyle: {
            color: "#fff",
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: "#7BC0CB",
          },
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b} \n{c} {d}%",
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: 0.7, // pie图的高度
          top: this.gridPosition.top,
          left: this.gridPosition.left,
          // environment: '#021041',
          viewControl: {
            distance: 150, // pie图大小
            alpha: 30, // 垂直旋转角度
            beta: 60, // 水平旋转角度
            autoRotate: false, // 自动旋转
            zoomSensitivity: false,
          },
          zlevel: 10,
        },
        series: series,
      };
      option = this.deepMerge(option, this.otherOptions);
      return option;
    },
    // 深度合并对象
    deepMerge(target, source) {
      let _this = this;
      if (
        typeof target !== "object" ||
        target === null ||
        typeof source !== "object" ||
        source === null
      ) {
        // 如果任一参数不是对象或null，则直接返回source
        return source;
      }

      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            target[key] &&
            typeof target[key] === "object" &&
            target[key] !== null
          ) {
            // 如果属性值是对象，则递归合并
            _this.deepMerge(target[key], source[key]);
          } else {
            // 否则，直接覆盖
            target[key] = source[key];
          }
        }
      }

      return target;
    },
    // 生成legend
    getLegend() {
      let legend = [];
      this.pieData.forEach((t, index) => {
        legend.push({
          data: [t],
          textStyle: {
            color: "#fff",
          },
          top: Math.trunc(index / 2) * 10 + "%", // 一行两个，第一行top 0，第二行top 10%，第三行top 20%
          left: index % 2 ? "50%" : "0", // 第1,3,5...奇数个left 0%，第2,4,6...偶数个20%
          align: "left",
          itemWidth: 14,
          // itemHeight: 10,
          // itemGap: 80,
          formatter: (name) => {
            let total = this.pieData.reduce((total, item) => {
              return total + parseFloat(item.value);
            }, 0);
            let item = this.pieData.find((t) => t.name === name);
            const unitObj = bgUtils.getUnitObjWithNumber(item.value);
            const percent = ((item.value / (total || 1)) * 100).toFixed(2);
            return (
              "{name|" +
              name +
              "}    {value|" +
              unitObj.value +
              " " +
              unitObj.dw +
              this.pieDw +
              " " +
              percent +
              "%}"
            );
          },
          textStyle: {
            rich: {
              name: {
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "SourceHanSansCN-Regular",
              },
              value: {
                align: "left",
                color: "#40a2fe",
                fontSize: 14,
                fontFamily: "SourceHanSansCN-Regular",
              },
            },
          },
        });
      });

      return legend;
    },
    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: {
            show: false,
          },
          z: 999,
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
          itemStyle: {
            color: this.colorList[i],
          },
        };
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        // series[i].parametricEquation = this.getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value);
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          30
        );

        startValue = endValue;

        legendData.push(series[i].name);
      }
      return series;
    },
    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }

      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;

      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;

      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 1 * height : -1;
        },
      };
    },
  },
};
</script>
<style lang="less" scoped>
.echarts3dPie {
  width: 100%;
  height: 100%;
  position: relative;
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>

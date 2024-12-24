<template>
  <div style="position: relative; width: 100%; height: 100%">
    <div v-show="nodata" class="common-no-data-logo" />
    <div
      :style="`opacity: ${nodata ? '0' : '1'}`"
      ref="pie"
      style="position: absolute; width: 100%; height: 100%"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
import bgUtils from "../../js/bgUtils";
export default {
  name: "rosePie",
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "残疾人",
            value: Math.ceil(Math.random() * 1000 + 100),
          },
          {
            name: "4050人员",
            value: Math.ceil(Math.random() * 1000 + 100),
          },
          {
            name: "就业困难人群",
            value: Math.ceil(Math.random() * 1000 + 100),
          },
          {
            name: "失业登记人员",
            value: Math.ceil(Math.random() * 1000 + 100),
          },
          {
            name: "高校应届毕业生",
            value: Math.ceil(Math.random() * 1000 + 100),
          },
        ];
      },
    },
    chartName: {
      type: Array,
      default: () => {
        return ["人员类型", "人数", "人"];
      },
    },
    needToClick: {
      type: Boolean,
      default: false,
    },
    otherOptions: {
      type: Object,
      default: () => {
        return {};
      },
    },
    polarRadius: {
      type: String,
      default: "75%",
    },
    legendX: {
      type: String,
      default: "280",
    },
    legendY: {
      type: String,
      default: "center",
    },
    center: {
      type: Array,
      default: () => {
        return ["25%", "52%"];
      },
    },
    max: {
      type: Number,
      default: 100,
    },
    seriesRadius: {
      type: Array,
      default: () => {
        return ["15%", "75%"];
      },
    },
    color: {
      type: Array,
      default: () => {
        return [
          "#00cbb3",
          "#3d83ab",
          "#1d678f",
          "#3648a9",
          "#782AAE",
          "#AF42AE",
        ];
      },
    },
    legendLineBreaksWordNum: {
      type: Number,
      default: 20,
    },
  },
  components: {},
  data() {
    return {
      // myChart: null, // 渲染实例
      nodata: true,
    };
  },
  watch: {
    data: {
      handler() {
        if (this.data.length > 0) {
          this.nodata = false;
          this.$nextTick(() => {
            this.renderChart();
          });
        } else {
          this.nodata = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.init();
    this.renderChart();
  },
  methods: {
    // 初始化加载
    init() {
      this.myChart = echarts.init(this.$refs.pie);
      let option = {
        /*angleAxis、radiusAxis、polar 这三个是环形虚线背景的设置*/
        angleAxis: {
          type: "category",
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            fontSize: 14,
            color: "#fff",
            fontFamily: "Microsoft YaHei",
          },
          axisTick: {
            show: false,
          },
          data: [],
          z: 10,
        },
        radiusAxis: {
          max: this.max,
          min: 0,
          splitNumber: 6,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "#1b3b75",
            },
          },
          splitArea: {
            show: false,
          },
        },
        polar: {
          // center: ['25%', '52%'],
          center: this.center,
          radius: this.polarRadius,
        },
        color: this.color,
        tooltip: {
          backgroundColor: "rgba(2, 17, 37, 0.5)",
          borderColor: "#1b60b7",
          borderWidth: 1,
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            align: "left",
            color: "#fff",
            fontSize: "14",
          },
          formatter: (params) => {
            let valueObj = bgUtils.getUnitObjWithNumber(params.value);
            return `
              <div class="tooltip-row"><span>${this.chartName[0]}：</span>${
              params.name
            }</div>
              <div class="tooltip-row"><span>${this.chartName[1]}：</span>${
              valueObj.value + valueObj.dw
            }${this.chartName[2]}，占比：${params.percent}%</div>
              `;
          },
        },
        legend: {
          x: this.legendX,
          y: this.legendY,
          // icon: 'rect',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 15,
          orient: "vertical",
          textStyle: {
            rich: {
              name: {
                lineHeight: 20,
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "SourceHanSansCN-Regular",
              },
              value: {
                lineHeight: 20,
                align: "left",
                color: "#40a2fe",
                fontSize: 14,
                fontFamily: "SourceHanSansCN-Regular",
              },
            },
          },
        },
        calculable: true, // 是否显示拖拽用的手柄
        series: [
          {
            name: "人员类型",
            type: "pie",
            //起始角度，支持范围[0, 360]
            startAngle: 90,
            //饼图的半径，数组的第一项是内半径，第二项是外半径
            radius: this.seriesRadius,
            //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
            center: this.center, // ['70%', '52%'],
            //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
            // 'radius' 面积展现数据的百分比，半径展现数据的大小。
            //  'area' 所有扇区面积相同，仅通过半径展现数据大小
            roseType: "area",
            //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "outside",
              // formatter: function (params) {
              //   // //console.log(params);
              //   return params.percent + "%"
              // },
              fontSize: 10,
              fontFamily: "PingFang-SC-Regular",
              color: "#afd9ff",
              padding: [-10, , -10],
              position: "inner",
              // center: ['40%', '50%'],
            },
            labelLine: {
              show: false,
              length2: 1,
            },
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
            },
            data: [],
            animationDuration: 2000,
          },
        ],
      };
      option = this.deepMerge(option, this.otherOptions);
      this.myChart.setOption(option);
      this.myChart.off("click");
      if (this.needToClick) {
        this.myChart.on("click", (params) => {
          this.$emit("clickCallback", params);
        });
      }
    },

    /**
     * 绘制图形
     */
    renderChart() {
      if (!this.data.length) {
        return;
      }
      bgUtils.handleArrayWithPercent(
        this.data,
        "name",
        "value",
        this.data.length
      );
      let option = {
        // graphic: {
        //   elements: [
        //     {
        //       type: 'image',
        //       z: 1,
        //       style: {
        //         image: img,
        //         width: this.graphicOption.width,
        //         height: this.graphicOption.height,
        //       },
        //       left: 'center',
        //       top: 'center',
        //     },
        //   ],
        // },
        legend: {
          formatter: (itemName) => {
            let data = this.data.filter((item) => item.name === itemName)[0];
            let valueObj = bgUtils.getUnitObjWithNumber(data.value);
            let gap = "  ";
            if (itemName.length > this.legendLineBreaksWordNum) {
              gap = "\n";
            }
            return (
              "{name|" +
              itemName +
              "}" +
              gap +
              "{value|" +
              valueObj.value +
              valueObj.dw +
              this.chartName[2] +
              " 占比  " +
              data.percent +
              "%}"
            );
          },
        },
        series: [
          {
            data: this.data,
          },
        ],
      };
      this.myChart.setOption(option);
    },
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
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },
};
</script>

<style type="text/css" lang="less" scoped>
.common-no-data-logo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: unset;
}

.common-no-data-logo:before {
  content: "";
  position: absolute;
  width: 50px;
  height: 35px;
  background: url("/img/icon/nodateicon.png");
  background-size: 100% 100%;
  left: calc(50% - 65px);
  top: calc(50 - 12px);
}

.common-no-data-logo:after {
  //content: "暂无数据";
  content: "\6682\65E0\6570\636E";
  font-family: PingFang-SC-Bold;
  font-size: 18px;
  color: rgb(255, 255, 255);
  width: auto;
  height: 24px;
  line-height: 24px;
  letter-spacing: 5px;
  text-indent: 65px;
}
</style>

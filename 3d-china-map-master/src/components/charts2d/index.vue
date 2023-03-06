<template>
  <div>
    <div ref="chart"
         class="chart">
    </div>
  </div>
</template>

<script >
import yancheng from "./yancheng.json";
import mappng from "./map.png";
import * as echarts from "echarts";


// 地图旋转
const jwd = [120.136078, 33.383912];
const deg = 0.36;
let map = {
  features: null,
  type: "FeatureCollection"
};
map.features = yancheng.features.map(item => {
  let Coordinates = item.geometry.coordinates.map(son => {
    return son[0].map(sub => {
      return [
        (sub[0] - jwd[0]) * Math.cos(deg) -
          (sub[1] - jwd[1]) * Math.sin(deg) +
          jwd[0],
        (sub[0] - jwd[0]) * Math.sin(deg) +
          (sub[1] - jwd[1]) * Math.cos(deg) +
          jwd[1]
      ];
    });
  });
  return {
    type: "Feature",
    properties: item.properties,
    geometry: {
      coordinates: [Coordinates],
      type: "MultiPolygon"
    }
  };
});

echarts.registerMap("yancheng", map);

export default {
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      let option = this.getOption();
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(option);
    },
    getOption() {
      let piePatternImg = new Image();
      piePatternImg.src = mappng;
      return {
        // backgroundColor: "#040b1c",
        tooltip: {
          show: false,
          trigger: "item"
        },
        geo: {
          map: "yancheng",
          roam: true,
          itemStyle: {
            borderWidth: 0
          },
          label: {
            show: true,
            color: "#333"
          },
          emphasis: {
            focus: "none",
            label: {
              show: false,
              color: "red"
            }
          }
        },
        series: [
          {
            type: "map",
            map: "yancheng",
            itemStyle: {
              areaColor: {
                image: piePatternImg,
                repeat: "repeat"
              }
            }
          }
        ]
      };
      // return {
      //   xAxis: {
      //     type: "category",
      //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      //   },
      //   yAxis: {
      //     type: "value"
      //   },
      //   series: [
      //     {
      //       data: [120, 200, 150, 80, 70, 110, 130],
      //       type: "bar",
      //       label: {
      //         show: true,
      //         position: "top"
      //       },
      //       itemStyle: {
      //         barBorderRadius: [20, 20, 0, 0, 0],
      //         color: {
      //           image: piePatternImg,
      //           repeat: "repeat"
      //         }
      //       }
      //     }
      //   ]
      // };
    }
  }
};
</script>
<style scoped>
.chart {
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
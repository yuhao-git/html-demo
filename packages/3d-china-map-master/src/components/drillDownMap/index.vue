<template>
  <div ref="chart"
       class="chart">
  </div>
</template>

<script >
import yancheng from "../Map/json/yancheng.json";
import mappng from "../Map/textures/map.png";
import * as echarts from "echarts";

// 地图旋转
const jwd = [120.136078, 33.383912];
const deg = 0.36;
let map = {
  features: null,
  type: "FeatureCollection",
};
map.features = yancheng.features.map((item) => {
  let Coordinates = item.geometry.coordinates.map((son) => {
    return son[0].map((sub) => {
      return [
        (sub[0] - jwd[0]) * Math.cos(deg) -
          (sub[1] - jwd[1]) * Math.sin(deg) +
          jwd[0],
        (sub[0] - jwd[0]) * Math.sin(deg) +
          (sub[1] - jwd[1]) * Math.cos(deg) +
          jwd[1],
      ];
    });
  });
  return {
    type: "Feature",
    properties: item.properties,
    geometry: {
      coordinates: [Coordinates],
      type: "MultiPolygon",
    },
  };
});

echarts.registerMap("mapData", map);

export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    async drawChart() {
      let option = await this.getOption();
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(option);
    },
    // 图片加载完成
    async loadImageCompleted(src) {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img);
        };
      });
    },
    // 配置项
    async getOption() {
      const piePatternImg = await this.loadImageCompleted(mappng);
      // 添加阴影效果
      const colors = [
        "rgba(14, 100, 100,0.9)",
        "rgba(28, 96, 140,0.9)",
        "rgba(12, 145, 193,0.8)",
        "rgba(14, 166, 204,0.8)",
        "rgba(20, 190, 224,0.8)",
        "rgba(24, 173, 227,0.8)",
        "rgba(22, 161, 226, 0.8)",
        "rgba(14, 138, 179,0.8)",
        "rgba(10, 120, 150,0.8)",
      ];
      const geoShadow = colors
        .map((colorItem, colorIndex) => {
          return {
            map: "mapData",
            itemStyle: {
              areaColor: colorItem,
              shadowColor: colorItem,
              shadowBlur: 0,
              shadowOffsetX: colorIndex * 2,
              shadowOffsetY: 3 * (colorIndex + 1),
            },
          };
        })
        .reverse();

      return {
        // backgroundColor: "#040b1c",
        tooltip: {
          show: false,
          trigger: "item",
        },
        geo: [
          {
            map: "mapData",
            itemStyle: {
              areaColor: "#000",
              shadowColor: "#000",
              shadowBlur: 30,
              shadowOffsetX: 10,
              shadowOffsetY: 36,
            },
          },
          ...geoShadow,
          // 第二层边缘发光
          {
            map: "mapData",
            itemStyle: {
              areaColor: "rgba(176, 230, 249,1)",
              borderColor: "rgba(176, 230, 249,1)",
              shadowColor: "rgba(176, 230, 249, 0.9)",
              shadowBlur: 12,
              borderWidth: 5,
            },
          },
          // 顶层贴图
          {
            map: "mapData",
            roam: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#fff",

              areaColor: {
                image: piePatternImg,
                repeat: "no-repeat",
              },
            },
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {},
          },
        ],
        series: [
          // {
          //   type: "map",
          //   map: "mapData",
          //   itemStyle: {
          //     areaColor: {
          //       image: piePatternImg,
          //       repeat: "repeat",
          //     },
          //   },
          // },
        ],
      };
    },
  },
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
<template>
  <div class="h-full w-full">
    <div ref="chart" class="h-full w-full"></div>
    <img
      ref="img"
      class="absolute top-0 right-0 h-20 w-20 opacity-0"
      src="../components/textureMap/img/map.png"
      alt=""
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import $commonApi from "@/views/visiual/components/textureMap/common.js";
export default {
  name: "Geo3DMap",
  data() {
    return {
      // chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    this.destroyChart();
  },
  methods: {
    // 加载地图数据
    async loadMapData(mapName = "china", registMapName = "mapData") {
      const data = await $commonApi.getMapData(mapName);
      echarts.registerMap(registMapName, data.data);
    },
    async initChart() {
      this.chart = echarts.init(this.$refs.chart);
      await this.loadMapData("china", "mapData");
      const option = {
        geo3D: {
          map: "mapData",
          shading: "lambert",
          environment: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#00aaff", // 天空颜色
              },
              {
                offset: 0.7,
                color: "#1E1E1E", // 地面颜色
              },
              {
                offset: 1,
                color: "#1E1E1E", // 地面颜色
              },
            ],
            false
          ),
          viewControl: {
            distance: 100,
          },
          // instancing: true,
          light: {
            main: {
              intensity: 5,
              shadow: true,
              shadowQuality: "high",
              alpha: 60,
              beta: -30,
            },
            ambient: {
              color: "#fff",
              intensity: 0.3,
            },
          },
          label: {
            show: true,
            formatter: function (params) {
              return params.name;
            },
            textStyle: {
              color: "#000", //地图初始化区域字体颜色
              fontSize: 16,
            },
          },
          itemStyle: {
            color: "#39A1FF",
            borderWidth: 0.2,
            borderColor: "#333",
          },
          shading: "lambert", // color lambert realistic
          lambertMaterial: {
            detailTexture: this.$refs.img,
            textureTiling: 1, // 纹理平铺，1为一次，大于1为重复次数
          },
          // 设置地图区域的高度
          regionHeight: 1,
          groundPlane: {
            show: false,
            color: "#1E1E1E",
          },
          regions: [
            // {
            //   name: "成都",
            //   regionHeight: 4,
            // },
          ],
        },
        series: [
          // {
          //   type: "scatter3D",
          //   coordinateSystem: "geo3D",
          //   symbolSize: 5,
          //   data: [
          //     // 示例数据点
          //     { name: "北京", value: [116.405285, 39.904989, 1000] },
          //   ],
          // },
        ],
      };

      this.chart.setOption(option);
    },
    destroyChart() {
      this.chart.dispose();
    },
  },
};
</script>


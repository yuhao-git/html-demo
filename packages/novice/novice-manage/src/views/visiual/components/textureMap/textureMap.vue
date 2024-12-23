<!-- 带纹理地图 -->
<template>
  <div class="chart-container">
    <loading v-show="showLoading"></loading>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import $commonApi from "./common";
import mappng from "./img/map.png";
import * as echarts from "echarts";
import pointVertebral from "./img/point-vertebral.png";
import titleBg from "./img/title-bg.png";
import loading from "../visLoading.vue";
export default {
  name: "textureMap",
  components: {
    loading,
  },
  props: {
    dataSource: {
      default: () => [
        // { name: "网点1", value: [120.136078, 33.363912] },
        // { name: "网点2", value: [120.036078, 33.373912] },
        // { name: "网点3", value: [120.106078, 33.323912] },
      ],
    },
    winData: {
      default: () => [
        // {
        //   city: "响水县",
        //   infos: [
        //     { name: "购买住房", value: "12312" },
        //     { name: "偿还贷款", value: "12312" },
        //     { name: "贷款金额", value: "12312" },
        //   ],
        // },
        // {
        //   city: "射阳县",
        //   infos: [
        //     { name: "购买住房", value: "12312" },
        //     { name: "偿还贷款", value: "12312" },
        //   ],
        // },
        // {
        //   city: "东台市",
        //   infos: [
        //     { name: "购买住房", value: "12312" },
        //     { name: "偿还贷款", value: "12312" },
        //   ],
        // },
      ],
    },
    managersAddress: {
      default: () => [
        // { name: "大丰区", address: "地址地址地址地址大丰区" },
        // { name: "响水县", address: "地址地址地址地址响水县" },
        // { name: "滨海县", address: "地址地址地址地址滨海县" },
        // { name: "阜宁县", address: "地址地址地址地址阜宁县" },
        // { name: "射阳县", address: "地址地址地址地址射阳县" },
        // { name: "建湖县", address: "地址地址地址地址建湖县" },
        // { name: "东台市", address: "地址地址地址地址东台市" },
        // { name: "开发区", address: "地址地址地址地址开发区" },
        // { name: "亭湖区", address: "地址地址地址地址亭湖区" },
        // { name: "盐南区", address: "地址地址地址地址盐南区" },
        // { name: "盐都区", address: "地址地址地址地址盐都区" },
      ],
    },
  },
  data() {
    return {
      showLoading: true,
      // myChart: null,  // 万万不能响应式，会导致echarts5绘图异常，绘图效率低下，vue3 中可以使用 markRaw 将 Echarts 实例标记为原始对象
      aspectScale: 0.88, // 长宽比
      geoCoordMap: {},
      nameMap: new Map(),
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.myChart?.dispose?.();
    this.myChart = null;
  },
  methods: {
    async init() {
      await this.loadMapData("china", "mapData");
      await this.loadMapData("china-h", "mapDataHollow");
      // await this.rotateMap("china", "mapData");
      // await this.rotateMap("china-h", "mapDataHollow");
      this.drawChart();
    },
    // 加载地图数据
    async loadMapData(mapName = "china", registMapName = "mapData") {
      const data = await $commonApi.getMapData(mapName);
      echarts.registerMap(registMapName, data.data);
    },
    // 绘制地图
    async drawChart() {
      let option = await this.getOption();
      console.log(option);
      this.$nextTick(() => {
        if (!this.$refs.chart) {
          return;
        }
        this.myChart?.dispose?.();
        this.myChart = echarts.init(this.$refs.chart);
        this.myChart?.setOption(option);
        this.showLoading = false;
      });
    },
    // 重绘地图
    async redrawChart() {
      this.myChart?.clear?.();
      let option = await this.getOption();
      this.myChart?.setOption?.(option);
    },
    // 旋转地图
    // mapName 加载的地图数据,对应map/xxx.json
    // registMapName 注册到echarts使用的地图数据
    async rotateMap(mapName = "yancheng", registMapName = "mapData") {
      // 地图旋转
      let rotatedMapData = {
        features: null,
        type: "FeatureCollection",
      };
      const data = await $commonApi.getMapData(mapName); // yancheng-hollow
      const mapJsonData = data.data;

      const jwd = [120.139998, 33.377631]; // [120.136078, 33.383912]; // 旋转中心
      // const deg = 0.36; // 旋转角度
      const deg = 0; // 旋转角度
      // 旋转
      rotatedMapData.features = mapJsonData.features.map((item) => {
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

        registMapName == "mapData"
          ? this.nameMap.set(item.properties.name, item.properties.center)
          : "";
        return {
          type: "Feature",
          properties: item.properties,
          geometry: {
            coordinates: [Coordinates],
            // type: "MultiPolygon",
            type: item.geometry.type,
          },
        };
      });
      rotatedMapData.features.forEach((item) => {
        this.geoCoordMap[item.properties.name] = item.properties.center;
      });
      echarts.registerMap(registMapName, rotatedMapData);
    },
    // 加载纹理贴图
    async loadImageCompleted(src) {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img);
        };
      });
    },
    // 添加阴影
    getShadow() {
      // 添加阴影效果
      const colors = [
        // "rgba(14, 100, 100,0.9)",
        // "rgba(28, 96, 140,0.9)",
        // "rgba(12, 145, 193,0.8)",
        // "rgba(14, 166, 204,0.8)",
        // "rgba(20, 190, 224,0.8)",
        // "rgba(24, 173, 227,0.8)",
        // "rgba(22, 161, 226, 0.8)",
        // "rgba(14, 138, 179,0.8)",
        // "rgba(10, 120, 150,0.8)",
        "rgba(100,100,100,1)",
      ];
      const geoShadow = colors
        .map((colorItem, colorIndex) => {
          return {
            z: 50,
            map: "mapDataHollow",
            // type: "map",
            aspectScale: this.aspectScale,
            itemStyle: {
              areaColor: colorItem,
              shadowColor: colorItem,
              shadowBlur: 0,
              shadowOffsetX: colorIndex,
              // shadowOffsetY: 5.5 * (colorIndex + 1),
              shadowOffsetY: 10 * (colorIndex + 1),
            },
          };
        })
        .reverse();
      return geoShadow;
    },
    // 配置项
    async getOption() {
      let geoShadow = this.getShadow();
      const piePatternImg = await this.loadImageCompleted(mappng);
      return {
        tooltip: {
          show: false,
          trigger: "item",
        },
        geo: [
          // 顶部图形
          {
            z: 91,
            map: "mapDataHollow",
            aspectScale: this.aspectScale,
            itemStyle: {
              areaColor: {
                image: piePatternImg,
                repeat: "no-repeat",
              },
            },
          },
          // 模拟厚度
          ...geoShadow,
          // 第二层边缘发光
          {
            z: 90,
            map: "mapDataHollow",
            aspectScale: this.aspectScale,
            itemStyle: {
              areaColor: "rgba(176, 230, 249,1)",
              borderColor: "rgba(176, 230, 249,1)",
              shadowColor: "rgba(176, 230, 249, 0.9)",
              shadowBlur: 4,
              borderWidth: 3,
            },
          },
          // 底层阴影
          {
            z: 10,
            map: "mapDataHollow",
            aspectScale: this.aspectScale,
            itemStyle: {
              areaColor: "#000",
              shadowColor: "#000",
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 26,
            },
          },
        ],
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          id: "grid",
        },
        series: [
          // 顶层贴图
          {
            z: 99,
            type: "map",
            map: "mapData",
            aspectScale: this.aspectScale,
            // coordinateSystem: "geo", // 地图坐标系
            itemStyle: {
              borderWidth: 0.2,
              borderColor: "#fff",
              areaColor: {
                image: piePatternImg,
                repeat: "no-repeat",
              },
            },
            label: {
              show: false,
              color: "#fff",
              formatter: (p) => {
                [`{title| ${p.name} }`, "{imgVertebral|}", "{imgCircle|}"].join(
                  "\n"
                );
              },
              rich: {
                title: {
                  color: "#fff",
                  height: 28,
                  width: 100,
                  fontFamily: "SourceHanSansCN-Medium",
                  fontSize: 14,
                  backgroundColor: {
                    image: titleBg,
                  },
                },
                imgVertebral: {
                  height: 36,
                  width: 32,
                  backgroundColor: {
                    image: pointVertebral,
                  },
                },
              },
            },
            emphasis: {
              disabled: false,
            },
          },
        ],
      };
    },
  },
  watch: {
    dataSource() {
      this.$nextTick(() => {
        this.redrawChart();
      });
    },
    winData() {
      this.$nextTick(() => {
        this.redrawChart();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.chart-container,
.chart {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

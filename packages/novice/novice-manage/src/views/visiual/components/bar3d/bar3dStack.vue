<template>
  <div ref="bar3dRef" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Bar3d",
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 提取颜色配置
      const colors = {
        topGradient: {
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          type: "linear",
          global: false,
          colorStops: [
            { offset: 0, color: "rgba(14,123,165,1)" },
            { offset: 0.3, color: "rgba(14,123,165,0.3)" },
            { offset: 0.5, color: "rgba(14,123,165,0.2)" },
            { offset: 0.7, color: "rgba(14,123,165,0.3)" },
            { offset: 1, color: "rgba(14,123,165,1)" },
          ],
        },
        bottomGradient: {
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          type: "linear",
          global: false,
          colorStops: [
            { offset: 0, color: "rgba(146, 79, 58,1)" },
            { offset: 0.3, color: "rgba(146, 79, 58,0.3)" },
            { offset: 0.5, color: "rgba(146, 79, 58,0.2)" },
            { offset: 0.7, color: "rgba(146, 79, 58,0.3)" },
            { offset: 1, color: "rgba(146, 79, 58,1)" },
          ],
        },
        bottomSolid: "rgb(3,183,223)",
        topSolid: "rgb(255,127, 58)",
      };

      // 提取公共配置
      const baseBar = {
        stack: "zs",
        barMaxWidth: "auto",
        barWidth: 40,
      };
      const basePictorial = {
        type: "pictorialBar",
        barMaxWidth: "20",
        symbol: "circle",
        symbolSize: [30, 5],
        zlevel: 2,
      };
      const chart = echarts.init(this.$refs.bar3dRef);
      // 使用传入的 dataList 生成 xData 与各项数据
      const dataList = [
        { name: "2017", value1: 10, value2: 20, value3: 10, value4: 100 },
        { name: "2018", value1: 20, value2: 30, value3: 10, value4: 100 },
        { name: "2019", value1: 30, value2: 40, value3: 10, value4: 100 },
        { name: "2020", value1: 40, value2: 50, value3: 10, value4: 100 },
        { name: "2021", value1: 50, value2: 60, value3: 10, value4: 100 },
      ];
      // 提取所有 value 字段（动态）
      const valueKeys = Object.keys(dataList[0] || {}).filter((k) => k.startsWith("value"));
      const xData = dataList.map((item) => item.name);
      const data0 = dataList.map(() => 0);

      // 按 value 顺序提取数据
      const valueDatas = valueKeys.map((key) => dataList.map((item) => Number(item[key])));

      // 累积高度，用于帽子定位
      const accHeights = valueDatas.reduce((acc, cur) => {
        const last = acc[acc.length - 1] || dataList.map(() => 0);
        acc.push(cur.map((v, i) => v + last[i]));
        return acc;
      }, []);

      // 生成主柱子
      const bars = valueKeys.map((key, idx) => ({
        name: key.replace("value", "系列"),
        type: "bar",
        data: valueDatas[idx],
        ...baseBar,
        itemStyle: {
          borderColor: "transparent",
          borderWidth: 10,
          color: idx % 2 === 0 ? colors.topGradient : colors.bottomGradient,
        },
      }));

      // 生成帽子
      const caps = [];
      valueKeys.forEach((_, idx) => {
        const top = idx === valueKeys.length - 1;
        const color = idx % 2 !== 0 ? colors.topSolid : colors.bottomSolid;
        // 底部帽子
        caps.push({
          data: idx === 0 ? data0 : accHeights[idx - 1],
          ...basePictorial,
          symbolOffset: [0, "-150%"],
          symbolPosition: "end",
          itemStyle: { color },
        });
        // 顶部帽子
        caps.push({
          data: accHeights[idx],
          ...basePictorial,
          symbolPosition: "end",
          symbolOffset: [0, "50%"],
          itemStyle: { color },
        });
      });

      const series = [...bars, ...caps];

      const option = {
        backgroundColor: "#000E1A",
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(255,255,255,.3)",
          backgroundColor: "rgba(13,5,30,.6)",
          textStyle: { color: "white" },
          formatter(parms) {
            return "年份：" + parms[0].axisValue + "</br>" + parms[0].marker + "上衣：" + parms[0].value + "</br>" + parms[1].marker + "裤子：" + parms[1].value;
          },
        },
        textStyle: { color: "#C9C9C9" },
        legend: {
          type: "scroll",
          orient: "vertical",
          selectedMode: false,
          right: "10%",
          top: "15%",
          textStyle: { color: "#ffffff", fontSize: 14 },
        },
        grid: {
          containLabel: true,
          left: "10%",
          top: "20%",
          bottom: "10%",
          right: "10%",
        },
        xAxis: {
          type: "category",
          data: xData,
          axisLine: { show: false, lineStyle: { color: "#B5B5B5" } },
          axisTick: { show: false },
          axisLabel: {
            margin: 20,
            textStyle: { fontFamily: "Microsoft YaHei", color: "#FFF" },
            fontSize: 14,
            fontStyle: "bold",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: { show: false, lineStyle: { color: "#B5B5B5" } },
            splitLine: { show: true, lineStyle: { type: "dashed" } },
            axisLabel: {
              show: true,
              textStyle: { fontFamily: "Microsoft YaHei", color: "#FFF" },
              fontSize: 14,
            },
          },
        ],
        series,
      };
      chart.setOption(option);
    },
  },
};
</script>

<script>
import echartsBaseBarLine from "../components/echartsBaseBarLine/echartsBaseBarLine.vue";

export default {
  components: {
    echartsBaseBarLine,
  },
  data() {
    return {
      dataList: [
        { name: "2021-01", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-02", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-03", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-04", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-05", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-06", value1: Math.random() * 1000, value2: Math.random() * 1000 },  
        { name: "2021-07", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-08", value1: Math.random() * 1000, value2: Math.random() * 1000 },
      ],
      color: ["#FEBD00", "#15A8FE"],
      series: [
        {
          data: "value1",
          type: "bar",
          name: "岗位发布数",
          dw: "人",
          barWidth: 13,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#1CE3CE", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0044E2", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        {
          data: "value2",
          type: "pictorialBar",
          dw: "人",
          name: "求职数",
          symbol: "rect",
          symbolSize: [16, 3],
          symbolPosition: "end",
          color: "#C1D5E3",
          z: 10,
          itemStyle: {
            shadowColor: "rgba(255, 255, 255, 0.5)",
            shadowBlur: 5,
          },
        },
      ],
      otherOptions: {
        legend: {
          icon: "roundRect",
          right: 10,
          itemHeight: 4,
          itemWidth: 12,
          x: 370,
        },
        xAxis: {
          axisLabel: {
            formatter(data) {
              return data;
            },
          },
        },
      },
      grid: {
        left: 60,
        top: 30,
        bottom: 30,
        right: 30,
        containLabel: true,
      },
    };
  },
};
</script>

<template>
  <echartsBaseBarLine
    style="height: 100%; width: 100%; position: relative"
    :data="dataList"
    :series="series"
    :grid="grid"
    :customUnit="true"
    :color="color"
    :otherOptions="otherOptions"
  />
</template>

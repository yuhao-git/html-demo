<template>
  <div class="box">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  name: 'echartsLiquidFill',
  data() {
    return {
      chart: '',
    }
  },
  props: {
    // 数据
    data: {
      type: Number,
      default: 28.0,
    },
    //波浪数
    num: {
      type: Number,
      default: 2,
    },
    backgroundColor: {
      type: Object,
      default: () => {
        return {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.55,
          colorStops: [
            {
              offset: 0.5,
              color: 'rgb(11,27,52,0.5)', // 0% 处的颜色
            },
            {
              offset: 0.75,
              color: 'rgb(27,41,83,0.8)', // 100% 处的颜色
            },
            {
              offset: 0.95,
              color: 'rgb(53,63,135,1)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        }
      },
    },
    color: {
      type: Object,
      default: () => {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#2678C1',
          },
          {
            offset: 1,
            color: '#63CDF3',
          },
        ])
      },
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getPieOption() {
      let data = []
      for (let i = 0; i < this.num; i++) {
        data.push(this.data / 100)
      }
      let option = {
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: 'rgb(97, 142, 205)',
          },
        },
        series: [
          {
            type: 'liquidFill',
            radius: '100%',
            center: ['50%', '50%'],
            data: data,
            backgroundStyle: {
              color: this.backgroundColor,
            },
            color: [this.color],
            outline: {
              show: false,
            },
          },
        ],
      }
      if (this.showLabel) {
        option.series[0].label = {
          normal: {
            formatter: (param) => {
              return (param.value * 100).toFixed(1) + '%'
            },
            textStyle: {
              fontSize: 24,
              color: '#FFFFFF',
            },
          },
        }
      } else {
        option.series[0].label = {
          show: false,
        }
      }
      return option
    },
    drawChart() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chart)
      this.chart.clear()
      let option = this.getPieOption()
      this.chart.setOption(option)
    },
  },
  watch: {
    data: {
      handler: function () {
        this.$nextTick(() => {
          this.drawChart()
        })
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box,
.chart {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

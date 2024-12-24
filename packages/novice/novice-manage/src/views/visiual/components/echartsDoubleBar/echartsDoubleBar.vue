<template>
  <div class="container" ref="sexageChartBox">
    <div ref="sexageChart" style="width: 100%; height: 100%; position: absolute" />
    <div
      v-if="chart_data.length > 0"
      class="sexageChartBox-x-unit"
      :style="`right: ${this.axisUnitPosition.right}px; bottom: ${this.axisUnitPosition.bottom}px`"
    >
      {{ x_unit[0] }}（{{ x_number_unit + x_unit[1] }}）
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'echartsDoubleBar',
  props: {
    // 是否在legend上面展示总和
    isShowSum: {
      type: Boolean,
      default: false,
    },
    // 颜色
    colorStops: {
      type: Array,
      default: () => {
        return [
          [
            {
              offset: 0,
              color: '#2cd0ff',
            },
            {
              offset: 1,
              color: '#0084ff',
            },
          ],
          [
            {
              offset: 0,
              color: '#c4005c',
            },
            {
              offset: 1,
              color: '#ff4ef0',
            },
          ],
        ]
      },
    },
    // 是否显示x轴
    isShowX: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => {
        return [
          { name: '0-10岁', value1: 100, value2: 120 },
          { name: '11-20岁', value1: 150, value2: 130 },
          { name: '21-30岁', value1: 200, value2: 180 },
          { name: '31-40岁', value1: 170, value2: 160 },
          { name: '41-50岁', value1: 140, value2: 150 },
          { name: '51-60岁', value1: 130, value2: 140 },
          { name: '61-70岁', value1: 110, value2: 120 },
        ]
      },
    },
    grid: {
      type: Object,
      default: () => {
        return {
          x: 90,
          x2: 55,
          y: 82,
          y2: 68,
        }
      },
    },
    legendPosition: {
      type: Object,
      default: () => {
        return {
          top: 15,
          left: 'center',
        }
      },
    },
    legendValue: {
      type: Array,
      default: () => {
        return ['男', '女']
      },
    },
    barWidth: {
      type: Number,
      default: 5,
    },
    axisUnitPosition: {
      type: Object,
      default: () => {
        return {
          right: '33',
          bottom: '20',
        }
      },
    },
    hasLoad: {
      type: Boolean,
      default: true,
    },
    skeletonSize: {
      type: Object,
      default: () => {
        return {
          top: 4,
          width: 450,
          left: 0,
          height: 242,
        }
      },
    },
    x_unit: {
      type: Array,
      default: () => {
        return ['人数', '人']
      },
    },
    yAxisName: {
      type: String,
      default: '年龄段',
    },
    needToClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart_data: [],
      getUnitObj: bgUtils.getUnitObjWithNumber,
      // chart: null, 
      x_number_unit: '',
      legendData: [],
      loopObj: null,
      sumData: [],
    }
  },
  computed: {},
  watch: {
    data() {
      this.chart_data = this.data
      this.render()
    },
  },
  mounted() {
    this.render()
  },
  methods: {
    render() {
      if (this.data.length > 0) {
        this.chart_data = this.data
        const manSum = bgUtils.sumArrayObjectField(this.chart_data, 'value1')
        const womanSum = bgUtils.sumArrayObjectField(this.chart_data, 'value2')
        const sum = manSum + womanSum || 1
        this.sumData[0] = manSum
        this.sumData[1] = womanSum
        this.legendData[0] = ((manSum / sum) * 100).toFixed(2)
        this.legendData[1] = ((womanSum / sum) * 100).toFixed(2)
      }
      bgUtils.removeNoDataShow(this.$refs.sexageChartBox)
      this.$refs.sexageChart.style.opacity = '1'
      if (!this.chart_data.length && this.hasLoad) {
        bgUtils.noDataShow(this.$refs.sexageChartBox)
        this.$refs.sexageChart.style.opacity = '0'
      }
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.sexageChart)
      }
      const options = this.getOption()
      this.chart.setOption(options)
      this.chart.off('click')
      if (this.needToClick) {
        this.chart.on('click', (params) => {
          this.$emit('clickCallback', params)
        })
      }
      window.clearInterval(this.loopObj)
      this.loopObj = bgUtils.circleTooltips2(this.chart, this.$refs.sexageChart, 0, this.data.length)
    },

    getOption() {
      const dataList = this.chart_data
      let maxValue = 4
      for (let i = 0; i < dataList.length; i++) {
        const relateMaxValue =
          dataList[i].value1 * 1 > dataList[i].value2 * 1 ? dataList[i].value1 * 1 : dataList[i].value2 * 1
        if (relateMaxValue > maxValue) {
          maxValue = relateMaxValue
        }
      }
      const maxValueObj = bgUtils.getUnitObjWithNumber(maxValue)
      this.x_number_unit = maxValueObj.dw
      // this.addAxisUnit(maxValueObj)
      const axisMaxValue = bgUtils.formatInt(maxValue, (maxValue + '').length - 1, true)
      const option = {
        tooltip: {
          backgroundColor: 'rgba(2, 17, 37, 0.5)',
          borderColor: '#1b60b7',
          borderWidth: 1,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            align: 'left',
            color: '#fff',
            fontSize: '14',
          },
          formatter: (param) => {
            return `
                <div class="tooltip-row"><span>${this.yAxisName}：</span>${param[0].name}</div>
                <div class="tooltip-row"><span>${param[0].seriesName}：</span>${param[0].value * -1} 人</div>
                <div class="tooltip-row"><span>${param[1].seriesName}：</span>${param[1].value} 人</div>
            `
          },
        },
        grid: this.grid,
        color: ['#ff9d0a', '#008cff'],
        legend: {
          ...this.legendPosition,
          // left: '50%',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'rect',
          itemGap: 20,
          textStyle: {
            color: '#ffffff',
            fontSize: 14,
            fontFamily: 'PingFang-SC-Regular',
            padding: [0, 0, 0, -2], // 一个图例的padding
          },
          selectedMode: false,
          formatter: (param) => {
            const index = this.legendValue.indexOf(param)
            const tenThousandSum = this.sumData[index] / 10000
            const sum = Math.round(tenThousandSum * 100) / 100 + '万 ' // 保留两位小数
            return `${param}：${(this.isShowSum && sum) || ''}${this.legendData[index]}%`
          },
        },
        xAxis: [
          {
            type: 'value',
            max: axisMaxValue,
            min: axisMaxValue * -1,
            axisLine: {
              show: this.isShowX,
              lineStyle: {
                color: '#00b2ff',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: this.isShowX,
              fontFamily: 'PingFang-SC-Regular',
              fontSize: 14,
              color: '#8aa9b6',
              margin: 10,
              formatter: function (param) {
                return Math.abs((param * maxValueObj.chengshu).toFixed(0))
              },
            },
          },
        ],
        yAxis: [
          {
            // name: this.yAxisName,
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#8aa9b6',
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              showMinLabel: true,
              showMaxLabel: true,
              fontFamily: 'PingFang-SC-Medium',
              fontSize: 14,
              color: '#afd9ff',
              margin: 5,
            },
            data: bgUtils.getFieldData(dataList, 'name'),
          },
        ],
        series: [
          {
            name: this.legendValue[0],
            type: 'bar',
            stack: '总量',
            barWidth: this.barWidth + 10,
            barCategoryGap: 50,
            label: {
              show: false,
              position: 'inside',
            },
            data: bgUtils.getPieDataArray(dataList, 'name', 'value1', -1, '', '人'),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, // 右
                y: 0, // 下
                x2: 0, // 左
                y2: 1, // 上
                colorStops: this.colorStops[0],
                globalCoord: false,
              },
              // borderRadius: 6,
              borderWidth: 10,
              borderColor: 'transparent',
              borderJoin: 'round',
              borderType: 'solid',
            },
          },
          {
            name: this.legendValue[1],
            type: 'bar',
            stack: '总量',
            barWidth: this.barWidth + 10,
            label: {
              show: false,
            },
            itemStyle: {
              borderWidth: 10,
              borderColor: 'transparent',
              borderJoin: 'round',
              borderType: 'solid',
              color: {
                type: 'linear',
                x: 0, // 右
                y: 0, // 下
                x2: 0, // 左
                y2: 1, // 上
                colorStops: this.colorStops[1],
                globalCoord: false,
              }, // 1cfff4
            },
            data: bgUtils.getPieDataArray(dataList, 'name', 'value2', 1, '', '人'),
          },
        ],
      }
      return option
    },

    addAxisUnit(maxValueObj) {
      const text = '人数（' + maxValueObj.dw + '人）'
      // const lastDomtext = this.$refs.sexageChart.children[this.$refs.sexageChart.children.length - 1].innerHTML
      const dw = document.createElement('div')
      dw.class = 'part2_bottom_center_bar_dw'
      dw.style.position = 'absolute'
      dw.style.right = this.axisUnitPosition.right + 'px'
      dw.style.bottom = this.axisUnitPosition.bottom + 'px'
      dw.style.width = 'auto'
      dw.style.height = '12px'
      dw.style.lineHeight = '12px'
      dw.style.color = '#afd9ff'
      dw.style.fontSize = '15px'
      dw.innerText = text
      this.$refs.sexageChart.appendChild(dw)
    },
  },
  beforeDestroy() {
    window.clearInterval(this.loopObj)
    this.chart.dispose()
    this.chart = null
  },
}
</script>

<style scoped>
/*#sexageChart{*/
/*  position: absolute;*/
/*  top: 64px;*/
/*  width: 100%;*/
/*  height: calc(100% - 50px);*/
/*  opacity: 0;*/
/*}*/

.container{
  height: 100%;
  width: 100%;
  position: relative;
}
.sexageChartBox-x-unit {
  position: absolute;
  width: auto;
  height: 12px;
  line-height: 12px;
  color: #afd9ff;
  font-size: 12px;
}
</style>

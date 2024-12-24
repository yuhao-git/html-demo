<template>
  <div :style="{ width, height }" style="position: relative">
    <div :style="imageStyle" v-if="data.length > 0"></div>
    <div ref="echartsChart" :style="{ width, height }" style="position: absolute; left: 0; top: 0; z-index: 1"></div>
  </div>
</template>

<script type="module">
import * as echarts from 'echarts'
import bgUtils from '../../js/bgUtils.js'
export default {
  name: 'echartsBaseBarLineComponent',
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          { name: '规模特征', value: (Math.random() * 100).toFixed(2), value2: (Math.random() * 100).toFixed(2) },
          { name: '发展特征', value: (Math.random() * 100).toFixed(2), value2: (Math.random() * 100).toFixed(2) },
          { name: '用工稳定', value: (Math.random() * 100).toFixed(2), value2: (Math.random() * 100).toFixed(2) },
          { name: '人才层次', value: (Math.random() * 100).toFixed(2), value2: (Math.random() * 100).toFixed(2) },
          { name: '科研能力', value: (Math.random() * 100).toFixed(2), value2: (Math.random() * 100).toFixed(2) },
        ]
      },
    },
    customUnit: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    width: {
      type: String,
      default: () => {
        return '100%'
      },
    },
    isShowYaxis: {
      type: Boolean,
      default: () => {
        return true
      },
    },
    height: {
      type: String,
      default: () => {
        return '100%'
      },
    },
    grid: {
      type: Object,
      default: () => ({
        left: 60,
        top: 30,
        bottom: 50,
        right: 40,
        containLabel: false,
      }),
    },
    series: {
      type: Array,
      default: () => {
        return [
          {
            name: '测试',
            unit: '个',
          },
        ]
      },
    },
    color: {
      type: Array,
      default: () => {
        return [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#35ffc7',
              },
              {
                offset: 1,
                color: '#18c491',
              },
            ],
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#fc7700',
              },
              {
                offset: 0.45,
                color: '#feb106',
              },
              {
                offset: 1,
                color: '#ffeb0c',
              },
            ],
          },
          '#32C5E9',
          '#67E0C1',
          '#91F2DE',
          '#FFDB5C',
          '#FF9F7F',
        ]
      },
    },
    dimName: {
      type: String,
      default: () => {
        return ''
      },
    },
    otherOptions: {
      type: Object,
      default: () => {
        return {}
      },
    },
    yAxisMaxScale: {
      type: Number,
      default: () => {
        return 1
      },
    },
    intervalMap: {
      type: Object,
      default: () => {
        return {
          enabled: true,
          intervalTime: 5000,
        }
      },
    },
    echartsClickCallback: {
      type: Function,
      default: () => {
        return {}
      },
    },
    type: {
      type: String,
      default: () => {
        return ''
      },
    },
    dataZoom: {
      type: Object,
      default: () => {
        return {
          enabled: false,
          showLength: 6,
        }
      },
    },
    dimUnit: {
      type: String,
      default: () => {
        return '单位'
      },
    },
  },
  data() {
    return {
      // vue3 与 Echarts 管理的状态和数据与 Vue 的响应式产生冲突，导致Echarts 无法正常更新。
      // 可以使用 markRaw 将 Echarts 实例标记为原始对象
      // 
      // echartsInstance: null, 
      interval: null,
      showTooltipIndex: 0,
      imageStyle: {},
    }
  },
  watch: {
    data() {
      this.initOption()
    },
  },
  mounted() {
    this.getImageStyle()
    this.init()
  },
  methods: {
    // 初始化加载
    async init() {
      this.initOption()
    },
    /**
     * 初始化饼图
     */
    initOption() {
      let _this = this
      //
      if (_this.interval) {
        clearInterval(_this.interval)
      }
      //存在则销毁
      if (_this.echartsInstance) {
        _this.echartsInstance.dispose()
        _this.$refs.echartsChart.removeAttribute('_echarts_instance_')
      }
      //判断是否有数据
      bgUtils.removeNoDataShow(_this.$refs.echartsChart)
      if (_this.data.length === 0) {
        //console.log("无数据，不渲染");
        bgUtils.noDataShow(_this.$refs.echartsChart)
        return
      }
      let series = [...JSON.parse(JSON.stringify(_this.series))]
      series = series.map((item, index) => {
        //如果data字段不存在
        if (!item.data) {
          item.data = _this.data.map((item) => item.value)
        } else {
          if (typeof item.data === 'string') item.data = bgUtils.getFieldData(_this.data, item.data)
        }
        //如果type不存在 直接放柱状图
        if (!item.type) {
          item.type = 'bar'
        }
        if (item.type === 'bar') {
          let serie = _this.getBarBaseInfo(index)
          _this.deepMerge(serie, item)
          return serie
        } else if (item.type === 'line') {
          let serie = this.getLineBaseInfo(index)
          _this.deepMerge(serie, item)
          return serie
        } else {
          return item
        }
      })
      //取出series中最大数据 先过滤选出yAxisIndex<1或者不存在的数组
      let leftCoordinates = series.filter((item) => item.yAxisIndex < 1 || !item.yAxisIndex)
      //循环firstCoordinates里面data数字取出最大值
      let maxValue = Math.max(...leftCoordinates.map((item) => Math.max(...item.data)))
      //优雅设置最大值小于0.1则设置最大值为1
      if (maxValue < 1) {
        maxValue = 1
      }
      let maxObj = bgUtils.getUnitObjWithNumber(maxValue)
      let leftName =
        (this.dimUnit === '' ? '' : this.dimUnit + '：') +
        (maxObj.dw === '' ? leftCoordinates[0].dw : maxObj.dw + (this.dimUnit === '' ? leftCoordinates[0].dw : ''))
      if (this.customUnit) {
        leftName =
          (this.dimUnit === '' ? '' : this.dimUnit + '：') +
          (maxObj.dw === '' ? leftCoordinates[0].dw : maxObj.dw + leftCoordinates[0].dw)
      }
      let rightCoordinates = series.filter((item) => item.yAxisIndex > 0) || []
      // 创建实例
      _this.echartsInstance = echarts.init(_this.$refs.echartsChart)
      let options = {
        grid: {
          ..._this.grid,
          containLabel: false,
        },
        color: _this.color,
        animation: true,
        legend: {
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20,
          orient: 'horizontal',
          x: 'center',
          icon: 'roundRect',
          // right:30,
          formatter: function (name) {
            return '{name|' + name + '}'
          },
          textStyle: {
            rich: {
              name: {
                align: 'left',
                color: '#ffffff',
                fontSize: 12,
                fontFamily: 'SourceHanSansCN-Regular',
              },
            },
          },
        },
        tooltip: {
          confine: true,
          borderColor: '#1b60b7',
          borderWidth: 1,
          trigger: 'axis',
          backgroundColor: 'rgba(2, 17, 37, 0.5)',
          padding: [10, 12],
          textStyle: {
            color: '#fff',
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0, 113, 208, 0.15)',
            },
            lineStyle: {
              color: '#23FDFF',
              width: 2,
            },
          },
          formatter(params) {
            let name = params[0].name
            if (_this.dimName.indexOf('期号') > -1) {
              name = bgUtils.dateFormat(name)
            }
            let tooltipHtml = `<div>${_this.dimName + '：'}${name}</div>`
            if (!_this.dimName) {
              tooltipHtml = `<div>${name}</div>`
            }
            //lambda循环params
            params.forEach((item) => {
              //从series中取单位
              let currentItem = series.filter((serie) => serie.name === item.seriesName) || []
              if (currentItem.length > 0) {
                currentItem = currentItem[0]
              } else {
                currentItem = { dw: '' }
              }
              let valueObj = bgUtils.getUnitObjWithNumber(item.value)
              tooltipHtml += `<div>${item.seriesName}：${valueObj.value + valueObj.dw}${currentItem.dw}</div>`
            })
            return tooltipHtml
          },
        },
        series,
      }
      if (_this.type === 'horizontal') {
        options.yAxis = {
          triggerEvent: true,
          data: _this.data.map((item) => item.name),
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#00b2ff',
              width: 1,
            },
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'SourceHanSansCN-Regular',
            fontWeight: 'normal',
            fontStretch: 'normal',
            color: '#fff',
            lineHeight: 14,
            formatter: function (value) {
              if (value.length < 3) {
                return value
              } else if (value.length < 5) {
                return value.substring(0, 2) + '\n' + value.substring(2)
              } else {
                return value.substring(0, 2) + '\n' + value.substring(2, 4) + '\n...'
              }
            },
          },
        }
        options.xAxis = [
          {
            type: 'value',
            name: leftName,
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: '12',
              fontFamily: 'SourceHanSansCN-Regular',
            },
            // max:maxValue,
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: '12',
              fontFamily: 'SourceHanSansCN-Regular',
              formatter(data) {
                data = data * maxObj.chengshu
                if (maxObj.value < 1) {
                  data = data.toFixed(2)
                } else if (maxObj.value < 6) {
                  data = data.toFixed(1)
                } else {
                  data = data.toFixed(0)
                }
                return data
              },
            },
            axisTick: {
              show: false,
            },
            splitNumber: 4,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#00b2ff',
              },
            },
          },
        ]
      } else {
        options.xAxis = {
          triggerEvent: true,
          data: _this.data.map((item) => item.name),
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#00b2ff',
              width: 1,
            },
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'SourceHanSansCN-Regular',
            fontWeight: 'normal',
            fontStretch: 'normal',
            color: '#fff',
            lineHeight: 14,
            formatter: function (value) {
              if (value.length < 3) {
                return value
              } else if (value.length < 5) {
                return value.substring(0, 2) + '\n' + value.substring(2)
              } else {
                return value.substring(0, 2) + '\n' + value.substring(2, 4) + '\n...'
              }
            },
          },
        }
        options.yAxis = [
          {
            show: _this.isShowYaxis,
            type: 'value',
            name: leftName,
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: '12',
              fontFamily: 'SourceHanSansCN-Regular',
            },
            // max:maxValue,
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: '12',
              fontFamily: 'SourceHanSansCN-Regular',
              formatter(data) {
                data = data * maxObj.chengshu
                if (maxObj.value < 1) {
                  data = data.toFixed(2)
                } else if (maxObj.value < 6) {
                  data = data.toFixed(1)
                } else {
                  data = data.toFixed(0)
                }
                return data
              },
            },
            axisTick: {
              show: false,
            },
            splitNumber: 4,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#00b2ff',
              },
            },
          },
        ]
      }
      if (_this.yAxisMaxScale !== 1) {
        options.yAxis[0].max = maxValue * _this.yAxisMaxScale
      }
      //如果rightCoordinates长度>0
      if (rightCoordinates.length > 0) {
        //也需要设置
        let maxRightValue = Math.max(...rightCoordinates.map((item) => Math.max(...item.data)))
        let maxRightObj = bgUtils.getUnitObjWithNumber(maxRightValue)
        let rightName = '单位：' + (maxRightObj.dw === '' ? rightCoordinates[0].dw : maxRightObj.dw)
        options.yAxis.push({
          type: 'value',
          name: rightName,
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: '12',
            fontFamily: 'SourceHanSansCN-Regular',
          },
          // max:maxValue,
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: '12',
            fontFamily: 'SourceHanSansCN-Regular',
            formatter(data) {
              data = data * maxRightObj.chengshu
              if (maxRightObj.value < 1) {
                data = data.toFixed(2)
              } else if (maxRightObj.value < 6) {
                data = data.toFixed(1)
              } else {
                data = data.toFixed(0)
              }
              return data
            },
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#00b2ff',
            },
          },
        })
      }
      if (_this.dataZoom.enabled) {
        options.dataZoom = [
          {
            show: false, // 是否显示滑动条，不影响使用
            type: 'inside',
            startValue: 0, // 从头开始。
            endValue: _this.dataZoom.showLength,
          },
        ]
      }
      options = _this.deepMerge(options, _this.otherOptions)
      // console.log(options)
      _this.echartsInstance.setOption(options)
      if (_this.intervalMap.enabled) {
        _this.startInterval()
      }

      _this.echartsInstance.on('click', (params) => {
        let name = ''
        if (params.componentType === 'series') {
          name = params.name
        } else if (params.componentType === 'xAxis') {
          name = params.value
        }
        let dataMap = _this.data.find((item) => item.name === name)
        _this.echartsClickCallback({ ...dataMap })
      })
    },
    deepMerge(target, source) {
      let _this = this
      if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
        // 如果任一参数不是对象或null，则直接返回source
        return source
      }

      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (
            typeof source[key] === 'object' &&
            source[key] !== null &&
            target[key] &&
            typeof target[key] === 'object' &&
            target[key] !== null
          ) {
            // 如果属性值是对象，则递归合并
            _this.deepMerge(target[key], source[key])
          } else {
            // 否则，直接覆盖
            target[key] = source[key]
          }
        }
      }

      return target
    },
    getImageStyle() {
      let grid = this.grid
      //正则判断是否全是数字
      let isNum = /^[0-9]+(\.[0-9]+)?$/
      this.imageStyle = {
        left: isNum.test(grid.right) ? grid.left + 'px' : grid.left,
        top: isNum.test(grid.top) ? grid.top + 'px' : grid.top,
        right: isNum.test(grid.right) ? grid.right + 'px' : grid.right,
        bottom: isNum.test(grid.bottom) ? grid.bottom + 'px' : grid.bottom,
        zIndex: 0,
        position: 'absolute',
        background:
          'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNjIwQjk4RjNBQUMxMUVGQjZBM0M2MkY5MzRCQkU5MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNjIwQjk5MDNBQUMxMUVGQjZBM0M2MkY5MzRCQkU5MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM2MjBCOThEM0FBQzExRUZCNkEzQzYyRjkzNEJCRTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM2MjBCOThFM0FBQzExRUZCNkEzQzYyRjkzNEJCRTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t7Px3QAAACBJREFUeNpiZKj4L8VABGCB0s8IKWRiIBKMKsQLAAIMANboAo0s+EQjAAAAAElFTkSuQmCC) repeat',
      }
    },
    /**
     * 柱状图的基本配置
     */
    getBarBaseInfo() {
      return {
        barWidth: 13,
        itemStyle: {
          borderRadius: 2,
        },
        // 数据在柱子上方显示
        label: {
          show: false, //开启显示
        },
      }
    },
    getLineBaseInfo(index) {
      return {
        showSymbol: false,
        symbolSize: 6,
        symbol: 'circle',
        animationDuration: 1000,
        /* areaStyle: {
           normal: {
             color: this.color[index%this.color.length]
           },
         },*/
        emphasis: {
          itemStyle: {
            opacity: 1,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        },
        width: 3,
        /*lineStyle: {
          width: 3,
          color: this.color[index%this.color.length]
        },*/
        smooth: false,
      }
    },
    startInterval() {
      let _this = this
      if (_this.interval) {
        clearInterval(_this.interval)
      }
      if (_this.dataZoom.enabled) {
        _this.startIntervalDataZoom()
        return
      }
      if (_this.echartsInstance) {
        _this.interval = setInterval(() => {
          _this.echartsInstance.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: _this.showTooltipIndex,
          })
          _this.showTooltipIndex++
          if (_this.showTooltipIndex >= _this.data.length) {
            _this.showTooltipIndex = 0
          }
        }, _this.intervalMap.intervalTime)
      }
    },
    startIntervalDataZoom() {
      let _this = this
      if (_this.data.length < _this.dataZoom.showLength) {
        return
      }
      if (_this.echartsInstance) {
        _this.interval = setInterval(() => {
          _this.showTooltipIndex++
          if (_this.showTooltipIndex >= _this.data.length - _this.dataZoom.showLength) {
            _this.showTooltipIndex = 0
          }
          _this.echartsInstance.dispatchAction({
            type: 'dataZoom',
            startValue: _this.showTooltipIndex,
            // 结束位置的数值
            endValue: _this.showTooltipIndex + _this.dataZoom.showLength,
          })
        }, _this.intervalMap.intervalTime)
      }
    },
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    if (this.echartsInstance) {
      this.echartsInstance.dispose()
    }
  },
}
</script>

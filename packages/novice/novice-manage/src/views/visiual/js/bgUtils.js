import echartsTools from './dataUtil'

(function () {
  const m = {}
  m.extend = function (obj, prototypes) {
    for (const key in prototypes) {
      if (prototypes.hasOwnProperty(key)) obj[key] = prototypes[key]
    }
  }

  m.requestServer = function (url, param, successCallback, failCallback, mask, type) {
    param = param || {}
    type = type || 'post'
    const ajax = $.ajax({
      complete: function (XHR, TS) {
        XHR = null
      },
      type: type,
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      url: url,
      data: param,
      success: function (data) {
        if (typeof successCallback == 'function') {
          successCallback(data)
        }
      },
      error: function (xhr, type) {
        if (typeof failCallback == 'function') {
          failCallback(xhr, type)
        }
      },
    })
    return ajax
  }

  m.log = function (text) {
    console.log(text)
  }
  m.alert = function (text) {
    alert(text)
  }

  m.getPercentNum = function (num1, num2, defaultValue) {
    if (num2 === undefined || num2 == 0) return defaultValue
    return (Math.floor(num1 / num2 * 10000) * 0.01).toFixed(2) * 1
  }
  m.getTHB = function (num1, num2, defaultValue) {
    if (num2 === undefined || num2 == 0) return defaultValue
    return (Math.round((num1 / num2 - 1) * 10000) * 0.01).toFixed(2) * 1
  }

  /** **********添加常量*************/
  m.CONSTANT_UNIT = {
    company: '个', // 企业单位数
    people: '人', // 人数单位
    money: '元', // 金额单位
    callNum: '通', // 通话数单位
    age: '岁', // 年龄单位
    careerFairNum: '场', // 招聘会数量
    percentSign: '%',
    handlingBusiness: '笔', // 业务经办量单位
    numberTimes: '次', // 次数
    houseHold: '户', // 单位个数
    minute: '分钟', // 时间分钟
    platform: '台',
    item: '件',
    project: '项',
    policiesNum: '个', // 政策数
    peopleNum: '人次', // 人次
    year: '年',
    month: '月',
  }
  m.EO = {
    tooltipOption: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#7b7b7b80',
          width: 1,
        },
      },
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      axisTick: { // 刻度
        show: false,
      },
      axisLine: { // 轴线
        show: false,
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: '#afd9ff',
        margin: 10,
        lineHeight: 20,
      },
    },
    yAxis: {
      nameGap: 15, // 名称与轴线之间的距离
      nameTextStyle: {
        color: '#afd9ff',
        fontSize: 15,
        padding: [0, 0, 0, 35],
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: { // 坐标轴轴线
        show: false,
      },
      axisLabel: {
        show: true,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: '#afd9ff',
        margin: 5,
        lineStyle: {},
      },
    },
    legend: {
      top: 15,
      right: 100,
      orient: 'vertical',
      width: 120,
      height: 20,
      itemWidth: 30,
      itemHeight: 3,
      icon: 'rect',
      itemGap: 40,
      textStyle: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'PingFang-SC-Regular',
        padding: [0, 0, 0, -2],
      },
      selectedMode: false,
    },
    dataZoom: {
      type: 'slider',
      backgroundColor: 'rgba(0,0,0,0)',
      bottom: 0,
      width: 790,
      height: 25,
      brushSelect: false, // 鼠标刷选
      borderColor: '#0036a3',
      handleStyle: {
        color: '#065ab8',
        borderColor: '#065ab8',
      },
      start: 0,
      end: 30,
      dataBackground: {
        lineStyle: {
          color: '#447bed',
        },
        areaStyle: {
          color: '#1443a5',
        },
      },
      selectedDataBackground: {
        lineStyle: {
          color: '#447bed',
        },
        areaStyle: {
          color: '#1443a5',
        },
      },
      textStyle: {
        color: '#afd9ff',
      },
    },
  }
  /** **********添加常量结束*************/
  /**
     *  循环查找父窗口是否存在对应对象
     * @param objName  对象名称
     * @param type  对象类型
     * @returns {null|Window}
     */
  m.getParentByType_common = function (objName, type) {
    let win = window
    let isFirst = 1
    try {
      do {
        if (isFirst != 1) {
          win = win.parent
        } else {
          isFirst = 0
        }
        if (typeof win[objName] == type) {
          break
        }
      } while (win.parent != win.window)
    } catch (err) {
      return null
    }
    if (typeof win[objName] == type) {
      return win
    } else {
      return null
    }
  }
  /**
     * 鼠标悬浮位置
     * @param evt
     */
  m.onfnMousePosition = function (evt) {
    // 当前页面 是否存在变量
    // console.log('isZoomDid:'+isZoomDid+",isOpenWinPage:"+isOpenWinPage+", parent.isZoomDid:"+ parent.isZoomDid+",parent.isOpenWinPage："+parent.isOpenWinPage)
    if (typeof isZoomDid != 'undefined' && typeof isOpenWinPage != 'undefined') {
      if (!isZoomDid && !isOpenWinPage) {
        try {
          if (typeof fnMousePosition != 'undefined' && typeof (fnMousePosition) == 'function') {
            // console.log('鼠标悬浮当前页面')
            fnMousePosition(evt)
            fun_forAppToScheduing({
              funName: 'fnMousePosition',
              params: [{ pageX: evt.pageX, }],
              iframeIdPath: '',
              isAlert: 'No',
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    } else if (typeof parent.isZoomDid != 'undefined' && typeof parent.isOpenWinPage != 'undefined') {
      if (!parent.isZoomDid && !parent.isOpenWinPage) {
        try {
          if (typeof parent.fnMousePosition != 'undefined' && typeof (parent.fnMousePosition) == 'function') {
            // console.log('鼠标悬浮父页面')
            parent.fnMousePosition(evt)
            parent.fun_forAppToScheduing({
              funName: 'fnMousePosition',
              params: [{ pageX: evt.pageX, }],
              iframeIdPath: '',
              isAlert: 'No',
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  /**
     * 鼠标悬浮和点击触发
     */
  try {
    let winForApp = m.getParentByType_common('isForAppToJudge', 'number')
    winForApp = winForApp || {}
    if (winForApp.isForAppToJudge != 4) {
      document.onmousemove = m.onfnMousePosition
    } else {
      document.onclick = m.onfnMousePosition
    }
  } catch (err) {
    console.log(err)
    document.onmousemove = m.onfnMousePosition
  }
  /**
     * 获取指定属性名称的数据数组
     * chartData 图表数据
     * fieldName 属性名称
     */
  m.getFieldData = function (chartData, fieldName) {
    const dataArray = new Array()
    for (let i = 0; i < chartData.length; i++) {
      const obj = chartData[i]
      // 数据库查询出来有空值
      if (obj[fieldName] == null) {
        dataArray.push(0)
      } else {
        dataArray.push(obj[fieldName])
      }
    }
    return dataArray
  }
  /**
   * 获取指定属性名称的数据数组
   * chartData 图表数据
   * fieldName 属性名称
   */
  m.getNumberFieldData = function (chartData, fieldName) {
    const dataArray = new Array()
    for (let i = 0; i < chartData.length; i++) {
      const obj = chartData[i]
      // 数据库查询出来有空值
      if (obj[fieldName] == null) {
        dataArray.push(0)
      } else {
        dataArray.push(obj[fieldName] * 1)
      }
    }
    return dataArray
  }
  /**
     * 从指定的数据中获取的符合饼图的数据数组
     * nameFiled  饼图中展示数据名称的属性名
     * valueField 名称对应值的属性名
     */
  m.getPieDataArray = function (chartData, nameField, valueField, chengshu, unit, dw) {
    if (!arguments[3]) chengshu = 1
    const pieDataArray = new Array()
    for (let i = 0; i < chartData.length; i++) {
      const obj = chartData[i]
      if (obj[nameField] !== 'undefined' && obj[nameField] != null) {
        const dataObj = m.clone(obj)
        dataObj.value = obj[valueField] != null && obj[valueField] != 'undefined' ? (Number(obj[valueField]) * chengshu) : '0'
        if (chengshu !== 1) {
          dataObj.value = Number(dataObj.value).toFixed(2)
        } else {
          if ((dataObj.value + '').indexOf('.') > 0) {
            dataObj.value = Number(dataObj.value).toFixed(2)
          } else {
            dataObj.value = Number(dataObj.value).toFixed(0)
          }
        }
        dataObj.name = obj[nameField]
        dataObj.dw = dw || ''
        dataObj.unit = unit
        pieDataArray.push(dataObj)
      }
    }
    return pieDataArray
  }

  m.clone = function (Obj) {
    let buf
    if (Obj instanceof Array) {
      buf = [] // 创建一个空的数组
      let i = Obj.length
      while (i--) {
        buf[i] = bgUtils.clone(Obj[i])
      }
      return buf
    } else if (Obj instanceof Object) {
      buf = {} // 创建一个空对象
      for (const k in Obj) { // 为这个对象添加新的属性
        buf[k] = bgUtils.clone(Obj[k])
      }
      return buf
    } else {
      return Obj
    }
  }
  /**
     * 根据字段排序
     * @param dataArray
     * @param fieldName
     * @returns {number}
     */
  m.sumArrayObjectField = function (dataArray, fieldName) {
    let returnData = 0
    for (let i = 0; i < dataArray.length; i++) {
      returnData += Number(dataArray[i][fieldName])
    }
    return returnData
  }
  /**
     * 数组排序
     * chartData 数据数组
     * fieldName 排序依据属性名称
     * sortType  排序方式  asc 顺序 desc 倒序
     */
  m.sortArrayWithField = function (chartData, fieldName, sortType) {
    // 默认为倒序
    if (!arguments[2]) sortType = 'desc'
    for (let i = 0; i < chartData.length - 1; i++) {
      var obj1 = chartData[i]
      for (let j = i + 1; j < chartData.length; j++) {
        const obj2 = chartData[j]
        var obj1 = chartData[i]
        if (sortType == 'desc') {
          if (Number(obj1[fieldName]) < Number(obj2[fieldName])) {
            chartData[i] = obj2
            chartData[j] = obj1
          }
        } else {
          if (Number(obj1[fieldName]) > Number(obj2[fieldName])) {
            chartData[i] = obj2
            chartData[j] = obj1
          }
        }
      }
    }
  }
  m.sortArrayWithField_inludingChinese = function (chartData, fieldName, sortType) {
    // 默认为倒序
    if (!arguments[2]) sortType = 'desc'
    for (let i = 0; i < chartData.length - 1; i++) {
      var obj1 = chartData[i]
      for (let j = i + 1; j < chartData.length; j++) {
        const obj2 = chartData[j]
        var obj1 = chartData[i]
        if (Number(obj1[fieldName])) {
          if (sortType == 'desc') {
            if (Number(obj1[fieldName]) < Number(obj2[fieldName])) {
              chartData[i] = obj2
              chartData[j] = obj1
            }
          } else {
            if (Number(obj1[fieldName]) > Number(obj2[fieldName])) {
              chartData[i] = obj2
              chartData[j] = obj1
            }
          }
        } else {
          if (sortType == 'desc') {
            if (obj1[fieldName].length < obj2[fieldName].length) {
              chartData[i] = obj2
              chartData[j] = obj1
            }
          } else {
            if (obj1[fieldName].length > obj2[fieldName].length) {
              chartData[i] = obj2
              chartData[j] = obj1
            }
          }
        }
      }
    }
  }
  m.getChengshuForList = function (unit) {
    if (unit == '') {
      return 1
    } else if (unit == '万') {
      return 0.0001
    } else if (unit == '亿') {
      return 0.00000001
    } else {
      return 0.000000000001
    }
  }
  m.getDataMinValue = function (chartData, fieldName) {
    let minValue = 999999999999999
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i][fieldName + ''] * 1 < minValue) {
        minValue = chartData[i][fieldName + ''] * 1
      }
    }
    return minValue
  }
  m.getDataMaxAbsValue = function (chartData, fieldName) {
    let maxValue = 0
    for (let i = 0; i < chartData.length; i++) {
      if (Math.abs(chartData[i][fieldName + '']) > maxValue) {
        maxValue = Math.abs(chartData[i][fieldName + ''])
      }
    }
    return maxValue
  }
  /**
     * 百分比数据处理
     * @param dataList
     * @param nameFiled
     * @param valueField
     * @param sliceNum
     * @returns {Array}
     */
  m.handleArrayWithPercent = function (dataList, nameFiled, valueField, sliceNum) {
    if (!arguments[1]) {
      nameFiled = 'name'
    }
    if (!arguments[2]) {
      valueField = 'value'
    }
    if (!arguments[3]) {
      sliceNum = 5
    }

    const returnList = []
    let otherValue = 0// 其他项值
    let otherPercent = 0// 其他项百分比
    let otherIndex = 0// 其他项下标
    const realSumValue = m.sumArrayObjectField(dataList, valueField)// 总数据之和
    let sumValue = realSumValue// 总数据之和
    sumValue = sumValue == 0 ? 1 : sumValue
    let currValue = 0// 当前数据项值
    let currPercent = 0// 当前数据项百分比
    let maxIndex = 0// 最大项下标
    let maxValue = 0// 最大值
    sumValue = sumValue == 0 ? 1 : sumValue
    let isExistOther = false

    // 当数据集合小于或者等于截取长度；只做百分比处理
    if (dataList.length <= sliceNum) {
      // 取出最大值和最大值下标
      for (let i = 0; i < dataList.length; i++) {
        currValue = dataList[i][valueField] * 1
        if (currValue > maxValue) {
          maxValue = currValue
          maxIndex = i
        }
      }

      for (let i = 0; i < dataList.length; i++) {
        currValue = dataList[i][valueField] * 1
        currPercent = (currValue * 100 / sumValue).toFixed(2)
        if (i != maxIndex) {
          otherValue += currValue
          otherPercent += currPercent * 1
        }
        dataList[i].percent = currPercent
        returnList.push(dataList[i])
      }
      if (returnList[maxIndex].percent * 1 != 0) {
        returnList[maxIndex].percent = (100 - otherPercent).toFixed(2)
      }
    } else {
      // 循环前几项、看是否存在其他
      for (let i = 0; i < sliceNum; i++) {
        if (dataList[i][nameFiled] == '其他' || dataList[i][nameFiled] == '其它') {
          isExistOther = true
          break
        }
      }

      // 如果前面几项存在其他
      if (isExistOther) {
        for (let i = 0; i < sliceNum; i++) {
          currValue = dataList[i][valueField] * 1
          currPercent = (currValue * 100 / sumValue).toFixed(2)
          dataList[i].percent = currPercent
          if (dataList[i][nameFiled] != '其他' && dataList[i][nameFiled] != '其它') {
            otherValue += currValue * 1
            otherPercent += currPercent * 1
          } else {
            otherIndex = i
          }
          returnList.push(dataList[i])
        }
        returnList[otherIndex][valueField] = realSumValue * 1 - otherValue
        returnList[otherIndex].percent = (100 - otherPercent).toFixed(2)
      } else {
        for (let i = 0; i < sliceNum - 1; i++) {
          currValue = dataList[i][valueField] * 1
          currPercent = (currValue * 100 / sumValue).toFixed(2)
          dataList[i].percent = currPercent
          if (dataList[i][nameFiled] != '其他' && dataList[i][nameFiled] != '其它') {
            otherValue += currValue * 1
            otherPercent += currPercent * 1
          } else {
            otherIndex = i
          }
          returnList.push(dataList[i])
        }
        returnList.push(dataList[sliceNum - 1])
        returnList[sliceNum - 1][nameFiled + ''] = '其他'
        returnList[sliceNum - 1][valueField + ''] = realSumValue - otherValue
        returnList[sliceNum - 1].percent = (100 - otherPercent).toFixed(2)
      }
    }
    return returnList
  }

  /**
     * 数字自动进位
     * @param value
     */
  m.getUnitObjWithNumber = function (value) {
    let data
    const returnObj = {}
    let dw = ''
    let chengshu = 1
    if (isNaN(value)) {
      data = 0
      returnObj.value = value
      returnObj.dw = dw
      returnObj.chengshu = chengshu
      return returnObj
    } else {
      data = parseFloat(value)
    }
    if (Math.abs(data) < 10000) {
      if ((data + '').indexOf('.') >= 0) {
        returnObj.value = data.toFixed(2)
      } else {
        returnObj.value = data.toFixed(0)
      }
    } else if (Math.abs(data) >= 10000 && Math.abs(data) < 100000000) {
      data = data * 0.0001
      chengshu = 0.0001
      returnObj.value = data.toFixed(2)
      dw = '万'
    } else if (Math.abs(data) >= 100000000 && Math.abs(data) < 1000000000000) {
      data = data * 0.00000001
      chengshu = 0.00000001
      returnObj.value = data.toFixed(2)
      dw = '亿'
    } else {
      data = data * 0.000000000001
      chengshu = 0.000000000001
      dw = '万亿'
      returnObj.value = data.toFixed(2)
    }
    returnObj.dw = dw
    returnObj.chengshu = chengshu
    return returnObj
  }

  /**
     * 根据集合数据 字段取出最大值
     * @param chartData 集合
     * @param fieldName 字段
     * @returns {number}
     */
  m.getDataMaxValue = function (chartData, fieldName) {
    let maxValue = 0
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i][fieldName + ''] > maxValue) {
        maxValue = chartData[i][fieldName + ''] * 1
      }
    }
    return maxValue
  }
  /**
     * echartsTooltips的轮播
     * @param echarts_prarm echarts实例
     * @param id echarts的div容器id
     * @param index
     * @param col
     * @param time
     * @returns {number} 循环对象
     */
  m.circleTooltips = function (echarts_prarm, index, col, time, seriesIndex) {
    const time_ = time || 5000
    seriesIndex = seriesIndex || 0
    let intervalChart
    echarts_prarm.dispatchAction({
      type: 'showTip',
      seriesIndex: seriesIndex,
      dataIndex: 0,
    })
    echarts_prarm.dispatchAction({
      type: 'highlight',
      seriesIndex: seriesIndex,
      dataIndex: 0,
    })
    index = index || 0
    // eslint-disable-next-line prefer-const
    intervalChart = setInterval(function () {
      echarts_prarm.dispatchAction({
        type: 'downplay',
        seriesIndex: seriesIndex,
        dataIndex: index % col,
      })
      // console.log(index);
      ++index
      echarts_prarm.dispatchAction({
        type: 'showTip',
        seriesIndex: seriesIndex,
        dataIndex: index % col,
      })
      echarts_prarm.dispatchAction({
        type: 'highlight',
        seriesIndex: seriesIndex,
        dataIndex: index % col,
      })
    }, time_)
    // document.getElementById(id).onmouseout = () => {
    //   echarts_prarm.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: seriesIndex,
    //     dataIndex: index % col,
    //   })
    // }
    // 增加鼠标移除事件
    // $('#' + id).on('mouseout', function () {
    //   echarts_prarm.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: seriesIndex,
    //     dataIndex: index % col,
    //   })
    // })
    return intervalChart
  }
  /**
   * echartsTooltips的轮播
   * @param echarts_prarm echarts实例
   * @param dom echarts的div容器
   * @param index
   * @param col
   * @param time
   * @returns {number} 循环对象
   */
  m.circleTooltips2 = function (echarts_prarm, dom, index, col, time, seriesIndex) {
    const _time = time || 5000
    seriesIndex = seriesIndex || 0
    let intervalChart
    echarts_prarm.dispatchAction({
      type: 'showTip',
      seriesIndex: seriesIndex,
      dataIndex: 0,
    })
    echarts_prarm.dispatchAction({
      type: 'highlight',
      seriesIndex: seriesIndex,
      dataIndex: 0,
    })
    index = index || 0
    let isLoop = true
    intervalChart = setInterval(function () {
      if (isLoop) {
        echarts_prarm.dispatchAction({
          type: 'downplay',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
        ++index
        echarts_prarm.dispatchAction({
          type: 'showTip',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
        echarts_prarm.dispatchAction({
          type: 'highlight',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
      }
    }, _time)
    if (dom) {
      dom.onmouseout = function () {
        isLoop = true
        echarts_prarm.dispatchAction({
          type: 'showTip',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
        echarts_prarm.dispatchAction({
          type: 'highlight',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
      }
      dom.onmouseenter = function () {
        isLoop = false
        echarts_prarm.dispatchAction({
          type: 'downplay',
          seriesIndex: seriesIndex,
          dataIndex: index % col,
        })
      }
    }
    return intervalChart
  }

  /**
     * 将数字取整为10的倍数
     * @param {Number} num 需要取整的值
     * @param {Number} prec 需要用0占位的数量
     * @param {Boolean} ceil 是否向上取整
     */
  m.formatInt = function (num, prec, ceil) {
    const len = String(num).length
    if (len <= prec) {
      return num
    }
    const mult = Math.pow(10, prec)
    return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult
  }

  /**
     *
     * @param target DOM的id *
     * @param startVal 起始值 *
     * @param endVal 结束值 *
     * @param decimals 小数点精度 *
     * @param duration 滚动持续时间 *
     * @param optionParams 其余参数
     */
  m.countUp = function (target, startVal, endVal, decimals, duration, optionParams) {
    const options = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
    }
    if (!arguments[5]) optionParams = {}
    // extend default options with passed options object
    for (const key in optionParams) {
      if (optionParams.hasOwnProperty(key)) {
        options[key] = optionParams[key]
      }
    }
    // 数字滚动
    const count = new CountUp(target, startVal, endVal, decimals, duration, options)
    count.start()
  }

  /**
     * 日期格式处理
     * @param date
     * @returns {*}
     */
  m.dateFormat = function (date) {
    if ((date + '').length == 4 && (date + '').includes('年') == false ) {
      return date + '年'
    } else if ((date + '').length == 6 && (date + '').includes('年') == false ) {
      return (date + '').substring(0, 4) + '年' + ((date + '').substring(4)) * 1 + '月'
    } else if ((date + '').length == 8) {
      return (date + '').substring(0, 4) + '年' + ((date + '').substring(4, 6) * 1) + '月' + ((date + '').substring(6) * 1) + '日'
    } else {
      return date
    }
  }
  m.loadingData = function (dom) {
    const loadDom = document.createElement('div')
    loadDom.classList.add('data-loading')
    loadDom.style.position = 'absolute'
    loadDom.style.left = '0px'
    loadDom.style.top = '0px'
    loadDom.style.width = '100%'
    loadDom.style.height = '100%'
    loadDom.style.visibility = 'visible'
    loadDom.style.background = 'url(\'../layer/skin/default/loading-1.gif\') no-repeat center center'
    dom.appendChild(loadDom)
  }
  // 删除蒙层
  m.removeLoading = function (dom) {
    const loadDom = dom.getElementsByClassName('data-loading')
    if (loadDom.length > 0) {
      for (let i = 0; i < loadDom.length; i++) {
        loadDom[i].remove()
      }
    }
  }
  /**
     * 无数据处理
     */
  m.noDataShow = function (dom, textMessage, left, top) {
    left = left || '0'
    top = top || '0'
    const loadDom = document.createElement('div')
    loadDom.classList.add('dom-no-data-logo')
    loadDom.style.position = 'absolute'
    loadDom.style.top = top + 'px'
    loadDom.style.left = left + 'px'
    loadDom.style.width = '100%'
    loadDom.style.height = '100%'
    loadDom.style.display = 'flex'
    loadDom.style.justifyContent = 'center'
    loadDom.style.alignItems = 'center'
    loadDom.style.boxShadow = 'unset'

    const text = document.createElement('div')
    loadDom.appendChild(text)
    if (typeof textMessage == 'undefined') {
      textMessage = '暂无数据'
    }
    text.innerHTML = '<svg style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1567 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="506"><path d="M156.662278 699.758173h21.097186A10.444152 10.444152 0 0 1 187.994733 710.202325c0 5.765172-4.490985 10.444152-10.235269 10.444152H156.662278v21.097186A10.444152 10.444152 0 0 1 146.218126 751.978932a10.277045 10.277045 0 0 1-10.444152-10.235269V720.646477H114.676787A10.444152 10.444152 0 0 1 104.441518 710.202325c0-5.765172 4.490985-10.444152 10.235269-10.444152H135.773974v-21.097187A10.444152 10.444152 0 0 1 146.218126 668.425717c5.765172 0 10.444152 4.490985 10.444152 10.235269v21.097187z m1378.628042-83.553215v-21.097186A10.277045 10.277045 0 0 0 1524.846168 584.872503a10.444152 10.444152 0 0 0-10.444152 10.235269v21.097186h-21.097186a10.277045 10.277045 0 0 0-10.235269 10.444152c0 5.598065 4.595427 10.444152 10.235269 10.444152h21.097186v21.097187c0 5.744284 4.67898 10.235269 10.444152 10.235268a10.444152 10.444152 0 0 0 10.444152-10.235268V637.093262h21.097187c5.744284 0 10.235269-4.67898 10.235268-10.444152a10.444152 10.444152 0 0 0-10.235268-10.444152H1535.29032zM776.460024 960.861969H250.596979A20.80475 20.80475 0 0 1 229.77134 939.973665c0-11.530344 9.462402-20.888304 20.825639-20.888303h94.728457A83.010119 83.010119 0 0 1 334.212859 877.413196v-605.96969A83.49055 83.49055 0 0 1 417.849627 187.994733H480.430984V167.001988A83.49055 83.49055 0 0 1 564.067752 83.553215h501.152182A83.448773 83.448773 0 0 1 1148.856702 167.001988v605.969689c0 15.185797-4.052331 29.410732-11.133466 41.672166h115.554096c11.551232 0 20.909192 9.274407 20.909192 20.888304 0 11.530344-9.295295 20.888304-20.888304 20.888304H1002.638576v20.992745c0 15.185797-4.052331 29.410732-11.133466 41.672166h11.196131c11.488567 0 20.825639 9.274407 20.825639 20.888303 0 11.530344-9.462402 20.888304-20.825639 20.888304h-109.893365c9.545955 16.000441 7.478013 36.972297-6.41271 50.863019a41.672166 41.672166 0 0 1-59.072122 0L776.460024 960.861969z m76.367638-41.776607h66.424806c22.977134 0 41.609501-18.59059 41.609501-41.881049V270.461756c0-22.559368-18.047494-40.690416-40.314426-40.690416H416.303892c-22.266932 0-40.314426 18.214601-40.314426 40.690416v606.742557c0 23.123352 18.799473 41.881049 41.588613 41.881049h317.084449l-10.736588-10.757477a41.693054 41.693054 0 0 1-10.861918-40.377091l-19.718558-19.739447A146.259902 146.259902 0 0 1 502.363703 627.693525a146.218126 146.218126 0 0 1 220.517822 190.981761l19.739447 19.739447a41.630389 41.630389 0 0 1 40.377091 10.841029L852.827662 919.085362zM1002.638576 814.643843h62.852906A41.797496 41.797496 0 0 0 1107.080095 772.867236V167.106429c0-23.14424-18.632367-41.776607-41.588613-41.776607H563.775316A41.797496 41.797496 0 0 0 522.207592 167.106429v20.888304h396.794216A83.448773 83.448773 0 0 1 1002.638576 271.443506V814.643843zM266.325872 46.998683h31.123572c8.773088 0 15.875111 6.955805 15.875111 15.666228 0 8.647758-7.102023 15.666228-15.875111 15.666228h-31.123572v31.123572c0 8.773088-6.955805 15.875111-15.666228 15.875111a15.770669 15.770669 0 0 1-15.666228-15.875111V78.331139H203.869844A15.728893 15.728893 0 0 1 187.994733 62.664911c0-8.647758 7.102023-15.666228 15.875111-15.666228h31.123572V15.875111c0-8.773088 6.955805-15.875111 15.666228-15.875111 8.647758 0 15.666228 7.102023 15.666228 15.875111v31.123572zM20.888304 939.973665c0-11.530344 9.462402-20.888304 20.825638-20.888303h125.455152c11.488567 0 20.825639 9.274407 20.825639 20.888303 0 11.530344-9.462402 20.888304-20.825639 20.888304H41.713942A20.80475 20.80475 0 0 1 20.888304 939.973665z m658.733544-135.021995a104.441518 104.441518 0 1 0-147.722083-147.722083 104.441518 104.441518 0 0 0 147.722083 147.722083zM459.542681 313.324555a20.888304 20.888304 0 0 1 20.867415-20.888304H710.202325a20.888304 20.888304 0 1 1 0 41.776608H480.430984A20.825639 20.825639 0 0 1 459.542681 313.324555z m0 104.441518c0-11.530344 9.295295-20.888304 20.742085-20.888303h334.505295c11.44679 0 20.742086 9.274407 20.742086 20.888303 0 11.530344-9.295295 20.888304-20.742086 20.888304H480.284766A20.762974 20.762974 0 0 1 459.542681 417.766073z m0 104.441519c0-11.530344 9.316183-20.888304 20.846527-20.888304h146.301679c11.509455 0 20.846527 9.274407 20.846527 20.888304 0 11.530344-9.316183 20.888304-20.846527 20.888303h-146.301679A20.80475 20.80475 0 0 1 459.542681 522.207592zM62.664911 396.87777a62.664911 62.664911 0 1 1 0-125.329822 62.664911 62.664911 0 0 1 0 125.329822z m0-31.332456a31.332456 31.332456 0 1 0 0-62.664911 31.332456 31.332456 0 0 0 0 62.664911zM1357.739739 271.547948a62.664911 62.664911 0 1 1 0-125.329822 62.664911 62.664911 0 0 1 0 125.329822z m0-31.332456a31.332456 31.332456 0 1 0 0-62.664911 31.332456 31.332456 0 0 0 0 62.664911z" fill="#fff" p-id="507"></path></svg>' + textMessage
    text.style.fontFamily = 'PingFang-SC-Bold'
    text.style.fontSize = '18px'
    text.style.color = '#fff'
    text.style.width = 'auto'
    text.style.height = '24px'
    text.style.lineHeight = '24px'
    text.style.letterSpacing = '5px'
    text.style.fontWeight = 'normal'
    text.style.fontStretch = 'normal'
    text.style.boxShadow = 'unset'
    dom.appendChild(loadDom)
  }
  // 删除无数据
  m.removeNoDataShow = function (dom) {
    const loadDom = dom.getElementsByClassName('dom-no-data-logo')
    if (loadDom.length > 0) {
      for (let i = 0; i < loadDom.length; i++) {
        loadDom[i].remove()
      }
    }
  }
  /* 数据查询失败处理 */
  m.dataQueryFail = function (dom) {
    const failDom = document.createElement('div')
    failDom.classList.add('data-query-fail')
    failDom.style.width = '100%'
    failDom.style.height = '100%'
    failDom.style.visibility = 'visible'
    failDom.innerHTML = '<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center"><div style="height: 48px;width: auto;text-indent: 36px;font-family: PingFang-SC-Medium;font-size: 16px;line-height: 48px;color: #fff; background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAjVBMVEUAAADYHQfVIgDYHgbYHgbXHQbVHwXYHgbZHgbZHgfYHgXYHgbYHgbZHgbZHgfZHgbXHgbaHgfYHQXbHgbWFgDYHgbZHgbZHgffHwrZHgbYHQbYHwXZHgbYHgbYHgbYHgXYHQXZHgTZHgXYHQbYHgbYHgXYHQbVHAXXHQXZHgfYHQXYHgbaHwfZHwXYHgZ12cHPAAAALnRSTlMAbw/y21Aw14ZCvKSheUjUgEs0KQvkzpkYn3VjWt+pkmE76+HIvYs3YCG/shRk316mlQAAAgtJREFUSMelVtnaqjAMbNk3UVBEFMV9OUvf//EOCZQGRXr4/rmxSQfLZNoG9omTFwWuabpB5J2YFvH9Iggu93iMveJr8YE1X32hb2aWGIQ12wzxE0nfF9x2DMOxebGXjySf/J1AzLlDsw6fN/ndO3+LaXNhvE8YCxOntv30EZOHJRvA8oCTR5rzGz77ghynfZVIMZGzr+BISLt6uhAuRv0EhiurO4PIg5FmjVnrLxgQMg0isGPVPWwumQZLqC7H4ZoKSI9/KO2165QuYF/hlgB/pV839aaAsA5v0kHwPGmLzKl80a3hYGgr3Vj6rP59tLkrMsr+/qra6FGPs8bkTDIqZCR9Q7kMM7Tbw5pSxh5GStLZoIo8rC9Xxauu3ospPPO/q555EQukLD3smhow2EeOhkmK5jIw0GD/BQO2xOQHJr/SZNGqrBR+ud2W/tCZiNC4ov9H4VkgzkV/6QKNO/W9ZWUgCIKSTMG1dmLsQlX7V/GGa0w1X+rfOxUxb97lVpU2r35jYFEJd7gQ6AECzq9n1ylCCOkBit+PaGyFPaHxATjqiE6+BNQ1c2AahHjNkJOcj/M9cpGxjUVO4jBSrFfXiBIBGGl/LyQktP2MrvGkTYg2oGi4oRSDLUjXso4fO1o2xQfNPmRT9AcK4YoGWSjbbpi1KTed2th/+OlAkeQZZWd5wrTw1efPgNR/XGVxHYMwkNkAAAAASUVORK5CYII=\') no-repeat left center;background-size: 24px 24px;">数据查询失败，请稍后重试</div></div>'
    dom.appendChild(failDom)
  }

  /**
   * 格式化x轴坐标标签
   * @param params 标签内容
   * @param num1 每行字数
   * @param num2 最多几个字
   * @returns {string}
   */
  m.xLabelFormat = function (params, wordNumOfLine, maxWord) {
    let newParamsName = "";// 最终拼接成的字符串
    let paramsNameNumber = params.length;// 实际标签的个数
    let provideNumber = wordNumOfLine;// 每行能显示的字的个数
    let rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
    /**
     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
     */
    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
      /** 循环每一行,p表示行 */
      for (let p = 0; p < rowNumber; p++) {
        let tempStr = "";// 表示每一次截取的字符串
        let start = p * provideNumber;// 开始截取的位置
        let end = start + provideNumber;// 结束截取的位置
        // 此处特殊处理最后一行的索引值
        if (p == rowNumber - 1) {
          // 最后一次不换行
          tempStr = params.substring(start, paramsNameNumber);
        } else {
          // 每一次拼接字符串并换行
          tempStr = params.substring(start, end) + "\n";
        }
        newParamsName += tempStr;// 最终拼成的字符串
      }
    } else {
      // 将旧标签的值赋给新标签
      newParamsName = params;
    }
    if (newParamsName.length > maxWord) {
      return newParamsName.substring(0, maxWord) + "...";
    }
    //将最终的字符串返回
    return newParamsName;
  }

  /**
   * 分离数字
   * @param number
   * @returns {Array} 返回将数字分离后的数组，p代表小数点
   */
  m.separateNumber = function (number) {
    const pointIndex = String(number).indexOf(".") + 1;
    let flag = 0;
    let figures = 0;
    if (pointIndex !== 0) {
      figures = 1;
      const count = String(number).length - pointIndex;
      if (count === 1) {
        number = number * 10;
        flag = 1;
      } else {
        number = Math.round(number * 100);
        flag = 2;
      }
    }
    const numberArray = [];
    let t = 10;
    let remainder;
    remainder = number % t;
    while (number > 0) {
      numberArray.push(remainder);
      number = parseInt(number / t);
      remainder = number % t;
      figures++;
    }
    if (flag === 1) {
      numberArray.splice(1, 0, ".");
    } else if (flag === 2) {
      numberArray.splice(2, 0, ".");
    }
    // return {
    //     totalCallArray:totalCallArray,
    //     figures:figures
    // };
    return numberArray;
  }

  /**
   * 获取随机分布不重叠的节点位置
   * @param containerWidth 容器宽
   * @param containerHeight 容器高
   * @param distance 节点距离
   * @param nodeTotal 节点数量
   * @returns {[]}
   */
  m.getGraphNodePosition = function (containerWidth,containerHeight,nodeRadius,nodeTotal,_distance,labelHeight) {
    if (labelHeight) {
      containerHeight = containerHeight - labelHeight
    }
    const distance = _distance || nodeRadius * 2.1
    containerWidth = containerWidth - nodeRadius * 2
    containerHeight = containerHeight - nodeRadius * 2
    const _nodePosition = []
    let x = 0
    let y = 0
    let i = 0
    let t1 = 0
    _nodePosition.push({ x: nodeRadius + (Math.random() * containerWidth).toFixed(0) * 1, y: nodeRadius + (Math.random() * containerHeight).toFixed(0) * 1, })
    while (_nodePosition.length < nodeTotal && t1 < 10000000) {
      t1++
      x = nodeRadius + (Math.random() * containerWidth).toFixed(0) * 1
      y = nodeRadius + (Math.random() * containerHeight).toFixed(0) * 1
      for (i = 0; i < _nodePosition.length; i++) {
        const curDistance = Math.sqrt(Math.abs(_nodePosition[i].x - x) ** 2 + Math.abs(_nodePosition[i].y - y) ** 2)
        if (curDistance < distance) {
          break
        }
      }
      if (i === _nodePosition.length) {
        _nodePosition.push({ x, y, })
      }
    }
    // bgUtils.sortArrayWithField(_nodePosition,"x","asc")
    return _nodePosition
  }

  m.arrRemove = function (arr, removeItem) {
    if (arr.includes(removeItem)) {
      arr.forEach((item, i) => {
        if (removeItem === item) {
          if (i === 0) {
            arr.shift()
            return
          }
          if (i === arr.length - 1) {
            arr.pop()
            return
          }
          arr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
        }
      })
    }
    return arr
  }

  m.getRandom = function (p1, p2) {
    p2 = p2 || 0
    return (Math.random() * p1).toFixed(p2)
  }

  m.isEmptyObject = function isEmptyObject (obj) {
    return Object.keys(obj).length === 0
  }
  /**
   * 数字小数
   * @param numStr
   * @returns {number|number}
   */
  m.getDecimalPlacesRegex = function(numStr) {
    numStr = numStr.toString();
    let matches = numStr.match(/(\.\d+)/);
    return matches ? matches[1].length-1 : 0;
  }

  /**
   * 数字按照三位分割
   */
  m.separateNumberByThree = function (num) {
    if (num === null || num === undefined) {
      return '';
    }
    if (typeof num !== 'number' && typeof num !== 'string') {
      throw new Error('输入必须是数字或字符串');
    }
    const numStr = num.toString();
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  if (typeof bgUtils == 'undefined') {
    window.bgUtils = m
  } else {
    m.extend(bgUtils, m)
  }
})()
export default bgUtils

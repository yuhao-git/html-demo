const echartsTools = {}
/**
 * 获取指定属性名称的数据数组
 * chartData 图表数据
 * fieldName 属性名称
 */
echartsTools.getFieldData = function (chartData, fieldName) {
  const dataArray = []
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
echartsTools.getFieldDataForNumber = function (chartData, fieldName) {
  const dataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    // 数据库查询出来有空值
    if (obj[fieldName] == null) {
      dataArray.push(0)
    } else {
      dataArray.push(Number(obj[fieldName]))
    }
  }

  return dataArray
}
/**
 * 获取指定属性名称的数据数组
 * chartData 图表数据
 * fieldName 属性名称
 */
echartsTools.getFieldDataArrayDivideBy10000 = function (chartData, fieldName) {
  const dataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    // 数据库查询出来有空值
    if (obj[fieldName] == null) {
      dataArray.push(0)
    } else {
      const floatlet = obj[fieldName]
      const f_x = parseFloat(floatlet)
      if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error')
        return false
      }
      const fx = Math.round(floatlet / 100) / 100
      dataArray.push(fx)
    }
  }
  return dataArray
}
echartsTools.getFieldDataDivideBy10000 = function (data) {
  const floatlet = data
  const f_x = parseFloat(floatlet)
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error')
    return false
  }
  const fx = Math.round(floatlet / 100) / 100
  return fx
}
echartsTools.getFieldDataWithChengshu = function (chartData, fieldName, chengshu) {
  const dataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    // 数据库查询出来有空值
    if (obj[fieldName] == null) {
      dataArray.push(0)
    } else {
      const floatlet = obj[fieldName]
      const f_x = parseFloat(floatlet)
      if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error')
        return false
      }
      const fx = (f_x * chengshu).toFixed(2)
      dataArray.push(fx)
    }
  }
  return dataArray
}
/**
 * 获取指定属性名称的数据数组  一般用于获取期别或者区划等维度信息
 * chartData 图表数据
 * fieldName 属性名称
 */
echartsTools.getFieldDataNoRepeat = function (chartData, fieldName) {
  const dataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    const value = obj[fieldName]
    let flag = false // 是否存在重复,false不存在
    for (let j = 0; j < dataArray.length; j++) {
      if (dataArray[j] == value) {
        flag = true
        break
      }
    }
    // 数据库查询出来有空值
    if (flag == false) {
      dataArray.push(obj[fieldName])
    }
  }
  // 移除dataArray中的空值
  for (let i = 0, k = dataArray.length; i < k; i++) {
    if (dataArray[i] == null || dataArray[i] == '' || dataArray[i] == undefined || dataArray[i].trim() == '') {
      dataArray.splice(i, 1)
    }
  }
  return dataArray
}
echartsTools.getFieldDataWithCondition = function (chartData, fieldName, conditionName, conditionValue) {
  const dataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[conditionName] == conditionValue) {
      const value = obj[fieldName] == null || obj[fieldName] == '' ? 0 : obj[fieldName]
      dataArray.push(value)
    }
  }
  return dataArray
}
/**
 * 从指定的数据中获取的符合饼图的数据数组
 * nameFiled  饼图中展示数据名称的属性名
 * valueField 名称对应值的属性名
 */
echartsTools.getPieDataArray = function (chartData, nameField, valueField, chengshu, unit, dw) {
  if (!arguments[3]) chengshu = 1
  const pieDataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[nameField] != 'undefined' && obj[nameField] != null) {
      const dataObj = clone(obj)
      dataObj.value = obj[valueField] != null && obj[valueField] != 'undefined' ? (Number(obj[valueField]) * chengshu) : '0'
      if (chengshu != 1) {
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
/**
 * 从指定的数据中获取的符合饼图的数据数组
 * nameFiled  饼图中展示数据名称的属性名
 * valueField 名称对应值的属性名
 */
echartsTools.getMinusPieDataArray = function (chartData, nameField, valueField, chengshu) {
  if (!arguments[3]) chengshu = 1
  const pieDataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[nameField] != 'undefined' && obj[nameField] != null) {
      const dataObj = clone(obj)
      dataObj.value = obj[valueField] != null && obj[valueField] != 'undefined' ? (Number(obj[valueField]) * chengshu) : '0'
      if (chengshu != 1) {
        dataObj.value = Number(dataObj.value).toFixed(2)
      }
      dataObj.value = dataObj.value * (-1)
      dataObj.name = obj[nameField]
      pieDataArray.push(dataObj)
    }
  }
  return pieDataArray
}
/**
 * 从指定的数据中获取的符合饼图的数据数组(不包括数值为0)
 * nameFiled  饼图中展示数据名称的属性名
 * valueField 名称对应值的属性名
 */
echartsTools.getPieDataArray2 = function (chartData, nameField, valueField) {
  const pieDataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[nameField] != 'undefined' && obj[nameField] != null &&
      obj[valueField] != null && obj[valueField] != 'undefined' &&
      obj[valueField] != 0 && obj[valueField] != 0.00) {
      const dataObj = clone(obj)
      dataObj.value = obj[valueField]
      dataObj.name = obj[nameField]
      pieDataArray.push(dataObj)
    }
  }
  return pieDataArray
}
/**
 * 从指定的数据中获取的符合饼图的数据数组(不包括数值为0)
 * nameFiled  饼图中展示数据名称的属性名
 * valueField 名称对应值的属性名
 */
echartsTools.getPieDataArrayWithCondition = function (chartData, nameField, valueField, conditionName, conditionValue, chengshu) {
  if (!arguments[5]) chengshu = 1
  const pieDataArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[conditionName] == conditionValue) {
      const dataObj = {}
      dataObj.value = obj[valueField] ? obj[valueField] : 0
      dataObj.value = Number(dataObj.value) * chengshu
      if (chengshu != 1) {
        dataObj.value = Number(dataObj.value).toFixed(2)
      }
      dataObj.name = obj[nameField]
      dataObj.data = obj
      pieDataArray.push(dataObj)
    }
  }
  return pieDataArray
}

function clone (Obj) {
  let buf
  if (Obj instanceof Array) {
    buf = [] // 创建一个空的数组
    let i = Obj.length
    while (i--) {
      buf[i] = clone(Obj[i])
    }
    return buf
  } else if (Obj instanceof Object) {
    buf = {} // 创建一个空对象
    for (const k in Obj) { // 为这个对象添加新的属性
      buf[k] = clone(Obj[k])
    }
    return buf
  } else {
    return Obj
  }
}

/**
 * 获取一个数字字符串的最大整数+1000
 */
echartsTools.getDataMaxValue = function (chartData, fieldName) {
  let maxValue = 0
  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i][fieldName + ''] > maxValue) {
      maxValue = chartData[i][fieldName + ''] * 1
    }
  }
  return maxValue
}

echartsTools.getDataMaxAbsValue = function (chartData, fieldName) {
  let maxValue = 0
  for (let i = 0; i < chartData.length; i++) {
    if (Math.abs(chartData[i][fieldName + '']) > maxValue) {
      maxValue = Math.abs(chartData[i][fieldName + ''])
    }
  }
  return maxValue
}

/**
 * 获取一个数字字符串的最小整数+1000
 */
echartsTools.getDataMinValue = function (chartData, fieldName) {
  let minValue = 999999999999999
  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i][fieldName + ''] * 1 < minValue) {
      minValue = chartData[i][fieldName + ''] * 1
    }
  }
  return minValue
}
/**
 * 获取最大值
 */
echartsTools.getMaxValue = function (str) {
  return Math.ceil(str) + 1000
}

/**
 * 获取雷达图数据
 */
echartsTools.getIndicatorArray = function (chartData, fieldName) {
  const indicatorArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[fieldName] != undefined && obj[fieldName] != null) {
      const dataObj = {}
      dataObj.text = obj[fieldName]
      indicatorArray.push(dataObj)
    }
  }
  return indicatorArray
}
/**
 * 获取雷达图数据
 */
echartsTools.getIndicatorArrayWithChengshu = function (chartData, fieldName, chengshu) {
  const indicatorArray = []
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    if (obj[fieldName] != undefined && obj[fieldName] != null) {
      const data = obj[fieldName] * chengshu
      indicatorArray.push(data)
    }
  }
  return indicatorArray
}
/**
 * 数组排序
 * chartData 数据数组
 * fieldName 排序依据属性名称
 * sortType  排序方式  asc 顺序 desc 倒序
 */
echartsTools.sortArrayWithField = function (chartData, fieldName, sortType) {
  // 默认为倒序
  if (!arguments[2]) sortType = 'desc'
  for (let i = 0; i < chartData.length - 1; i++) {
    const obj1 = chartData[i]
    for (let j = i + 1; j < chartData.length; j++) {
      const obj2 = chartData[j]
      const obj1 = chartData[i]
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
/**
 * 数组数据全部变为最大值
 * chartData 数据数组
 * fieldName 属性名称
 *
 */
echartsTools.maxArrayWithField = function (chartData, fieldName) {
  let max = Number(chartData[0][fieldName])
  const list = []
  for (let i = 1; i < chartData.length; i++) {
    const num = Number(chartData[i][fieldName])
    if (max < num) {
      max = num
    }
  }

  if (max < 10000) {
    max = this.max
  } else if (max >= 10000 && max < 100000000) {
    max = (max * 0.0001).toFixed(2)
  } else {
    max = (max * 0.00000001).toFixed(2)
  }
  let chengshu = 1
  while (max > 100) {
    max = max / 10
    chengshu *= 10
  }
  if (max <= 5) {
    max = Math.ceil(max) * chengshu
  } else if (max <= 30) {
    max = Math.ceil(max / 5) * 5 * chengshu
  } else if (max <= 60) {
    max = Math.ceil(max / 10) * 10 * chengshu
  } else {
    max = Math.ceil(max / 20) * 20 * chengshu
  }
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    const obj2 = new Map()
    obj2.value = max
    obj2.name = obj.rowname
    list.push(obj2)
  }
  return list
}

echartsTools.handleArrayWithPercent = function (dataList, nameFiled, valueField, sliceNum) {
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
  let ohterIndex = 0// 其他项下标
  const realSumValue = echartsTools.sumArrayObjectField(dataList, valueField)// 总数据之和
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
    returnList[maxIndex].percent = (100 - otherPercent).toFixed(2)
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
          ohterIndex = i
        }
        returnList.push(dataList[i])
      }
      returnList[ohterIndex][valueField] = realSumValue * 1 - otherValue
      returnList[ohterIndex].percent = (100 - otherPercent).toFixed(2)
    } else {
      for (let i = 0; i < sliceNum - 1; i++) {
        currValue = dataList[i][valueField] * 1
        currPercent = (currValue * 100 / sumValue).toFixed(2)
        dataList[i].percent = currPercent
        if (dataList[i][nameFiled] != '其他' && dataList[i][nameFiled] != '其它') {
          otherValue += currValue * 1
          otherPercent += currPercent * 1
        } else {
          ohterIndex = i
        }
        returnList.push(dataList[i])
      }
      returnList[sliceNum - 1][valueField] = realSumValue - otherValue
      returnList[sliceNum - 1].percent = (100 - otherPercent).toFixed(2)
    }
  }
  return returnList
}

echartsTools.sumArrayObjectField = function (dataArray, fieldName) {
  let returnData = 0
  for (let i = 0; i < dataArray.length; i++) {
    returnData += Number(dataArray[i][fieldName])
  }
  return returnData
}

/**
 * 将数组中存在的行政区划名添加对应的行政区划简称
 * @param dataArray  数据
 * @param aab301FieldName   行政区划对应的属性名称
 * @param shortFieldName    添加的简称的列属性
 */
echartsTools.addAAB301ShortName = function (dataArray, aab301FieldName, shortFieldName) {
  const shortNameList = parent.shortNameList
  for (let j = 0; j < dataArray.length; j++) {
    for (let i = 0; i < shortNameList.length; i++) {
      if (shortNameList[i].vab567 == dataArray[j][aab301FieldName]) {
        dataArray[j][shortFieldName] = shortNameList[i].vab567
        break
      }
    }
  }
}
/**
 * 自动计算单位
 */
echartsTools.getUnitForList = function (chartdata, fieldName) {
  const dataArr = []
  for (let i = 0; i < chartdata.length; i++) {
    if (chartdata[i][fieldName] < 0) {
      dataArr[i] = (chartdata[i][fieldName]) * (-1)
    } else {
      dataArr[i] = chartdata[i][fieldName]
    }
  }
  const max = Math.max.apply(null, dataArr)
  if (max < 10000) {
    return ''
  } else if (max >= 10000 && max < 100000000) {
    return '万'
  } else if (max >= 100000000 && max < 1000000000000) {
    return '亿'
  } else {
    return '万亿'
  }
}
echartsTools.getStringWithUnit = function (data) {
  let returnNum = ''
  if (data < 10000) {
    returnNum = data
  } else if (data >= 10000 && data < 100000000) {
    data = data * 0.0001
    data = data.toFixed(2)
    returnNum = data + '万'
  } else {
    data = data * 0.00000001
    data = data.toFixed(2)
    returnNum = data + '亿'
  }
  return returnNum
}
/**
 * 返回带单位 和数字的map
 */
echartsTools.getMapWithUnit = function (data) {
  const obj = {}
  let dw = ''
  if (data < 10000) {
    const returnNum = data
  } else if (data >= 10000 && data < 100000000) {
    data = data * 0.0001
    data = data.toFixed(2)
    dw = '万'
  } else {
    data = data * 0.00000001
    data = data.toFixed(2)
    dw = '亿'
  }
  obj.value = data
  obj.dw = dw
  return obj
}
echartsTools.getDataWithUnit = function (valueArray) {
  const returnArray = []
  for (let i = 0; i < valueArray.length; i++) {
    const obj = {}
    let dw = ''
    let data
    if (isNaN(valueArray[i])) {
      data = valueArray[i]
    } else {
      data = parseFloat(valueArray[i])
    }
    if (data < 10000) {
      valueArray[i] = data
    } else if (data >= 10000 && data < 100000000) {
      data = data * 0.0001
      valueArray[i] = data.toFixed(2)
      dw = '万'
    } else {
      data = data * 0.00000001
      valueArray[i] = data.toFixed(2)
      dw = '亿'
    }
    obj.value = data.toFixed(2)
    obj.dw = dw
    returnArray.push(obj)
  }
  return returnArray
}
echartsTools.getDataWithUnitReturn = function (valueArray) {
  const returnArray = []
  for (let i = 0; i < valueArray.length; i++) {
    const obj = {}
    let dw = ''
    let data
    if (isNaN(valueArray[i])) {
      data = 0
    } else {
      data = parseFloat(valueArray[i])
    }
    if (data < 10000) {
      valueArray[i] = data
    } else if (data >= 10000 && data < 100000000) {
      data = data * 0.0001
      valueArray[i] = data.toFixed(2)
      dw = '万'
    } else {
      data = data * 0.00000001
      valueArray[i] = data.toFixed(2)
      dw = '亿'
    }
    obj.value = data.toFixed(2)
    obj.dw = dw
    returnArray.push(obj)
  }
  return returnArray
}
echartsTools.clearEmpyDataInArray = function (dataArray, valueField) {
  for (let i = dataArray.length - 1; dataArray.length >= 0; i--) {
    const obj = dataArray[i]
    if (!obj[valueField] || isNaN(obj[valueField]) || obj[valueField] == '0' || obj[valueField] == '') {
      dataArray.splice(i, 1)
    }
  }
}
/**
 * 计算乘数
 */
echartsTools.getChengshuForList = function (unit) {
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

/**
 *对数字以,隔开
 */

echartsTools.formatNum = function (strNum) {
  if (strNum.length <= 3) {
    return strNum
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
    return strNum
  }
  const a = RegExp.$1; let b = RegExp.$2; const c = RegExp.$3
  const re = new RegExp()
  re.compile('(\\d)(\\d{3})(,|$)')
  while (re.test(b)) {
    b = b.replace(re, '$1,$2$3')
  }
  return a + '' + b + '' + c
}

/**
 * 从传过来的数组中取平均值
 * @param chartData
 * @param valueField
 * @returns {number}
 */
echartsTools.getAverageData = function (chartData, valueField) {
  let total = 0
  let averageData = 0
  for (let i = 0; i < chartData.length; i++) {
    const obj = chartData[i]
    total += obj[valueField] ? Number(obj[valueField]) : 0
  }
  if (chartData.length > 0) {
    averageData = (total / chartData.length).toFixed(2)
  }
  return averageData
}

// 针对超过10块儿内容的饼图进行处理
echartsTools.getPieDataWidthMoreThan10Part = function (chartData, nameField, valueField) {
  echartsTools.sortArrayWithField(chartData, valueField, 'asc')
  let sum = 0
  for (let i = 0; i < chartData.length; i++) {
    sum += chartData[i][valueField] ? Number(chartData[i][valueField]) : 0
  }
  if (sum == 0) {
    return chartData
  }
  for (let i = 0; i < chartData.length; i++) {
    const value = chartData[i][valueField] ? Number(chartData[i][valueField]) : 0
    if (sum != 0) {
      chartData[i].piepercent = (value / sum * 100).toFixed(4)
    }
  }

  let otherPercent = 0
  let otherDataCnt = 0
  for (let i = 0; i < chartData.length; i++) {
    const dataObj = chartData[i]
    const piepercent = dataObj.piepercent
    otherPercent += Number(piepercent)
    if (piepercent > 10) {
      if (i == 0) {
        break
      } else {
        if (otherPercent > 30 || (chartData.length - i - 1) <= 5) {
          otherDataCnt = i
          break
        } else {
          otherDataCnt = i + 1
          break
        }
      }
    } else {
      if (otherPercent > 20 || (chartData.length - i - 1) <= 5) {
        otherDataCnt = i + 1
        break
      }
    }
  }

  const otherObj = {}
  const otherArray = []
  const returnArray = []
  let otherSum = 0
  for (let i = 0; i < chartData.length; i++) {
    if (otherDataCnt >= 2) {
      if (i < otherDataCnt) {
        otherSum += Number(chartData[i][valueField])
        otherArray.push(chartData[i])
      } else {
        returnArray.push(chartData[i])
      }
    } else {
      returnArray.push(chartData[i])
    }
  }
  if (otherDataCnt >= 2) {
    otherObj[nameField] = '其他'
    otherObj[valueField] = otherSum
    otherObj.piepercent = Number(otherSum / sum * 100).toFixed(4)
    otherObj.otherData = otherArray
    /**
     * ADD BY ZX
     * 20160302
     * 解决其他的单位显示为undefined的问题
     */
    otherObj.dw = chartData[0].dw
    otherObj.showunit = chartData[0].showunit
    // ADD END
    returnArray.push(otherObj)
  }
  return returnArray
}

echartsTools.getUnitObjWithNumber = function (value) {
  let data
  const returnObj = {}
  let dw = ''
  let chengshu = 1
  if (isNaN(value)) {
    data = 0
  } else {
    data = parseFloat(value)
  }
  if (Math.abs(data) < 10000) {
    if ((data + '').indexOf('.') >= 0) {
      returnObj.value = data.toFixed(2)
    } else {
      returnObj.value = data.toFixed(0)
    }

    //
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
/*
 * @Description: 保留整数
 * @Param:
 */
echartsTools.getUnitObjWithNumberForInt = function (value) {
  let data
  const returnObj = {}
  let dw = ''
  if (isNaN(value)) {
    data = 0
  } else {
    data = parseFloat(value)
  }
  if (Math.abs(data) < 10000) {
    //
  } else if (Math.abs(data) >= 10000 && Math.abs(data) < 100000000) {
    data = data * 0.0001
    dw = '万'
  } else if (Math.abs(data) >= 100000000 && Math.abs(data) < 1000000000000) {
    data = data * 0.00000001
    dw = '亿'
  } else {
    data = data * 0.000000000001
    dw = '万亿'
  }
  returnObj.value = data.toFixed(0)
  returnObj.dw = dw
  return returnObj
}

/*
 * @Description: 保留整数
 * @Param:
 */
echartsTools.getUnitObjWithNumberForFormer = function (value) {
  let data
  const returnObj = {}
  let dw = ''
  if (isNaN(value)) {
    data = 0
  } else {
    data = parseFloat(value)
  }
  if (Math.abs(data) < 10000) {
    //
  } else if (Math.abs(data) >= 10000 && Math.abs(data) < 100000000) {
    data = data * 1
    dw = ''
  } else if (Math.abs(data) >= 100000000 && Math.abs(data) < 1000000000000) {
    data = data * 0.0001
    dw = '万'
  } else {
    data = data * 0.00000001
    dw = '亿'
  }
  returnObj.value = data.toFixed(0)
  returnObj.dw = dw
  return returnObj
}
/**
 * 数值求和
 * arr
 */
echartsTools.getTotalValue = function (arr, valueName) {
  let total = 0
  for (let i = 0; i < arr.length; i++) {
    total += Number(arr[i][valueName])
  }
  return total
}
/**
 * 获取数组中最大值
 * arr
 */
echartsTools.getMaxForArr = function (arr) {
  let max = 0
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

export default echartsTools

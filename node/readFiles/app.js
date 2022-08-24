let keyArr = [
  { field: "zb" },
  { field: "qshj" },
  { field: "nt" },
  { field: "nj" },
  { field: "cz" },
  { field: "sq" },
  { field: "wx" },
  { field: "zj" },
  { field: "lyg" },
  { field: "yc" },
  { field: "ha" },
  { field: "xz" },
  { field: "yz" },
  { field: "tz" },
  { field: "sz" },
]

let arr = [
  '当年放贷户数（万笔） 26.76 1.66 5.57 2.09 1.06 2.78 0.91 1.63 0.83 0.89 1.97 1.41 1.11 4.15',
  '累计放贷户数（万笔） 386 31 73 31 8 45 17 15 18 14 25 19 16 61',
  '当年放贷金额(亿元） 1184 71 309 92 32 110 32 59 22 35 88 48 30 217',
  '累计放贷金额(亿元） 11517 873 2472 911 217 1465 376 426 390 348 696 465 370 2074',
  '贷款余额(亿元) 5815 448 1375 442 117 719 173 182 174 159 344 214 163 1112',
  '个贷率(%) 93.43 107.02 104.18 103.51 96.75 96.54 95.95 93.02 90.69 89.64 89.5 87.88 85.66 84.74',
]
/**
 * 表格数据转换
 */
function tableData(keyArr, arr) {
  let restList = []
  for (let i of arr) {
    let valueArr = i.split(" ")
    let res = {}
    keyArr.forEach((item, index) => {
      res[item.field] = valueArr[index]
    })
    restList.push(res)
  }
}


let strList = [
  '2021 年末，全市共有1.55万个单位办理缴存登记，95.18万 人开设住房公积金账户。累计缴存总额 678.14亿 元，缴存余额 191.49亿 元。累计发放贷款 18.15万 笔，贷款总额 390.24亿 元， 贷款余额 173.67亿 元，个贷比率为 90.69 %。',
  '2021 年全市新增缴存单位 4,164 个，新增缴存人数 18.17万 人，销户单位 1387 个，销户人数 3.87万人。 至 2021 年末，全市住房公积金缴存单位 1.55万个 95.18万 人，比上年末 1.27万个 80.87万人，增加 2,800个单位 增加 14.31万人，分别增长 22.05%、增长 17.70%。 2021 年末实缴人数为 66.92万 人，比上年末54.76万人，增 加 增加 12.16万人，增长 22.21%，增幅居全省首位，实缴人数排名全 省第 6 位，较上年提升 1 位。 ',
  '2021 年全市缴存住房公积金 97.87 亿元，同比增长 22.02%， 增幅居全省首位。缴存额排名全省第 7 位，较上年提升 1 位。当 年人均月实缴额 1219 元，排名全省第 13 位，较上年 1221 元， 第 13 位，基本不变。缴存余额为 191.49 亿元，排名全省第 9 位， 较上年提升 1 位。',
  '以 2021 年末职工医保缴存人员为基数，2021 年末全市住房 公积金覆盖率为 70.63%，比上年末 60.18%，提高 10.45 个百分 点。',
  '2021 年提取住房公积金 76.55 亿元，占当年缴存额的 78.22%, 比上年增加 9.69 亿元，增长 14.49%。提取率排名全省第 2 位。',
  '截至 2021 年末,全市住房公积金累计提取额 486.64 亿元。',
  '受国家房地产宏观调控政策的影响，2021 年全市发放住房 公积金贷款 8340 笔 22.3 亿元，分别比上年减少 1429 笔 3.22 亿 元，减幅分别为 14.62%和 12.61%。其中：异地缴存人本地贷款 385 笔 1 亿元。回收个人住房公积金贷款 25.17 亿元，比上年同 期 27.27 亿元，下降 7.7%。',
  '截至 2021 年末，累计发放贷款 181512 笔 390.24 亿元。其 中：累计发放异地缴存人本地贷款 2707 笔 7.32 亿元。未结清贷款 93074 笔，贷款余额 173.67 亿元（其中：纯公积金贷款 55591 笔 100.1 亿元、组合贷款 37483 笔 73.57 亿元）,排名全省第 9 位。个贷比率为 90.69%，较 2020 年底 103.74%，减少 13.05 个 百分点，排名全省第 8 位，较上年下降 4 位。',
  '2021 年，全市住房公积金管理业务收入 6.11 亿元，比上年 增长 4.85%，其中：住房贷款利息收入 5.73 亿元，比上年增长 1.41 %；业务支出 3.25 亿元，比上年减少 5.8%，其中：职工住 房公积金利息支出 2.7 亿元，比上年增长 8%，占支出总额的 83.07%。2021 年实现住房公积金增值收益 2.86 亿元，比上年增 加 0.48 亿元，增长 20.17%。',
  '2021 年，全市支持住房消费合计 88.87 亿元（其中：住房 消费提取 66.57 亿元、住房公积金贷款发放 22.3 亿元），同比增 长 8.76%，支持贷款职工购建住房 103.48 万平方米。 ',
  '2021 年上缴财政廉租住房建设补充资金 1.22 亿元，累计上 缴 7.75 亿元。'
]



let str = [
  '2021年1-12月住房公积金贷款发放18885笔95.19亿元，回收个人住房贷款63.31亿元。2021年第四季度贷款累计发放笔数较上年第四季度增加3754笔，增幅24.81%；贷款发放金额增加24.33亿元，增幅34.34%。截至2021年12月末住房公积金贷款累计发放26.76万笔765.50亿元，贷款余额433.42亿元。乌鲁木齐住房公积金管理中心年初以来发放异地贷款1570笔7.34亿元。',
  '2019年7月开展的贴息贷款，极大缓解了中心的资金压力。现已暂停办理贴息贷款，2021年1-12月为23名职工发放住房公积金商业银行贴息贷款0.13亿元。累计为9401 名职工发放商业银行住房公积金贴息贷款 54.60 亿元。',
  '2021年第四季度，在中心政策的不断调整下，个贷率保持平稳。第四季度个贷率为94.22%，环比上季度下降0.8%，远高于风险警戒值85%，中心将继续严格控制个贷率。',
  '2021年第四季度借款人单位性质为国家机关、事业单位的累计发放贷款6905笔，同比2020年第四季度增加1568笔，增幅29.38%；2021 年第四季度借款人单位性质为国家机关、事业单位的发放个人住房公积金贷款户均贷款额度为55.11万元/户。',
  '2021年第四季度借款人单位性质为国有企业的累计发放贷款7095笔，同比2020年第四季度增加1376笔，增幅24.06%；2021年第四季度 借款人单位性质为国有企业的发放个人住房公积金贷款户均贷款额度为54.21万元/户。',
  '2021年第四季度借款人单位性质为城镇集体企业、城镇私营企业及其他城镇企业的累计发放贷款1611笔，同比2020年第四季度增加40 笔，增幅2.55%；2021年第四季度借款人单位性质为城镇企业的发放个人住房公积金贷款额度为47.59万元/户。',
  '2021年第四季度借款人单位性质为民办非企业、社会团体、个体工商户及个人自愿缴存的累计发放贷款96笔，同比2020年第四季度增 加1笔，增幅1.05%；2021年第四季度借款人单位性质为民办非企业、社会团体、个体工商户及个人自愿缴存的发放个人住房公积金贷款户均贷款额度为46.56万元/户。',
  '2021年第四季度借款人单位性质为外商的累计发贷款121笔，同比2020年第四季度减少41笔，降幅25.31%；2021年第四季度借款人单位性质为外商的发放个人住房公积金贷款户均贷款额度为48.67万元/户。',
  '2021年第四季度借款人单位性质为其他的累计发放贷款3057笔，同比2020年第四季度增加810笔，增幅36.05%;2021年第四季度借款人 单位性质为其他的发放个人住房公积金贷款为51.02万元/户。',
  '以上数据分析可得出职工单位性质按国家机关、事业单位，国有企业，城镇集体企业、城镇私营企业及其他城镇企业，民办非企业、 社会团体、个体工商户及个人自愿缴存，外商，其他来划分，发放的个人住房公积金贷款户均最大的是国家机关、事业单位，发放的个人住房公积金贷款户均最小的是民办非企业、社会团体、个体工商户及个人自愿缴存。',
  '按借款人购房面积分类：2021年第四季度购房面积为90（含）㎡以下的累计发放贷款2844笔，同比2020年第四季度增加50笔，增幅1.79%；购房面积为90-120（含）㎡的累计发放贷款8834笔，同比2020年第四季度增加2261笔，增幅34.40%；购房面积为120-144（含）㎡的 累计发放贷款6146笔，同比2020年第四季度增加1299笔，增幅26.80%；购房面积为144㎡以上的累计发放贷款1084笔，同比2020年第四季 度增加167笔，增幅18.21%。中心多支持了中小户型的住房需求。',
  '按借款人月缴存基数分类：2021年第四季度借款人月缴存基数贷款发放情况同上年发放情况基本一致，都为上年当地社平工资2倍以下的职工贷款笔数最多，占第四季度贷款发放笔数的86.55%。体现了住房公积金多支持中低收入水平的职工使用住房公积金贷款。',
  '按借款人住房公积金贷款使用次数：2021年第四季度首次使用住房公积金贷款的职工占76.92%，二次使用住房公积金贷款的职工占23.08%。',
  '按借款人贷款用途（房屋性质）分类：2021年第四季度职工购买商品房贷款累计发放14264笔，同比上年第四季度增加5308笔，增幅59.27%，2021年第四季度职工购买商品房平均单价为9078.46元/㎡。2021年第四季度职工购买二手房贷款累计发放2394笔，同比上年第四季度减少1125笔，降幅31.97%，2021年第四季度职工购买二手房平均单价为5708.04元/㎡。2021年第四季度职工购买住房转住房公积金贷款的累计发放2221笔，同比上年第四季度减少256笔，降幅10.34%，2021年第四季度职工购买住房转住房公积金贷款的平均单价为7728.67元/㎡。',
  '截止2021年12月末，我中心贷款余额433.42亿元，我中心个人住房公积金贷款逾期金额1170.98万元，其中3-5期逾期人数为62人、逾 期本金27.77万元；6期以上逾期人数52人、剩余本金1143.21万元。贷款逾期率为0.27‰，逾期率较上月降低0.01‰。我中心将通过加大 催收催缴力度、起诉逾期次数过高的借款人等方式，将逾期控制在可控范围。'
]




const fs = require('fs')

let pIndex = 1
let numIndex = 1

// 删除文件
function deleteFile(filelist) {
  filelist.forEach(item => {
    fs.unlinkSync(item)
    console.log('删除成功')
    // fs.unlink(item, function () {
    //   console.log('删除成功')
    // })
  })
}

/**
 * 正则匹配字符串中的所有数字
 */
function dealTemplateString(str) {
  let reg1 = /([1-9]\d*\.?\d*[万,亿]?)|(0\.\d*[1-9][万,亿]?)/g;
  // let regMatchArr = str.match((reg1))
  let dataObj = {}
  str = str
    .replace(/2021/g, '{{year}}')
    .replace(/\s/g, '')
    .replace(reg1, (word) => {
      if (word.substr(-1, 1) == '万') {
        word = (word.substring(0, word.length - 1) * 10000).toFixed(0)
      }
      else if (word.substr(-1, 1) == '亿') {
        word = (word.substring(0, word.length - 1) * 100000000).toFixed(0)
      }
      dataObj['num' + numIndex] = word;
      let res = `<u>{{numberFormat(p${pIndex}.num${numIndex})}}</u>`
      numIndex++
      return res
    })
    .replace(new RegExp("亿", "g"), "")
    .replace(new RegExp("万", "g"), "",)

  // 写入文件
  fs.appendFile('objData.txt', 'p' + pIndex + ":" + JSON.stringify(dataObj, null, 2) + ',\n', () => { })
  fs.appendFile('strData.txt', `<p>${str}</p>` + '\n\n', () => { })
  pIndex++
}


deleteFile(['objData.txt', 'strData.txt'])
str.forEach(str => {
  dealTemplateString(str)
})
console.log('写入成功')




// console.log(str.split('\n').filter(item => !!item))
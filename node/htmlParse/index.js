const htmlparser2 = require('htmlparser2');
const fs = require('fs')
const current_path = fs.realpathSync('./files'); //获取当前路径 
let fileNameList = []

// 获取当前文件夹内所有指定格式的文件的绝对路径并缓存起来
function getFilePath(path) {
  let fileList = []
  let dirList = fs.readdirSync(path);
  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isDirectory()) {
      walk(path + '/' + item);
    } else {
      if (/.html$/.test(item)) { //将所有.html文件路径保存在fileList中
        fileList.push(path + '/' + item);
        fileNameList.push(item.replace("html", "json"))
      }
    }
  });
  return fileList
}

// 前序遍历
function treeForeach(tree, func) {
  tree.forEach(data => {
    func(data)
    data.children && treeForeach(data.children, func) // 遍历子树
  })
}


function main() {
  let list = {}
  let fileList = getFilePath(current_path); // 读取所有文件路径
  const handler = new htmlparser2.DomHandler(function (error, domTree) {
    let dataIndex = 1
    treeForeach(domTree, rectangleItem => {
      let data = []
      if (rectangleItem?.attribs?.class == "rectangle") {
        treeForeach(rectangleItem.children, (domItem) => {
          if (domItem?.attribs?.class == "weui-cell") {
            let res = {
              key: "",
              name: "",
              value: "",
            }
            treeForeach(domItem.children, (item) => {
              if (item?.attribs?.class == "weui-cell__bd") {
                res.name = item?.children[0]?.data.replace("：", "")
              }
              if (item?.attribs?.class == "weui-cell__hd") {
                res.key = item.attribs?.id
              }
            })
            data.push(res)
          }
        })
        if (data.length > 0) {
          // list.push({ ["data" + dataIndex]: data })
          list["data" + dataIndex] = data
        }
        dataIndex++
      }
    })
  })

  const parser = new htmlparser2.Parser(handler, {
    recognizeCDATA: true
  })

  for (let i = 0; i < fileList.length; i++) {
    let fileName = fileList[i];
    (function (_fileName) {
      fs.readFile(_fileName, function (err, data) {
        data = data + ""
        list = {};
        parser.parseComplete(data);
        fs.writeFile('./result/' + fileNameList[i], JSON.stringify(list, null, 2), (err) => {
          err ? console.log(err) : console.log(`写入${fileNameList[i]}成功`)
        })
      })
    })(fileName)
  }

}


// main()


let template = `<template>
<!-- 通过，success处理，不通过fail处理 -->
<approval-layout @fail="fail"
                 @success="success"
                 :processData="processData"
                 :currentPlace="content.linkname"
                 :currentStatus="content.status"
                 :taskStatus="taskStatus">

  <approval-normal-card title="单位账户注销业务信息">
    <approval-info-list :list="data1"></approval-info-list>
  </approval-normal-card>

</approval-layout>
</template>
<script>
export default {
data() {
  return {
    // 单位账户封存
    data1: [
      {
        key: "xhyy",
        name: "注销原因",
        value: "",
      },
      {
        key: "pzzxbm",
        name: "批准注销部门 ",
        value: "",
      },
      {
        key: "pzzxsj",
        name: "批准注销时间 ",
        value: "",
      },
      {
        key: "pzwsbh",
        name: "批准文书编号 ",
        value: "",
      },
      {
        key: "shyy",
        name: "审核原因",
        value: "",
      },
      {
        key: "ywbz",
        name: "备注",
        value: "",
      },
    ],
    processData: [],
    content: {},
    busData: {},
    taskStatus: "",
  };
},
mounted() {
  this.content = JSON.parse(this.$route.query.content);
  this.taskStatus = this.content.taskstatus;
},
beforeDestroy() {
  if (this.taskStatus == "待办" || this.taskStatus == "超时") {
    Base.submit(
      null,
      {
        url: "/approval/updateBusOccupy",
        data: {
          busno: this.content.busno,
          taskno: this.content.taskno,
          flowcode: this.content.flowcode,
          isoccupy: "0",
        },
      },
      {
        successCallback: (data) => {},
      }
    );
  }
},
methods: {
  fail(opinion) {
    // console.log("fail", opinion);
  },
  success(opinion) {
    // this.submitApproval(1, opinion);
  },
},
};
</script>`

function createFiles() {
  let fileList = [
    // "ME001.vue",
    // "ME017.vue",
    // "ME018.vue",
    "ME003.vue",
    "CE001.vue",
    "ME002.vue",
    "ME006.vue",
    "ME005.vue",
    "ME004.vue",
    "FA020.vue",
    "CE003.vue",
    "ME013.vue",
    "MP051.vue",
    "LA003.vue",
    "LA073.vue",
    "LA083.vue"].map(item => item.toLowerCase())
  fileList.forEach((item, index) => {
    console.log(template)
    fs.writeFile('./fileTemplate/' + item, template, (err) => {
      err ? console.log(err) : console.log(`写入${item}成功`)
    })
  })
}

function getRoutes() {
  let list = [
    { label: "单位开户登记", value: "ME001" },
    { label: "单位账户封存", value: "ME017" },
    { label: "单位账户启封", value: "ME018" },
    { label: "单位账户注销", value: "ME003" },
    { label: "单位信息变更", value: "CE001" },
    { label: "单位管理机构变更", value: "ME002" },
    { label: "缴存比例调整", value: "ME006" },
    { label: "应缴时间调整", value: "ME005" },
    { label: "单位缓缴", value: "ME004" },
    { label: "转入未确认款", value: "FA020" },
    { label: "单位委托收款管理", value: "CE003" },
    { label: "单位暂存款退款", value: "ME013" },
    { label: "灵活人员缴存额调整", value: "MP051" },
    { label: "开发单位信息维护", value: "LA003" },
    { label: "开发商自助签约", value: "LA073" },
    { label: "楼栋新增", value: "LA083" }
  ]


  let res = list.map(item => {
    return {
      "summary": item.label,
      "dealtime": "2022-08-05 16:39:57",
      "dealname": "王庆",
      "flowcode": item.value,
      "slsj": "2022-08-05",
      "mklb": "loa",
      "abstract": item.label,
      "type": item.label,
      "taskstatus": "待办",
      "linkcode": 60,
      "xxly": "01",
      "sfcs": "0",
      "taskno": "12509849",
      "busno": "20220805938944",
      "flowname": item.label,
      "promoter": "王庆",
      "time": "2022-08-05",
      "linkname": "复核",
      "status": "待复核",
      "prepromoter": "王庆"
    }
  })

  console.log(res)
}


getRoutes()










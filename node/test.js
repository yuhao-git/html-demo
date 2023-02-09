
var fs = require('fs');
const { range } = require('xe-utils');
var current_path = fs.realpathSync('./src/scopes/project/visual/decisionModules'); //获取当前路径 
var fileList = [];
var tableList = [];
// 获取当前文件夹内所有指定格式的文件的绝对路径并缓存起来
function walk(path) {
  var dirList = fs.readdirSync(path);
  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isDirectory()) {
      walk(path + '/' + item);
    } else {
      if (/.vue$/.test(item)) { //将所有.vue文件路径保存在fileList中
        fileList.push(path + '/' + item);
      }
    }
  });
}

walk(current_path); // 读取所有 .vue文件路径

for (var i = 0; i < fileList.length; i++) {
  var fileName = fileList[i];
  (function (_fileName, index) {
    fs.readFile(_fileName, function (err, data) {
      data = data + ""
      let reg = new RegExp('((.*)=.*echarts.init.*)', 'g');
      let res = data.match(reg)
      if (res) tableList.push(res[0])
      if (index == fileList.length - 1) {
        let result = tableList.map(item => {
          let res = item.split('=')
          return res[0].replace(new RegExp(' ', 'g'), '').replace(new RegExp('\/\/'), '')
        })
        let arr = Array.from(new Set(result));
        arr.map(item=>{
          console.log(item)
        })
      }
    })
  })(fileName, i)
}


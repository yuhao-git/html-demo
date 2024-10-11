
var fs = require('fs');
const { range } = require('xe-utils');
var current_path = fs.realpathSync('./project'); //获取当前路径 
var fileList = [];
var tableList = [];
var errorCount = 0
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

walk(current_path); // 读取所有 .js .vue文件路径
// fs.unlink删除文件  
fs.unlink('table.txt', function (error) {
  if (error) {
    console.log(error);
    return false;
  }
  console.log('删除文件成功');
})

for (var i = 0; i < fileList.length; i++) {
  var fileName = fileList[i];
  (function (_fileName) {
    fs.readFile(_fileName, function (err, data) {
      data = data + ""
      let reg = new RegExp('<ta-table(.|\n)*?</ta-table>', 'g');
      if (reg.test(data)) {
        tableList.push(_fileName)
        // 写入文件
        // writeFile  
        // fs.writeFileSync(filename,'abc');
        // fs.appendFileSync(filename,' lalala');
        fs.appendFile('table.txt', _fileName.replace("D:\\projects\\04.数据基础支撑平台\\trunk\\03.产品源码\\hfdata\\webapp\\hfdata-app-ui\\", "") + '\n', function (err) {
          if (err) {
            errorCount++
            console.log("error!" + _fileName);
          } else {
            console.log(_fileName + '   ok!');
          }
        });
      }
    })
  })(fileName)
}


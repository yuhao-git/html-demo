<template>
  <el-button type="primary" @click="exportExcel">导出excel</el-button>
  <el-button  @click="toggleShow">显示</el-button>
  <div> -- {{ isShow }} -- </div>
  <keep-alive >
    <show v-show="isShow" />
  </keep-alive>
</template>

<script lang='ts' setup>
import ExcelJS from 'exceljs';
import show from './show.vue';
import { ref } from 'vue';
let isShow = ref(false);
function toggleShow() {
  // 测试v-show是否会触发 activated
  isShow.value = !isShow.value
}
function exportExcel() {
  // 要导出的数据
  let dataList = [
    { name: '獐伞', age: 18, gender: '男' },
    { name: '里斯', age: 18, gender: '女' },
    { name: '汪芜', age: 18, gender: '男' }
  ];
  // 创建工作簿
  var workbook = new ExcelJS.Workbook();
  // 创建工作表
  const sheet = workbook.addWorksheet('Sheet1');
  // 创建表头
  /**
   * header: 显示的内容
   * key: 设置一个唯一的key作为属性名，添加行数据时与之对应
   * width: 设置单元格的宽
   */
  sheet.columns = [
    { header: '姓名', key: 'name', width: 10 },
    { header: '年龄', key: 'age', width: 10 },
    { header: '性别', key: 'gender', width: 10 }
  ];
  // 添加行数据
  dataList.forEach((item, index) => {
    sheet.addRow({ name: item.name, age: item.age, gender: item.gender });
  });
  // 下载 excel
  workbook.xlsx.writeBuffer().then((buf) => {
    let blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    const downloadElement = document.createElement('a')
    let href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = "人员信息表.xlsx"; // 文件名字
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  });



}

</script>
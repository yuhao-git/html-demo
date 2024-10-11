<template>
  <div class="h-full w-full flex gap-4">
    <div
      class="w-1/2 h-full bg-white border border-white rounded overflow-auto p-2"
    >
      <div v-html="fileData"></div>
    </div>
    <div
      class="w-1/2 h-full bg-white border border-white rounded overflow-auto p-2"
    >
      <!-- 添加创建锚点的按钮 -->
      <el-button @click="createAnchor" type="success"
        >为选中文本添加锚点</el-button
      >
      <el-button
        v-for="item in anchorList"
        :key="item.anchor"
        @click="jumpToAnchor(item.anchor)"
        type="primary"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>

<script setup>
import file from "./file.js";
import { ref, onMounted, onUnmounted } from "vue";
const fileData = ref(file); // 文件内容
const selectedText = ref(""); // 选中的文本
const anchorList = ref([
  // 锚点
  {
    name: "总体要求",
    anchor: "ztyq",
  },
  {
    name: "组织保障",
    anchor: "zzbz",
  },
]);

let originalStyle = {
  color: "#000",
  backgroundColor: "#fff",
};

// 使用第三方库从fileData中解析dom节点信息



// 如果找到了锚点元素，设置锚点元素字体为红色，背景为灰色
const saveAnchorStyle = (anchor) => {
  const anchorElement = document.getElementById(anchor);
  anchorElement.style.color = "#C80000";
  anchorElement.style.backgroundColor = "#EBF3FD";
};

// 还原锚点元素的样式
const restoreAnchorStyle = (anchor, originalStyle) => {
  const anchorElement = document.getElementById(anchor);
  if (anchorElement) {
    anchorElement.style.cssText = originalStyle;
  }
};

// 点击跳转到指定锚点
const jumpToAnchor = (anchor) => {
  // 还原
  anchorList.value.forEach((item) => {
    restoreAnchorStyle(item.anchor, originalStyle);
  });
  restoreAnchorStyle(anchor, originalStyle);
  const anchorElement = document.getElementById(anchor);
  // 保存当前锚点元素的样式
  saveAnchorStyle(anchor);
  if (anchorElement) {
    // 锚点滚动到画面中间
    anchorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// 创建锚点的方法
const createAnchor = () => {
  const selection = window.getSelection();
  console.log(selection)
  selectedText.value = selection.toString();
  if (selectedText.value) {
    // 创建一个唯一的锚点ID
    const anchorId = `anchor-${Date.now()}`;
    // 将选中的文本转换为一个锚点元素
    const anchorElement = document.createElement("span");
    anchorElement.id = anchorId;
    anchorElement.textContent = selectedText.value;

    // 将锚点元素插入到文档中的选中位置
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(anchorElement);
    // 取消文本选中
    // selection.removeAllRanges();
    // 更新锚点列表
    anchorList.value.push({
      name: selectedText.value.slice(0, 4), // 使用选中的文本作为锚点名称
      anchor: anchorId, // 使用创建的锚点ID
    });

    // 清空选中的文本
    selectedText.value = "";
  } else {
    alert("请先选中一些文本。");
  }
};
</script>
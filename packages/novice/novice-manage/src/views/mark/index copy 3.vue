<template>
  <div class="text-select grid grid-cols-2 gap-4 h-full relative">
    <div class="w-full relative box-border">
      <!-- 添加记录按钮 -->
      <el-button @click="addAnchor" type="primary">添加记录</el-button>
      <!-- 标注列表 -->
      <div class="mt-2">
        <el-popover
          v-for="(item, index) in anchorList"
          :key="index"
          width="400"
          trigger="click"
          :content="item.text"
        >
          <template #reference>
            <el-button @click="highlightText(item)">
              {{ item.text.slice(0, 4) }}
            </el-button>
          </template>
        </el-popover>
      </div>
      <!-- 选中文本信息 -->
      <div v-if="selection" class="absolute bottom-0 w-full left-0">
        <p>选中的文本: {{ selection.text }}</p>
        <p>起始位置: {{ selection.start }}</p>
        <p>结束位置: {{ selection.end }}</p>
      </div>
    </div>
    <!-- 富文本内容 -->
    <div
      class="overflow-auto h-full"
      v-html="fileData"
      ref="contentDiv"
      @mouseup="handleTextSelect"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 假设这是从接口获取的富文本内容
import fileContent from "./file.js";
const fileData = ref(fileContent);
// 创建响应式引用
const selection = ref(null);
const anchorList = ref([]);
const contentDiv = ref(null); // 增加一个对富文本div的引用

// 添加锚点
function addAnchor() {}

function wrapTextWithSpan(richText) {
  // 创建一个新的div元素，将富文本内容设置为其innerHTML
  var div = document.createElement("div");
  div.innerHTML = richText;
  let id = 0; // 用于生成唯一的id
  // 递归函数，用于遍历所有文本节点
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // 如果节点是文本节点
      var text = node.textContent; // 获取文本内容
      var span = document.createElement("span"); // 创建一个新的span元素
      // 将文本内容添加到span中
      for (var i = 0; i < text.length; i++) {
        // 排除换行
        if (text[i] === "\n") continue;
        // 遍历文本中的每个字符
        var charSpan = document.createElement("span"); // 创建一个新的span元素
        charSpan.id = "text-" + id++; // 生成唯一的id
        charSpan.textContent = text[i]; // 设置字符为span的文本内容
        span.appendChild(charSpan); // 将字符span添加到总的span中
      }
      node.parentNode.replaceChild(span, node); // 用新的span替换原来的文本节点
    } else {
      // 如果节点不是文本节点
      for (var i = 0; i < node.childNodes.length; i++) {
        // 遍历子节点
        traverse(node.childNodes[i]); // 对每个子节点递归调用此函数
      }
    }
  }

  traverse(div); // 从div开始遍历

  return div.innerHTML; // 返回处理后的富文本
}

// 当组件挂载后，执行wrapTextWithSpan函数
onMounted(() => {
  fileData.value = wrapTextWithSpan(fileData.value);
});

// 鼠标松开时确认选择的文本信息
function handleTextSelect() {
  // 获取选中的文本
  //   const selection = window.getSelection();
  var selectedElement = getSelectedElementInfo();
  if (selectedElement) {
    console.log("选中的元素是：", selectedElement);
  } else {
    console.log("没有选中任何元素");
  }
}

// 获取选中节点
function getSelectedElementInfo() {
  var selection = window.getSelection();
  // 判断是点击还是选择
  if (selection.type == "Caret") return;
  console.log(selection.getRangeAt(0));
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    var commonAncestorContainer = range.commonAncestorContainer;
    if (commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
      return commonAncestorContainer;
    } else {
      return commonAncestorContainer.parentNode;
    }
  }
  return null;
}

// 获取选中节点
function getSelectedTextInfo() {
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    var commonAncestorContainer = range.commonAncestorContainer;
    if (commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
      return commonAncestorContainer;
    } else {
      return commonAncestorContainer.parentNode;
    }
  }
  return null;
}

// 高亮选中的文本
function highlightText(anchor) {}

// 定位到选中的文本
function scrollToSelection() {}

// 辅助函数，计算选中文本在整段文件中的起止位置
function getSelectionRange() {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(selection.anchorNode);
  range.collapse(false);
  return range;
}
// 辅助函数，计算选中文本距离容器左上角的距离
function getSelectionOffset() {}
</script>

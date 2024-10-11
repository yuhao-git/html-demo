<template>
  <div class="text-select grid grid-cols-2 gap-4 h-full relative">
    <div class="w-full relative box-border">
      <el-button @click="addAnchor" type="primary">添加记录</el-button>
      <div class="mt-2">
        <el-popover
          v-for="(item, index) in anchorList"
          :key="index"
          width="400"
          trigger="hover"
          :content="item.text"
        >
          <template #reference>
            <el-button @click="highlightText(item)"
              >{{ item.text.slice(0, 4) }}
            </el-button>
          </template>
        </el-popover>
      </div>
      <div v-if="selection" class="absolute bottom-0 w-full left-0">
        <p>选中的文本: {{ selection.text }}</p>
        <p>起始位置: {{ selection.start }}</p>
        <p>结束位置: {{ selection.end }}</p>
      </div>
    </div>
    <div
      ref="contentDiv"
      class="overflow-auto h-full"
      v-html="fileData"
      @mouseup="handleTextSelect"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import fileContent from "./file.js";

// 创建响应式引用
const fileData = ref(fileContent); // 富文本内容
const selection = ref(null);
const anchorList = ref([]);
const contentDiv = ref(null); // 增加一个对富文本div的引用
// 定义 handleTextSelect 方法
const handleTextSelect = (event) => {
  const selectionInstance = window.getSelection();
  if (selectionInstance.rangeCount) {
    const range = selectionInstance.getRangeAt(0);
    const selectedText = range.toString();
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;

    // 计算起始和结束位置
    const start = getNodePosition(startContainer, startOffset);
    const end = getNodePosition(endContainer, endOffset);

    selection.value = {
      text: selectedText,
      start: start,
      end: end,
    };
  }
};

// 定义 addAnchor 方法
const addAnchor = () => {
  if (selection.value) {
    anchorList.value.push(selection.value);
  }
};

// 辅助函数 getNodePosition
const getNodePosition = (node, offset) => {
  let position = 0;
  let current = node;
  while (current && current.nodeType === Node.TEXT_NODE) {
    if (current === node) {
      break;
    }
    position += current.textContent.length;
    current = current.previousSibling;
  }
  return position + offset;
};

// 高亮显示文本的方法
const highlightText = (item) => {
  if (!contentDiv.value || !item.text) return;

  // 创建一个临时的 Range 对象
  const range = document.createRange();
  // 创建一个用于高亮的元素（例如 span）
  const highlightElement = document.createElement("span");
  highlightElement.textContent = item.text;
  highlightElement.style.backgroundColor = "yellow"; // 设置高亮样式

  range.selectNodeContents(contentDiv.value); // 选择富文本区域的所有内容
  range.deleteContents(); // 删除富文本区域的所有内容

  // 将高亮元素添加到富文本区域中
  range.insertNode(highlightElement);

  // 这里需要一个算法来找到文本在富文本中的确切位置
  // 并将高亮元素移动到那个位置
  // 以下代码是一个简化的查找逻辑，实际应用中可能需要更复杂的处理
  const textNode = Array.from(contentDiv.value.childNodes).find(
    (node) =>
      node.nodeType === Node.TEXT_NODE && node.textContent.includes(item.text)
  );

  if (textNode) {
    // 如果找到了文本节点，将高亮元素插入到该位置
    textNode.parentNode.insertBefore(highlightElement, textNode);
    textNode.parentNode.removeChild(textNode); // 删除原始文本节点
  }

  // 更新 selection 状态
  selection.value = item;
};

// 确保在组件挂载后获取富文本div的引用
onMounted(() => {
//   contentDiv.value = document.querySelector('[ref="contentDiv"]');
});
</script>

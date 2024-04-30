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

// 鼠标松开时确认选择的文本信息,获取文本确切位置信息
function handleTextSelect() {
  // 获取选中的文本
  const selected = window.getSelection();
  const { endContainer, startContainer, startOffset, endOffset } =
    selected.getRangeAt(0);
  const container = contentDiv.value;
  const startIndex = getContainrtInnerTextIndexByBackward(
    container,
    startContainer,
    startOffset
  );
  const endIndex = getContainrtInnerTextIndexByBackward(
    container,
    endContainer,
    endOffset
  );

  console.log(startIndex,endIndex)
}

//
function getContainrtInnerTextIndexByBackward(container, node, initial = 0) {
  let idx = initial;
  let cur = node;
  while (cur !== container) {
    Array.from(cur.parentNode.childNodes).find((child) => {
      if (child !== cur) {
        // 可能是element，可能是文本节点，需要注意
        const s = (child.innerText || child.data).length;
        idx += s;
      }
      return child === cur;
    });
    cur = cur.parentNode;
  }
  return idx;
}

// 高亮选中的文本
function highlightText(anchor) {}

// 定位到选中的文本
function scrollToSelection() {}

// 辅助函数，计算选中文本在整段文件中的起止位置
function getSelectionRange() {}

// 辅助函数，计算选中文本距离容器左上角的距离
function getSelectionOffset() {}
</script>

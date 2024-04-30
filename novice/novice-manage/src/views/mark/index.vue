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
          trigger="none"
          :content="item.content"
        >
          <template #reference>
            <el-button @click="highlightText(item)">
              {{ item.content.slice(0, 4) }}
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
const selectIndexRange = ref(null);
const prefix = "text-"; // id前缀
// 添加锚点
function addAnchor() {
  if (!selectIndexRange.value) return;
  let content = "";
  for (
    let i = selectIndexRange.value.startIndex;
    i < selectIndexRange.value.endIndex;
    i++
  ) {
    let span = document.getElementById(prefix + i);
    if (span) {
      content += span.textContent;
    }
  }

  anchorList.value.push({
    name: "",
    content,
    startIndex: selectIndexRange.value.startIndex,
    endIndex: selectIndexRange.value.endIndex,
  });

  selectIndexRange.value = null;
}

function wrapTextWithSpan(richText) {
  // 创建一个新的div元素，将富文本内容设置为其innerHTML
  let div = document.createElement("div");
  div.innerHTML = richText;
  let id = 0; // 用于生成唯一的id
  // 递归函数，用于遍历所有文本节点
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // 如果节点是文本节点
      let text = node.textContent; // 获取文本内容
      let span = document.createElement("span"); // 创建一个新的span元素
      // 将文本内容添加到span中
      for (let i = 0; i < text.length; i++) {
        // 排除换行
        if (text[i] === "\n" || text[i] === " ") continue;
        // 遍历文本中的每个字符
        let charSpan = document.createElement("span"); // 创建一个新的span元素
        charSpan.id = prefix + id++; // 生成唯一的id
        charSpan.textContent = text[i]; // 设置字符为span的文本内容
        span.appendChild(charSpan); // 将字符span添加到总的span中
      }
      node.parentNode.replaceChild(span, node); // 用新的span替换原来的文本节点
    } else {
      // 如果节点不是文本节点
      for (let i = 0; i < node.childNodes.length; i++) {
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
  selectIndexRange.value = getSelectedElementInfo();
}

function getContainrtInnerTextIndexByBackward(container, node, initial = 0) {
  let idx = initial;
  let cur = node;
  while (cur !== container) {
    Array.from(cur.parentNode.childNodes).find((child) => {
      if (child !== cur) {
        // 可能是element，可能是文本节点，需要注意
        const s = (child.innerText || child.data)?.length || 0;
        idx += s;
      }
      return child === cur;
    });
    cur = cur.parentNode;
  }
  return idx;
}

// 获取选中节点id,开始和结束索引
function getSelectedElementInfo() {
  let selection = window.getSelection();
  // 判断是点击还是选择
  if (selection.type == "Caret") return;
  //   if (selection.rangeCount > 0) {
  //     let range = selection.getRangeAt(0);
  //     let commonAncestorContainer = range.commonAncestorContainer;
  //     if (commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
  //       return commonAncestorContainer;
  //     } else {
  //       return commonAncestorContainer.parentNode;
  //     }
  //   }
  const container = contentDiv.value;
  const { endContainer, startContainer, startOffset, endOffset } =
    selection.getRangeAt(0);
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
  return {
    startIndex,
    endIndex,
  };
}

// 获取选中节点
function getSelectedTextInfo() {
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);
    let commonAncestorContainer = range.commonAncestorContainer;
    if (commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
      return commonAncestorContainer;
    } else {
      return commonAncestorContainer.parentNode;
    }
  }
  return null;
}

// 高亮选中的文本
function highlightText(anchor) {
  // 取消之前的高亮
  cancleHighlightText();
  // 滚动到指定位置
  scrollToSelection(anchor);
  for (let i = anchor.startIndex; i < anchor.endIndex; i++) {
    let span = document.getElementById(prefix + i);
    if (span) {
      span.classList.add("selected");
    }
  }
}

// 定位到选中的文本
function scrollToSelection(anchor) {
  const anchorElement = document.getElementById(prefix + anchor.startIndex);
  if (anchorElement) {
    // 锚点滚动到画面中间
    anchorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// 取消高亮
function cancleHighlightText() {
  anchorList.value.forEach((anchor) => {
    for (let i = anchor.startIndex; i < anchor.endIndex; i++) {
      let span = document.getElementById(prefix + i);
      if (span) {
        span.classList.remove("selected");
      }
    }
  });
}
</script>


<style>
.selected {
  background: yellow;
}
</style>
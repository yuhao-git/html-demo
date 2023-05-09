<template>
  <div class="tab-list"
       ref="tabList">
    <div v-for="item in state.list"
         @click="changeActiveItem(item)"
         :class="['tab-item']"
         :key="item.key">
      {{ item.label }}
    </div>
    <div class="tab-selected">{{ state.activeItem.label }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  watch,
  onBeforeUnmount,
} from "vue";

interface listType {
  label: string;
  key: number;
}
const list: listType[] = [
  { label: "标签1", key: 0 },
  { label: "标签2", key: 1 },
  { label: "标签3", key: 2 },
  { label: "标签4", key: 3 },
];
const tabList = ref(null);
const activeItem: listType = list[0];
const state = reactive({ list, activeItem });

// 点击事件
function changeActiveItem(item: listType): void {
  state.activeItem = item;
}

// 计算位置
let left = ref("0");
let width = ref("0");

function resize(): void {
  nextTick(() => {
    left.value =
      tabList.value?.children[state.activeItem.key].offsetLeft + "px";
    width.value =
      tabList.value?.children[state.activeItem.key].clientWidth + "px";
  });
}

onMounted(() => {
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
});

watch(
  () => state.activeItem,
  () => {
    resize();
  },
  { immediate: true }
);
</script>

<style scoped lang='less'>
@tab-height: 52px;
@tab-bgcolor: #e2e8f8;

.tab-list {
  display: flex;
  border-radius: 12px 12px 0 0;
  background-color: @tab-bgcolor;
  overflow: hidden;
  position: relative;
  .tab-item {
    flex: 1;
    height: @tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    opacity: 0.65;
    font-weight: 600;
    position: relative;
    cursor: pointer;
  }
}

.tab-list {
  .tab-selected {
    left: v-bind(left);
    width: v-bind(width);
    transition: 0.3s ease;
    position: absolute;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: @tab-height;
    background: #ffffff;
    border-radius: 12px 12px 0 0;
    box-shadow: 11px 11px 0 0 #ffffff, -11px 11px 0 0 #ffffff;
  }
  .tab-selected::before,
  .tab-selected::after {
    content: "";
    width: 12px;
    height: @tab-height;
    position: absolute;
    bottom: 0;
    background: #e2e8f8;
  }

  .tab-selected::before {
    left: -12px;
    border-radius: 0 0 12px 0;
  }
  .tab-selected::after {
    right: -12px;
    border-radius: 0 0 0 12px;
  }
}
</style>
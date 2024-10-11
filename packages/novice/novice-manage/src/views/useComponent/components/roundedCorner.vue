<template>
  <div class="tab-list"
       ref="tabList">
    <div v-for="item in state.listData"
         @click="changeActiveItem(item)"
         :class="['tab-item']"
         :key="item.index">
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

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => [
      { label: "标签1" },
      { label: "标签2" },
      { label: "标签3" },
      { label: "标签4" },
    ],
  },
  modelValue: {
    type: Object,
  },
  activeItem: {
    type: Object,
  },
});

const emit = defineEmits(["change", "update:modelValue", "update:activeItem"]);

const tabList = ref(null);
const listData: any = props.list.map((item, index) => ({
  ...item,
  index: index,
}));
const activeItem: any = listData[0];
const state = reactive({ activeItem, listData });

onMounted(() => {
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
});

// 点击事件
function changeActiveItem(item: any): void {
  state.activeItem = item;
}

// 计算位置
let left = ref("0");
let width = ref("0");

function resize(): void {
  nextTick(() => {
    left.value =
      tabList.value?.children[state.activeItem.index].offsetLeft + "px";
    width.value =
      tabList.value?.children[state.activeItem.index].clientWidth + "px";
  });
}
// 用ref还能保留响应式。。。
// reactive 只能做为某个属性才能保留响应，解构之后也会失去响应式
const activeIndex = ref({});

watch(
  () => state.activeItem,
  () => {
    emit("update:modelValue", state.activeItem);
    emit("update:activeItem", state.activeItem);
    resize();
    activeIndex.value = state.activeItem;
  },
  { immediate: true }
);

watch(
  () => props.list,
  () => {
    state.listData = props.list.map((item, index) => ({
      ...item,
      index: index,
    }));

    state.activeItem = state.listData[0] || {};
  },
  {
    deep: true,
  }
);

defineExpose({ state: state, activeIndex: activeIndex });
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
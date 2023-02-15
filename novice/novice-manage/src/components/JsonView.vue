<template>
  <el-scrollbar max-height="100%">
    <json-viewer :value="jsonData"
                 :theme="isLight ? 'jv-light' : 'jv-dark'"
                 :expand-depth=5
                 copyable
                 boxed
                 sort></json-viewer>
  </el-scrollbar>
</template>

<script setup>
import { ref, toRef, watch } from "vue";
import JsonViewer from "vue-json-viewer";
import { cloneDeep } from "lodash";
import { useThemeStoreHook } from "@/store/modules/theme";
import { storeToRefs } from "pinia";

let props = defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
});

let jsonData = ref([]);
watch(
  () => props.dataSource,
  (data) => {
    jsonData.value = cloneDeep(data);
  },
  {
    deep: true,
  }
);

let themeStore = useThemeStoreHook();
let { isLight } = storeToRefs(themeStore);
</script>

<style scoped lang="less">
.jv-dark {
  // background: #fff;
  // white-space: nowrap;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  border: 1px solid;

  font-family: Consolas, Menlo, Courier, monospace;

  :deep(.jv-more) {
    &::after {
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }

  .jv-button {
    color: #49b3ff;
  }
  .jv-key {
    color: #111111;
  }
  .jv-item {
    &.jv-array {
      color: #111111;
    }
    &.jv-boolean {
      color: #fc1e70;
    }
    &.jv-function {
      color: #067bca;
    }
    &.jv-number {
      color: #fc1e70;
    }
    &.jv-number-float {
      color: #fc1e70;
    }
    &.jv-number-integer {
      color: #fc1e70;
    }
    &.jv-object {
      color: #111111;
    }
    &.jv-undefined {
      color: #e08331;
    }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }

  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}
</style>
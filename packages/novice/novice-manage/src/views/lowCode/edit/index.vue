<template>
  <layout>
    <template #component>
      <componentSelect @addComponent="onAdd"></componentSelect>
    </template>
    <template #center>
      <div class="flex p-2 border border-dashed rounded mb-2 dark:border-emerald-800">
        <el-button @click="onClear">清除</el-button>
      </div>
      <div class="center-render">
        <el-scrollbar height="100%">
          <center-render class="h-full border border-dashed dark:border-emerald-800 rounded"
                         v-model:dataSource="componentList" />
        </el-scrollbar>
      </div>
    </template>
    <template #option>
      <attributeSetter :dataSource="componentList" />
    </template>
  </layout>
</template>

<script>
import layout from "./layout.vue";
import { getUuid } from "@/modules/utils.ts";
import attributeSetter from "./attributeSetter/index.vue";
import centerRender from "./centerRender/centerRender.vue";
import componentSelect from "./componentSelect/componentSelect.vue";
import { reactive, toRefs } from "vue";

export default {
  name: "lowCode",
  components: { layout, centerRender, attributeSetter, componentSelect },
  data() {
    return {
      componentList: [],
    };
  },
  setup(props, context) {
    const state = reactive({
      drag: false,
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    // 添加
    onAdd(param) {
      // 基础配置
      let defaultOption = {
        id: getUuid(),
        name: param.value,
        label: param.label,
        children: [],
        option: {
          text: param.label,
        },
        action: {},
      };

      this.componentList.push(defaultOption);
    },
    // 清除
    onClear() {
      this.componentList = [];
    },
  },
};
</script>

<style scoped>
.center-render {
  height: calc(100% - 60px);
}
</style>
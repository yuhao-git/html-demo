<template>
  <layout>
    <template #component>
      <el-button v-for="(item) in uiList"
                 :key="item"
                 @click="onAdd(item)">{{item}}</el-button>
    </template>
    <template #center>
      <div class="flex p-2 border border-dashed rounded mb-2 dark:border-emerald-800">
        <el-button @click="onClear">清除</el-button>
      </div>
      <center-render class="h-full"
                     v-model:dataSource="componentList" />
    </template>
    <template #option>
      <attributeSetter :dataSource="componentList" />
    </template>
  </layout>
</template>

<script>
import { reactive, toRefs, defineAsyncComponent } from "vue";
import centerRender from "./centerRender/centerRender.vue";
import layout from "./layout.vue";
import attributeSetter from "./attributeSetter/index.vue";
import { getUuid } from "@/modules/utils.ts";
import uiList from "./modules/uiList";

export default {
  name: "lowCode",
  components: { centerRender, layout, attributeSetter },
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
      defineAsyncComponent,
      uiList,
    };
  },
  methods: {
    // 添加
    onAdd(type) {
      // 生成JSON配置文件，用于生成vue文件和解析
      this.componentList.push({
        id: getUuid(),
        name: type,
        isCustom: false, // 是否自定义
        children: [],
        propsValue: {},
        option: {
          text: type + this.componentList.length,
        },
      });
    },
    onClear() {
      this.componentList = [];
    },
    // 异步添加组件
    onGetComponent(param) {
      // 按需引入自定义组件
      if (param.isCustom) {
        return defineAsyncComponent(() =>
          import(`../../components/lowCode/${param.name}.vue`)
        );
      }
      // 全局注册的组件
      return param.name;
    },
  },
  watch: {},
};
</script>
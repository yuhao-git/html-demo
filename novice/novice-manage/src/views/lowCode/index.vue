<template>
  <section>
    <el-button>hhh</el-button>
    <component v-for="(component,index) in componentList"
               :key="index"
               :propsValue="component.propsValue"
               :is="onGetComponent(component)">
      <div v-html="component.slot"></div>
    </component>
    <component :is="'el-button'"></component>
    <el-button type="primary"
               @click="onAdd">添加</el-button>
    <el-button type="primary"
               @click="onSave">保存</el-button>
  </section>
</template>

<script>
import { reactive, toRefs, onMounted, defineAsyncComponent } from "vue";
import { getUuid } from "@/modules/utils.ts";
export default {
  id: getUuid(),
  name: "lowCode",
  components: {},
  setup() {
    const state = reactive({
      componentList: [],
    });
    onMounted(() => {});
    return {
      ...toRefs(state),
      defineAsyncComponent,
    };
  },
  methods: {
    // 切换组件
    onAdd() {
      this.componentList.push({
        name: "el-button",
        isCustom: false, // 是否自定义
        propsValue: {
          value: "啦啦啦",
        },
        slot: "确认",
        option: {
          text: "按钮",
        },
      });
    },
    // 保存配置
    onSave() {
      let template = `
      <template>
        ${this.componentList
          .map(
            (item) => `<${item.name} :propsValue="propsValue"></${item.name}>`
          )
          .join("\n")} 
      </template>`;

      let script = ``;
      console.log(template);
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
};
</script>
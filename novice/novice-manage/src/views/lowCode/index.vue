<template>
  <section>
    <draggable v-model="componentList"
               group="people"
               @start="drag=true"
               @end="drag=false"
               item-key="id">
      <template #item="{element}">
        <component :propsValue="element.propsValue"
                   :is="onGetComponent(element)">
          {{element.option.text}}
        </component>
      </template>
    </draggable>
    <el-button v-for="(item) in uiList"
               :key="item"
               @click="onAdd(item)">{{item}}</el-button>
    <el-button type="primary"
               @click="onSave">保存</el-button>

  </section>
</template>

<script>
import { reactive, toRefs, defineAsyncComponent } from "vue";
import { getUuid } from "@/modules/utils.ts";
import draggable from "vuedraggable";
import uiList from "./part/uiList";

export default {
  id: getUuid(),
  name: "lowCode",
  components: { draggable },
  setup() {
    const state = reactive({
      componentList: [],
      drag: false,
    });
    return {
      ...toRefs(state),
      defineAsyncComponent,
      uiList,
    };
  },
  methods: {
    // 添加按钮
    onAdd(type) {
      // 生成JSON配置文件，用于生成vue文件和解析
      this.componentList.push({
        name: type,
        isCustom: false, // 是否自定义
        propsValue: {
          value: "啦啦啦",
        },
        option: {
          text: type + this.componentList.length,
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
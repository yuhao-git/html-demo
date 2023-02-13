<template>
  <section>
    <center-render v-model:dataSource="componentList"></center-render>
    <el-button v-for="(item) in uiList"
               :key="item"
               @click="onAdd(item)">{{item}}</el-button>
    <el-button type="primary"
               @click="onSaveIn">添加children</el-button>
    <el-button type="primary"
               @click="onSave">保存</el-button>
    <el-button type="primary"
               @click="onDelete">删除</el-button>
  </section>
</template>

<script>
import { reactive, toRefs, defineAsyncComponent } from "vue";
import centerRender from "./centerRender/centerRender.vue";
import { getUuid } from "@/modules/utils.ts";
import uiList from "./modules/uiList";

export default {
  name: "lowCode",
  components: { centerRender },
  data() {
    return {
      componentList: [
        {
          name: "el-button",
          isCustom: false, // 是否自定义
          propsValue: {},
          eventMap: {
            click: function () {
              console.log(context);
            },
          },
          bindMap: {
            value: "",
          },
          option: {
            text: "哈哈哈",
          },
          children: [
            // {
            //   name: "el-button",
            //   isCustom: false, // 是否自定义
            //   propsValue: {
            //     value: "啦啦啦",
            //   },
            //   option: {
            //     text: "哈哈哈",
            //   },
            // },
          ],
        },
        {
          name: "el-input",
          isCustom: false, // 是否自定义
          propsValue: {},
          eventMap: {
            click: function () {
              console.log("--");
            },
          },
          option: {
            text: "按钮2",
          },
          children: [],
        },
      ],
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
    // 添加按钮
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

      console.log(JSON.stringify(this.componentList, null, 2));
    },
    onSaveIn() {
      this.componentList[0].children.push({
        name: "el-button",
        isCustom: false, // 是否自定义
        propsValue: {},
        children: [],
        option: {
          text: "按钮" + this.componentList.length,
        },
      });
    },
    onDelete() {
      this.componentList.pop();
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
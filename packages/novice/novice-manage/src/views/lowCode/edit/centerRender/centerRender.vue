<template>
  <draggable :list="dataSource"
             group="component"
             class="container"
             animation="300"
             item-key="id">
    <template #item="{ element }">
      <div class="m-1 ">
        <div>{{ element && element.label }}</div>
        <!-- 所有信息使用dataSource传递，各个组件中单独处理 -->
        <component :is="onGetComponent(element)"
                   :dataSource="element">
          <!-- 递归，无限嵌套 -->
          <!-- <center-render :dataSource="element.children"></center-render> -->
        </component>
      </div>
    </template>
  </draggable>
</template>

<script>
import { reactive, toRefs, ref, defineAsyncComponent } from "vue";
import { getUuid } from "@/modules/utils.ts";
import draggable from "vuedraggable";

export default {
  id: getUuid(),
  name: "center-render",
  components: { draggable },
  props: {
    dataSource: {
      type: Array,
    },
  },
  emits: ["update:dataSource"],
  setup(props) {
    const state = reactive({
      drag: false,
      props,
    });

    return {
      ...toRefs(state),
    };
  },
  methods: {
    // 异步添加组件
    onGetComponent(param) {
      // 按需引入自定义组件
      // if (param.isCustom) {
      //   return defineAsyncComponent(() =>
      //     import(`../../../../components/lowCode/${param.name}.vue`)
      //   );
      // }
      // 全局注册的组件
      return param.name;
    },
  },
};
</script>

<style>
.container {
  min-height: 30px;
  min-width: 40px;
  border-color: red;
}
</style>

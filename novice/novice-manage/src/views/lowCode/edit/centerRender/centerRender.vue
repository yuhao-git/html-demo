<template>
  <section>
    <!-- {{tempData}} -->
    <draggable v-model="tempData"
               group="people"
               @start="drag=true"
               @end="drag=false"
               item-key="id">
      <template #item="{element}">
        <component :is="onGetComponent(element)">
          {{element.option.text}}
          <!-- v-on="element.eventMap"
                   v-bind="element.bindMap" -->
          <template v-if="element.children && element.children.length > 0">
            <center-render :dataSource="element.children"></center-render>
          </template>
        </component>
      </template>
    </draggable>
  </section>
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
  computed: {
    tempData: {
      get() {
        return this.props.dataSource;
      },
      set(value) {
        this.$emit("update:dataSource", value);
      },
    },
  },
  methods: {
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
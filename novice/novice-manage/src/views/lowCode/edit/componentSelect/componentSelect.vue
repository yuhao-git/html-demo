<!-- 组件选择 -->
<template>
  <div></div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "",
  setup() {
    const state = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped lang='less'>
</style>
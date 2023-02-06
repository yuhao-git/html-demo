<!-- 预览 -->
<template>
  <div></div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
console.log('??')
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
<template>
  <el-input v-model="text" />
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "NInput",
  setup() {
    const state = reactive({
      text: "",
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped lang='less'>
</style>
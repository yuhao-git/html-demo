<template>
  <div>
    <el-button @click="showShare = true">打开</el-button>
    <el-button @click="showShare = false">关闭</el-button>
    <Drawer :show="showShare"></Drawer>
  </div>
</template>

<script>
import Drawer from "./components/drawer.vue";
export default {
  name: "",
  components: { Drawer },
  data() {
    return {
      showShare: false,
    };
  },
  methods: {
    onClose() {
      this.showShare = false;
    },
  },
};
</script>
<style scoped lang='less'>
</style>
<template>
  <div class="chart">
    <!-- <el-button @click="showShare = true">打开</el-button>
    <el-button @click="showShare = false">关闭</el-button>
    <Drawer :show="showShare"></Drawer>
    <div ref="chart"
         class="chart"></div> -->
    <Model></Model>
  </div>
</template>

<script>
import Drawer from "./components/drawer.vue";
import Model from "./components/model.vue";
export default {
  name: "",
  components: { Drawer, Model },
  data() {
    return {
      showShare: false,
    };
  },
  mounted() {},
  methods: {
    onClose() {
      this.showShare = false;
    },
  },
};
</script>
<style scoped lang='less'>
.chart {
  height: 100%;
  width: 100%;
}
</style>
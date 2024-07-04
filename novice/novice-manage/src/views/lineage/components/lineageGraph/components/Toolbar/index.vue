<template>
  <div class="toolbar-container">
    <el-switch
      v-model="fieldLineageValue"
      size="large"
      active-text="字段"
      inactive-text="表"
      @change="onFieldLineage(fieldLineageValue)"
    />
    
  </div>
</template>

<script>
export default {
  props: ["onFieldLineage"],
  data() {
    return {
      fieldLineageValue: true,
    };
  },
  methods: {},
};
</script>


<style lang="less" scoped>
.toolbar-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}
</style>

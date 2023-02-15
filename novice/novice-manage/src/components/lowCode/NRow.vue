<template>
  <el-row :gutter="10">
    <el-col :span="6" v-for="item in 4" :key="item">
      <div class="border border-dashed rounded h-10 my-2" />
    </el-col>
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
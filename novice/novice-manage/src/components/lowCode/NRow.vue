<template>
  <el-row :gutter="10">
    <el-col :span="12" v-for="item in 2" :key="item" class="border border-dashed rounded my-2">
        <slot></slot>
    </el-col>
  </el-row>
</template>


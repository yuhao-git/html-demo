<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item> <a>promotion detail</a> </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
// 面包屑导航
import { useRouter } from "vue-router";
export default {
  setup() {},
  mounted() {
    const router = useRouter();
    console.log(router.currentRoute.value.meta);
  },
  methods: {},
};
</script>
<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item> <a>promotion detail</a> </el-breadcrumb-item>
  </el-breadcrumb> -->
  <span>{{path}}</span>
</template>

<script lang="ts" setup>
// 面包屑导航
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();

const path = computed(() => router.currentRoute.value.path);
console.log(router.currentRoute.value.matched)
</script>
<template>
  <el-button>
    {{dataSource.option.text}}
  </el-button>
</template>

<script setup>
import { reactive, toRefs, onMounted } from "vue";
const props = defineProps(["dataSource"]);
</script>
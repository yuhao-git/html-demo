<script setup lang="ts">
import { ref } from "vue";
import visTableVue from "../components/visTable/visTable.vue";

const data = ref({
  header: ["列1", "列2", "列3"],
  data: [
    ["行1列1", "行1列2", "行1列3"],
    ["行2列1", "行2列2", "行2列3"],
    ["行3列1", "行3列2", "行3列3"],
    ["行4列1", "行4列2", "行4列3"],
    ["行5列1", "行5列2", "行5列3"],
    ["行6列1", "行6列2", "行6列3"],
    ["行7列1", "行7列2", "行7列3"],
    ["行8列1", "行8列2", "行8列3"],
    ["行9列1", "行9列2", "行9列3"],
    ["行10列1", "行10列2", "行10列3"],
    ["行10列1", "行10列2", "行10列3"],
    ["行10列1", "行10列2", "行10列3"],
    ["行10列1", "行10列2", "行10列3"],
  ],
  // headerBGC: "rgba(19,80,171,0.3)",
  oddRowBGC: "rgba(19,80,171,0.2)",
});
</script>

<template>
  <div class="relative w-100 h-100 overflow-hidden">
    <visTableVue :config="data" /> 
  </div>
</template>

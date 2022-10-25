<template>
  <div class="theme">
    theme
  </div>
  <el-button @click="changeTheme(true)">黑色</el-button>
  <el-button @click="changeTheme(false)">白色</el-button>
</template>

<script lang='ts' setup>
import { reactive, onBeforeMount, onMounted } from "vue";

function changeTheme(black: boolean): void {
  // document.documentElement.style.setProperty("--text-color", "#0000ff");
  if (black) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

const data = reactive({});
onBeforeMount(() => {});
onMounted(() => {});
</script>
<style>
:root {
  --text-color: red;
}

[data-theme="dark"] {
  --background: #383838;
  --font-color: #eeeeee;
}

.theme {
  color: var(--text-color);
  background: var(--background);
  color: var(--font-color);
}
</style>
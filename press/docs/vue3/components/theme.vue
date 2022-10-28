
<template>
  <div class="theme">
    theme
  </div>
  <el-button @click="changeTheme(true)" color="#333">深色</el-button>
  <el-button @click="changeTheme(false)">浅色</el-button>
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
  --text-color: #333;
  --background: #E4E7ED;
}

[data-theme="dark"] {
  --background: #383838;
  --text-color: #F2F3F5;
}

.theme {
  color: var(--text-color);
  background: var(--background);
  color: var(--text-color);
  border: 1px dashed var(--text-color);
}

.theme {
  border-radius: 3px;
  padding: 20px 0;
  margin: 20px 0;
  text-align: center;
}
</style>
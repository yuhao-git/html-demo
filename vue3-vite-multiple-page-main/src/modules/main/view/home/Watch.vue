<script lang="ts" setup>
function changeThemeRed() {
  const el = document.documentElement
// const el = document.getElementById('xxx')

// 获取 css 变量
getComputedStyle(el).getPropertyValue(`--el-color-primary`)

// 设置 css 变量
el.style.setProperty('--primary-color', 'red')
  // document.querySelector(":root").style.setProperty("--primary-color", "#ff0000");
}
function changeThemeBlue() {
  document.querySelector(":root").style.setProperty("--primary-color", "#0000ff");
}
</script>

<template>
  <n-button type="primary"
            @click="changeThemeRed">
    red
  </n-button>
  <n-button type="warning"
            @click="changeThemeBlue">
    blue
  </n-button>
  <div class="card"></div>
</template>

<style scoped>
:root {
  --el-color-primary: green;
}
.card {
  height: 100px;
  width: 200px;
  background: var(--primary-color);
}
</style>

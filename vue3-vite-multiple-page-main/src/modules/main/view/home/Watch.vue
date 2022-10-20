<script lang="ts" setup>
function changeThemeRed() {
  document.querySelector(":root").style.setProperty("--primary-color", "#ff0000");
}
function changeThemeBlue() {
  document.querySelector(":root").style.setProperty("--primary-color", "#0000ff");
}
</script>

<template>
  <div>哈哈哈</div>
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
.card {
  height: 100px;
  width: 200px;
  background: var(--primary-color);
}
</style>

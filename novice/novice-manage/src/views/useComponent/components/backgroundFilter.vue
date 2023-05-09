<template>
  <div class="h-20 relative  border-b border-solid border-gray-200">
    <div class="navbar-wrapper absolute z-1 h-10 w-full"></div>
    <div class="h-20 flex items-center justify-center ">
      被遮挡元素
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped lang='less'>
.navbar-wrapper {
  background-image: radial-gradient(transparent 1px, var(--main-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
</style>
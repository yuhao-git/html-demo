<script lang="ts" setup>
import navbar from './components/navbar/index.vue'
import sidebar from './components/sidebar/index.vue'
</script>


<template>
  <div class="h-full flex">
    <aside class="h-full w-60 flex-none aside">
      <sidebar></sidebar>
    </aside>
    <main class="h-full w-full ">
      <header class="h-12 w-full bordedr-4 flex"><navbar></navbar></header>
      <section class="main-content bg-gray-100 p-4">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<style lang="less" scoped>
.aside{
  position: relative;
  z-index: 2;
}

.main-content {
  height: calc(100% - 48px);
  position: relative;
  z-index: 1;
}
</style>
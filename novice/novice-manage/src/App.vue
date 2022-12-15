<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform"
                mode="out-in">
      <keep-alive :exclude="isCached">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
let isCached = [];
</script>


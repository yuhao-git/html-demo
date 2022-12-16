<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <keep-alive :exclude="isCached">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
let isCached = [];

</script>


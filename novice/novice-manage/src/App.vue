<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <keep-alive :exclude="isCached">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStoreHook } from "@/store/modules/theme";

let isCached: string[] = [];
let themeStore = useThemeStoreHook();
let { isLight } = storeToRefs(themeStore);

onBeforeMount(() => {
  isLight.value = localStorage.getItem("theme");
});
</script>


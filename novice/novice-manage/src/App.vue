<template>
  <div id="teleport"></div>
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

onBeforeMount(() => {
  let isLight = localStorage.getItem("theme") == "dark" ? false : true;
  themeStore.changeTheme(isLight);
});
</script>

<style scoped>
#teleport {
  position: absolute;
}
</style>

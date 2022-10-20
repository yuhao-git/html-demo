<script lang="ts" setup>
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { nextTick, reactive, ref } from "vue-demi";

const themeOverrides: GlobalThemeOverrides = reactive({
  common: {
    primaryColor: "#ff0000",
  },
  Button: {
    textColor: "#ffffff",
  },
});

function changeTheme(): void {
  themeOverrides.common = { primaryColor: "#0000ff" };
}

function resetTheme(): void {
  themeOverrides.common = { primaryColor: "#ff0000" };
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-button type="primary"
              @click="changeTheme">换肤</n-button>
    <n-button type="info"
              @click="resetTheme">重置</n-button>
    <router-view  />
  </n-config-provider>
</template>
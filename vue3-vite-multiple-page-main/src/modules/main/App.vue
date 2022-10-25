<script lang="ts" setup>
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { nextTick, reactive, ref } from "vue-demi";


let color = ref("#ffffff");

const themeOverrides: GlobalThemeOverrides = reactive({
  common: {
    primaryColor: "#ff0000",
  },
  Button: {
    textColor: "#ffffff",
  },
});

function changeTheme(): void {
  themeOverrides.common = { primaryColor: color.value };
}

function resetTheme(): void {
  themeOverrides.common = { primaryColor: "#ff0000" };
}

function buildIt(color) {
  // less.modifyVars可用
  less.modifyVars({
    '@color': color,
  })
    .then(() => {
      console.log(`成功`);
    })
    .catch(() => {
      console.error(`失败`);
    });
}


</script>



<template>
<div class="bg">
  <div class="page">
    喝不喝哇哈哈
  </div>
  <n-button type="primary" @click="buildIt('blue')"> 
  blue
</n-button>
<n-button type="primary" @click="buildIt('red')"> 
  red
</n-button>
</div>

  <!-- <input type="color"
         v-model="color"> -->
  <!-- <n-config-provider :theme-overrides="themeOverrides">
    <n-button type="primary"
              @click="changeTheme">换肤</n-button>
    <n-button type="info"
              @click="resetTheme">重置</n-button>
    <router-view />
  </n-config-provider> -->
</template>

<style lang="less">
.page{
  background: @color;
}

.bg {
  background-color: #333;
  height: 100vh;
  width: 100vw;
}
</style>
<template>
  <div class="shadow-sm flex items-center  w-full justify-between pl-4 pr-4">
    <div class="flex items-center">
      <breadcrumb name="breadcrumb" />
    </div>
    <div>

      <el-button class="mr-4"
                 @click="goBack"
                 type="primary"
                 link> {{username}} </el-button>

      <el-switch inline-prompt
                 v-model="theme"
                 :active-icon="sun"
                 :inactive-icon="moon"
                 @change="changeTheme" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from "vue-router";
import moon from "@/assets/svg/moon.svg";
import sun from "@/assets/svg/sun.svg";
import { ref, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import breadcrumb from "./breadcrumb.vue";
let theme = ref(false);

const router = useRouter();
function goBack() {
  router.replace("/login");
}

// 用户名
// import { storeToRefs } from 'pinia';
// const store = useUserStoreHook();
// const { username } = storeToRefs(store);

// 重置数据
// store.$patch((state) => {
// })

// 替换数据
// store.$state = { counter: 666, name: '张三' }

/** 用户名 */
const username = computed(() => {
  return useUserStoreHook()?.username;
});

function changeTheme(value: boolean) {
  let html = document.querySelector("html");
  let scheme: string = value ? "light" : "dark";
  if (html) {
    html.style.setProperty("color-scheme", scheme);
  }
}
</script>
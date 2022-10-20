<script setup lang="ts">
import { menuRoutes } from "../../router/index";
import HeadeNav from "../../components/HeadeNav.vue";
import { h, ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";

import { NIcon, NSpace, NMenu, NLayout, NLayoutSider } from "naive-ui";
import { BookOutline as BookIcon } from "@vicons/ionicons5";

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const inverted = ref(false);

const menuOptions = menuRoutes.map((item: any, index: number) => {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: item.name,
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => item.meta?.title || "默认标题" }
      ),
    key: item.name + index,
    icon: renderIcon(BookIcon),
  };
});

let router = useRouter();
let route = useRoute();
// setInterval(() => {
//   if (route.path == "/watch") {
//     router.push("/grid");
//   } else {
//     router.push("/watch");
//   }
// }, 2000);

function backToLogin(): void {
  router.push("/login");
}
</script>

<template>
  <heade-nav></heade-nav>
  <n-space vertical
           class="container">
    <n-layout bordered>
      <n-layout has-sider>
        <n-layout-sider bordered
                        show-trigger
                        collapse-mode="width"
                        :collapsed-width="64"
                        :width="240"
                        :native-scrollbar="false"
                        :inverted="inverted">
          <n-menu :inverted="inverted"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="menuOptions" />
        </n-layout-sider>
        <n-layout class="fit">
          <router-view />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>


<style scoped lang="less">
.fit {
  height: calc(100vh - 62px);
}
</style>
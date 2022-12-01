<script >
import navbar from "./components/navbar/index.vue";
import sidebar from "./components/sidebar/index.vue";
import { useMenuStoreHook } from "@/store/modules/menu";
import { storeToRefs } from "pinia";
import { defineComponent, computed } from "vue";

export default defineComponent({
  components: { navbar, sidebar },
  setup() {
    const menuStoreHook = useMenuStoreHook();
    let { collapsed } = storeToRefs(menuStoreHook);

    return {
      collapsed,
    };
  },
});
</script>


<template>
  <div class="h-full flex">
    <aside class="h-full flex-none aside duration-300 w-60 overflow-x-hidden overflow-y-auto ease-in-out">
      <!-- :class="[collapsed?'aside-collapsed':'w-60']"> -->
      <sidebar></sidebar>
    </aside>
    <main class="h-full w-full ">
      <header class="h-12 w-full bordedr-4 flex">
        <navbar></navbar>
      </header>
      <section class="main-content bg-gray-100 p-4">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>
<style lang="less" scoped>
.aside {
  position: relative;
  z-index: 2;
}

.aside-collapsed {
  width: 80px;
}

.main-content {
  height: calc(100% - 48px);
  position: relative;
  z-index: 1;
}
</style>
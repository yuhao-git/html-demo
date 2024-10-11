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
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
</script>

<template>
  <div class="h-full flex relative">
    <aside class="h-full flex-none aside overflow-visible"
           :class="[collapsed  ?  'aside-collapsed'  :  'aside-expend']">
      <sidebar></sidebar>
    </aside>
    <main class="h-full w-full ">
      <header class="header h-12 w-full bordedr-4 flex">
        <navbar></navbar>
      </header>
      <section class="main-content  p-4">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade-transform"
                      mode="out-in"> -->
          <keep-alive :include="[]">
            <component key="keep"
                       :is="Component" />
          </keep-alive>
          <!-- </transition> -->
        </router-view>
      </section>
    </main>
  </div>
</template>

<style lang="less" scoped>
.aside {
  position: relative;
  z-index: 2;
  transition: width 0.3s ease-in-out;
  border-right: 1px solid var(--split-border-color);
}

.header {
  border-bottom: 1px solid var(--split-border-color);
}

.aside-collapsed {
  width: 80px;
}

.aside-expend {
  width: 224px;
}

.main-content {
  height: calc(100% - 48px);
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  background-color: var(--main-bg-color);
}

.collapse-icon {
  right: 0;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active {
  transition: all 0.3s;
}

.breadcrumb-leave-active {
  transition: all 0.2s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
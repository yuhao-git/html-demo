<script setup lang="ts">
import { shallowRef, onMounted, ref } from "vue";
import { markRaw } from "vue";

// 使用 import.meta.glob 自动引入 ./views 目录下的所有 .vue 文件
const viewsModules = import.meta.glob("./views/*.vue");

// 存储引入的组件
const components = shallowRef({});

// 动态引入组件
const loadComponents = async () => {
  const loadedComponents: Record<string, any> = {};
  for (const path in viewsModules) {
    const componentConfig = await viewsModules[path]();
    const componentName = path.replace(/^\.\/views\/(.*)\.vue$/, "$1");
    loadedComponents[componentName] = markRaw(
      componentConfig.default || componentConfig
    );
  }
  components.value = loadedComponents;
};

// 在组件挂载时加载组件
onMounted(() => {
  loadComponents();
});

const active = ref("");
function handleSelect(index: string) {
  active.value = index;
}
</script>

<template>
  <!-- <div class="w-full overflow-x-hidden">
    
  </div> -->
  <div class="w-full flex h-full">
    <el-menu class="h-full" @select="handleSelect">
      <el-menu-item
        v-for="(component, name) in components"
        :key="name"
        :index="name"
      >
        <span>{{ name }}</span>
      </el-menu-item>
    </el-menu>
    <div class="flex-1 h-full overflow-auto">
      <component :is="components[active]" />
    </div>
  </div>
</template>


<template>
  <div>
    <el-button-group>
      <el-button
        v-for="(_, name) in components"
        :key="name"
        @click="currentComponent = name"
        :class="['mb-4', { active: currentComponent === name }]"
      >
        {{ `组件${name.replace('demo', '')}` }}
      </el-button>
    </el-button-group>

    <!-- 动态组件切换 -->
    <component :is="components[currentComponent]" />
  </div>
</template>

<script setup>
import demo1 from "./demo1.vue";
import demo2 from "./demo2.vue";
import demo3 from "./demo3.vue";
import demo4 from "./demo4.vue";
import { ref, reactive } from "vue";

// 当前显示的组件名称
const currentComponent = ref("demo1");

// 组件映射表
const components = {
  demo1,
  demo2,
  demo3,
  demo4,
};
</script>

<style scoped>
.active {
  color: #409eff;
}
</style>

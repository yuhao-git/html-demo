<template>
  <div class="flex h-full overflow-hidden">
    <section class="w-1/4 bg-white dark:bg-black border p-2  rounded dark:border-emerald-800 h-full">
      <slot name="component"></slot>
    </section>
    <section class="xl:w-1/2 w-3/4 bg-white dark:bg-black p-2 xl:mx-2 ml-2 border rounded dark:border-emerald-800 h-full">
      <slot name="center"></slot>
    </section>
    <section class="w-1/4 h-full bg-white dark:bg-black hidden xl:block dark:border-emerald-800 border rounded overflow-auto max-h-full ">
      <slot name="option"></slot>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
/**
 * 数据部分
 */
const state = reactive({});
onMounted(() => {});
watchEffect(() => {});
</script>


<style lang="less" scoped>

</style>
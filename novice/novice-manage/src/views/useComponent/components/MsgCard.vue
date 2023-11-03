<template>
  <div class="flex "
       :class="[{'justify-end':isMyself}]">
    <div class="p-2 pl-0 w-fit flex">
      <div v-if="!isMyself"
           class="w-10 flex-none text-white h-10 text-xs rounded-full mr-2 flex items-center justify-center"
           :class="[isMyself ? 'bg-green-400' : 'bg-gray-400']">
        {{props.params.userId}}
      </div>
      <div>
        <div class="text-sm text-gray-400">{{props.params.date}}</div>
        <div class="rounded p-2 pl-3 pr-3"
             :class="[isMyself ? 'bg-green-200' : 'bg-gray-200']">{{props.params.msg}}</div>
      </div>
      <div v-if="isMyself"
           class="w-10 flex-none text-white h-10 text-xs rounded-full ml-2 flex items-center justify-center"
           :class="[isMyself ? 'bg-green-400' : 'bg-gray-400']">
        {{props.params.userId}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
let props = defineProps({ params: {}, currentUserId: "" });
let isMyself = computed(() => props.currentUserId == props.params.userId);
</script>
<style scoped lang='less'>
</style>
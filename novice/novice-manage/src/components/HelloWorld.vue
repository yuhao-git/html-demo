<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    点击次数 <button @click="count +=1 ">{{count}}</button>
  </div>
</template>


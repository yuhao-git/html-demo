<script lang="ts" setup>
import { defineComponent } from "vue";
</script>


<template>
  <div class="h-full flex">
    <aside class="h-full w-80">aside</aside>
    <main class="h-full">
      <header class="h-20">header</header>
      <section class="">
        section
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()

const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})
</script>

<template>
  <main class="absolute left-0 h-full w-full overflow-y-auto " :class="{ 'pt-54': !display, 'pb-56': display }">
    <slot />
  </main>
</template>

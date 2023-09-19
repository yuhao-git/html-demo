<template>
  <div > 测试 </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, onActivated } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

onMounted(()=>{
  console.log('mounted')
})

onActivated( ()=>{
  console.log('activated')
})


</script>
<style scoped lang='less'>
</style>
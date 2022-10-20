<template>
  <div class="nav-container">
    <div></div>
    <div class="nav-button">
      <n-button strong
                secondary
                @click="jumpPage('/login')">
        退出登录
      </n-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue";

import { useRoute, useRouter } from "vue-router";

let router = useRouter();
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});

function jumpPage(url: string): void {
  router.push(url);
}
</script>
<style scoped lang='less'>
.nav-container {
  height: 60px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
//   padding: 0 20px;

  display: grid;
  grid-template-columns: auto auto;
//   grid-gap: 20px;
  align-content: center;
}


</style>
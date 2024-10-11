<template>
  <div class="nav-container">
    <div class="logo">
      <img :src="logoUrl" >
    </div>
    <div class="nav-button">
      <n-space>
      <n-switch v-model:value="active" />
      <span>{{  user.name  }}</span>
      <n-icon size="12">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" fill="currentColor"></path></svg></n-icon>
     
    </n-space>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import logoUrl from '@/modules/main/assets/img/logo.png'


let user = reactive({
  name: "猫吃鱼",
})

let active = ref(false)


let router = useRouter();


function jumpPage(url: string): void {
  router.push(url);
}

function changeTheme(){
  
}
</script>



<style scoped lang='less'>
.nav-container {
  height: 60px;
  width: 100%;
  // background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  // background-image: url(@/modules/main/assets/img/logo.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  color: #333;

  >img {
    display: block;
    height: 40px;
  }
}

.nav-button{
  // display: flex;
  // align-items: center;
}
</style>
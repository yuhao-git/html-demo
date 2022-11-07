<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sun from '@/assets/svg/sun.svg'
import moon from '@/assets/svg/moon.svg'

const router = useRouter()

let theme = ref(true)

function changeTheme(value: boolean) {
  let html = document.querySelector('html')
  let scheme: string = value ? 'light' : 'dark';
  if (html) {
    html.style.setProperty("color-scheme", scheme)
  }
}

</script>

<template>
  <div class="login-container">
    <header class="navbar" > 
        <el-switch inline-prompt  v-model="theme" :active-icon="sun" :inactive-icon="moon"  @change="changeTheme"/>
    </header>
    <div class="flex justify-center items-center">
      <div class="flex-grow justify-center border-4 border-light-blue-500">左侧图片</div>
      <div class="form-wrapper justify-center border-4 border-red-500">表单</div>
    </div>
 </div>
</template>

<style scoped lang='less'>
.login-container{
  height: 100%;
  .navbar {
  position: absolute;
  right: 16px;
  top: 10px;
}
}

.flex{
  height: 100%;
  .form-wrapper{
    width: 500px;
  }
}
</style>


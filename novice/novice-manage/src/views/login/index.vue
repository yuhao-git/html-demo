<template>
  <header class="navbar" > 
      <el-switch inline-prompt  v-model="theme" :active-icon="sun" :inactive-icon="moon"  @change="changeTheme"/>
  </header>
  <div>
    <div class="text-9xl">左侧图片</div>
    <div>表单</div>
  </div>
</template>

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



<style scoped lang='less'>
.navbar {
  position: absolute;
  right: 16px;
  top: 10px;
}
</style>


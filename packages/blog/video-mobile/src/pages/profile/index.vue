<template>
  <Container class="p-20">
    <div v-if="userStore.userInfo.username">
      <p>当前用户：{{ userStore.userInfo.username }}</p>
      <var-button @click="logout" block type="primary">退出登录</var-button>
      <var-button @click="shutdownSystem" mt-14 block>关机<var-icon name="power" /></var-button>
    </div>
    <div v-else>
      <h1>我的页面</h1>
      <p>欢迎使用</p>
      <var-button @click="goToLogin" type="primary" block>去登录<var-icon name="chevron-right" /></var-button>
    </div>
    
  </Container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { shutdownSystem } from '@/api/system'
definePage({
  name: 'profile',
  meta: {
    level: 1,
  },
})

const router = useRouter()
const userStore = useUserStore()



function goToLogin() {
  router.push({ name: 'login' })
}

function logout() {
  userStore.token = ''
  userStore.userInfo = {}
  localStorage.removeItem(STORAGE_TOKEN_KEY)
  // router.push({ name: 'login' })
}

function shutdown() {
  shutdownSystem()
}
</script>

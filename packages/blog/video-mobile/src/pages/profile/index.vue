<template>
  <Container class="p-20">
    <template v-if="userInfo.username">
      <div>
        <var-paper radius="10" class="flex shadow-md items-center  p-16 rounded-3xl mb-20">
          <div class="h-72 w-72 overflow-hidden mr-15">
            <var-uploader hide-list v-model="files" @after-read="uploadUserAvatar">
              <div class="h-72 w-72 border-2 rounded-full"
                :style="{ background: `url(${apiBaseUrl}/image/${userInfo.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
                v-if="userInfo.avatar">
              </div>
              <var-avatar v-else :size="72">
                <div class="flex items-center justify-center w-full h-full"> {{ userInfo.nickname.charAt(0) }}
                </div>
              </var-avatar>
            </var-uploader>
          </div>
          <div>

            <div class="mb-8 text-20 font-bold font-mono"> {{ userInfo.nickname }}</div>
            <div class="mb-2 text-14 text-gray-500 font-sans">用户: {{ userInfo.username }}</div>
            <div class="mb-2 text-14 text-gray-500 font-sans">邮箱: {{ userInfo.email }}</div>
          </div>
        </var-paper>
        <var-paper mb-15 radius="10" shadow-md>
          <var-cell ripple border @click="toggle">
            {{ t('home.darkMode') }}
            <template #extra>
              <var-switch @click.stop v-model="checked" />
            </template>
          </var-cell>

          <var-cell ripple border @click="languagePicker">
            {{ t('home.language') }}
            <template #extra>
              <div class="w-80 flex items-center justify-right">
                <span>{{ language }}</span>
                <var-icon name="chevron-right" />
              </div>
            </template>
          </var-cell>


        </var-paper>
        <var-button @click="logout" block type="primary">退出登录</var-button>
        <var-button @click="shutdownSystem" mt-14 block>关机<var-icon name="power" /></var-button>
      </div>
    </template>
    <div v-else>
      <h1>欢迎使用</h1>
      <p>登录解锁更多功能</p>
      <var-button @click="goToLogin" type="primary" block>去登录<var-icon name="chevron-right" /></var-button>
      <var-button @click="goToRegister" mt-14 block>去注册<var-icon name="chevron-right" /></var-button>
    </div>

  </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import useAppStore from '@/stores/modules/app'
import { shutdownSystem } from '@/api/system'
import { languageColumns, locale } from '@/utils/i18n'
const appStore = useAppStore()
const language = computed(() => languageColumns.find(l => l.value === locale.value).text)
import { uploadAvatar } from '@/api/profile'
const files = ref<File[]>([])

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL_VIDEO

definePage({
  name: 'profile',
  meta: {
    level: 1,
  },
})

const { t } = useI18n()

const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => { checked.value = newMode },
  { immediate: true }
)


function goToLogin() {
  router.push({ name: 'login' })
}

function goToRegister() {
  router.push({ name: 'register' })
}

function logout() {
  userStore.token = ''
  userStore.userInfo = {}
}

function toggle() {
  toggleDark()
  appStore.switchMode(isDark.value ? 'dark' : 'light')
}

async function languagePicker() {
  await Picker({
    modelValue: [locale.value],
    toolbar: true,
    columns: [
      languageColumns,
    ],
    onConfirm(values) {
      if (locale.value === values[0])
        return
      locale.value = values[0] as string
    },
  })
}

/**
 * 上传头像
 */
function uploadUserAvatar() {
  const formData = new FormData();
  formData.append('avatar', files.value[0].file);
  formData.append('userId', userStore.userInfo.id);
  formData.append('filename', files.value[0].name);
  uploadAvatar(formData).then(res => {
    userStore.userInfo.avatar = res.data.avatar
    files.value = []
  })
}
</script>

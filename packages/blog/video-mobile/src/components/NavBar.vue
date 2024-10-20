<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'

const language = computed(() => locale.value)
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)
const show = ref(false)
function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

watch(
  () => isDark.value,
  (newMode) => { checked.value = newMode },
  { immediate: true }
)


const { t } = useI18n()

const title = computed(() => {
  if (!route.meta)
    return ''
  return route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
})

/**
 * 换肤
 */
function toggle() {
  toggleDark()
  appStore.switchMode(isDark.value ? 'dark' : 'light')
}

/**
 * 语言
 */
function languagePicker(value) {
  show.value = false;
  if (locale.value === value)
    return
  locale.value = value as string
}

</script>

<template>
  <var-app-bar z-20 v-if="title" :title="title" :fixed="true" :safe-area-top="true">
    <template #left>
      <var-button color="transparent" text-color="#fff" round text @click="onBack">
        <var-icon name="chevron-left" :size="24" />
      </var-button>
    </template>
    <template #right>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="white-balance-sunny" v-if="checked" @click="toggle" />
        <var-icon name="weather-night" @click="toggle" v-else />
      </var-button>
      <var-button round text color="transparent" text-color="#fff">
        <var-menu placement='bottom-end' v-model:show="show">
          <var-icon name="translate" />
          <var-icon name="chevron-down" />
          <template #menu offset-y="20">
            <var-cell v-for="(item, index) in languageColumns" :key="index" @click="languagePicker(item.value)"
              :class="{ 'active': language == item.value }">
              {{ item.text }}</var-cell>
          </template>
        </var-menu>
      </var-button>
    </template>
  </var-app-bar>
</template>

<style lang="less" scoped>
.active {
  background-color: #EEF5FE;
  color: #4A79F5;
}
</style>
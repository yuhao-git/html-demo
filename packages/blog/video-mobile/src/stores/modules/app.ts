import { defineStore } from 'pinia'
import { darkTheme } from '@/styles/dark'
import { lightTheme } from '@/styles/light'

export interface AppStore {
  switchMode: (val: string) => void
  setTabBarActive: (val: string) => void
  setLoading: (val: boolean) => void
}

const prefersDark
  = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches

const locaApp = localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : ''

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref(theme)
  const loading = ref(false)

  const switchMode = (val: string) => {
    const rootStyleVars = val === 'light' ? lightTheme : darkTheme
    StyleProvider(rootStyleVars)

    mode.value = val
  }

  const tabBarActive = ref(locaApp.tabBarActive || '/')

  const setTabBarActive = (val: string) => {
    tabBarActive.value = val
  }

  const setLoading = (val: boolean) => {
    loading.value = val
  }

  return {
    mode,
    switchMode,
    tabBarActive,
    setTabBarActive,
    loading,
    setLoading,
  }
}, {
  persist: true,
})

export default useAppStore

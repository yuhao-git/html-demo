
import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: true,
})
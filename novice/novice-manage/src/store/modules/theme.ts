/**
 * 主题 夜间模式/自定义颜色
 */
import { store } from "@/store";
import { defineStore } from "pinia";


export const useThemeStore = defineStore({
  state: () => ({
    theme: ""
  }),
  getters: {

  }
})


export function useThemeStoreHook() {
  return themeStore(store);
}

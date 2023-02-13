/**
 * 主题 夜间模式/自定义颜色
 */
import { store } from "@/store";
import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    isLight: true,
  }),
  actions: {
    changeTheme(value: boolean) {
      this.isLight = value;
      let html = document.querySelector("html");
      let scheme: string = this.isLight ? "light" : "dark";
      localStorage.setItem('theme', scheme)
      html?.style.setProperty("color-scheme", scheme);
      this.isLight
        ? html?.classList.remove("dark")
        : html?.classList.add("dark");
    },
  },
});

export function useThemeStoreHook() {
  return useThemeStore(store);
}

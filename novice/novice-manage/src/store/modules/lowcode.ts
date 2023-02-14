import { defineStore } from "pinia";
import { store } from "@/store";

export const useLowcodeStore = defineStore({
  id: "lowcode",
  state: () => ({
    // 组件列表
    // 配置列表
  }),
  actions: {
  },
});

export function useLowcodeStoreHook() {
  return useLowcodeStore(store);
}

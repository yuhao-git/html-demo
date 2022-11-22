import { defineStore } from "pinia";
import { store } from "@/store";

export const useUserStore = defineStore({
  id: "menu",
  state: () => ({
    // 选中菜单
    activeMenu: "",
  }),
  actions: {
    setActiveMenuId(menu: string) {
      this.activeMenu = menu
    }
  },
  // getters: {
  //   getAddAge: (state) => {
  //     return state.age + 100;
  //   },
  // },
});

export function useUserStoreHook() {
  return useUserStore(store);
}

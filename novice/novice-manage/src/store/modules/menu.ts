import { defineStore } from "pinia";
import { store } from "@/store";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    activeMenu: "",   // 选中菜单
    collapsed: true, // 折叠
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

export function useMenuStoreHook() {
  return useMenuStore(store);
}

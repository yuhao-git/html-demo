import { defineStore } from "pinia";
import { store } from "@/store";

export const useMenuStoreHook = defineStore({
  id: "menu",
  persist: true, // 开启持久化 依赖于 piniaPluginPersistedstate
  state: () => ({
    activeMenu: "",   // 选中菜单
    collapsed: false, // 折叠
  }),
  actions: {
    setActiveMenuId(menu: string) {
      this.activeMenu = menu
    }
  },
});

// export function useMenuStoreHook() {
//   return useMenuStore(store);
// }

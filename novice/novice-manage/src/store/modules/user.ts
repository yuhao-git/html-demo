import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";

export const useUserStore = defineStore({
  id: "novice-user",
  state: (): userType => ({
    // 用户名
    username:"noviceUser",
    // 页面级别权限
    roles: [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0
  }),
  actions: {
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

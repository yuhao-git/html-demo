import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: "/virtual-table",
    name: "VirtualTable",
    meta: {
      title: "表格"
    },
    component: () => import("main/view/home/VirtualTable.vue"),
  },
  {
    path: "/test",
    name: "Test",
    meta: {
      title: "表格"
    },
    component: () => import("main/view/home/Test.vue"),
  },
  {
    path: "/vue-use",
    name: "VueUse",
    meta: {
      title: "vueuse"
    },
    component: () => import("@/components/VueUse.vue"),
  },
  {
    path: "/grid",
    name: "Grid",
    meta: {
      title: "布局"
    },
    component: () => import("main/view/home/Grid.vue"),
  },
  {
    path: "/three",
    name: "Three",
    meta: {
      title: "三维图形"
    },
    component: () => import("main/view/home/ThreeScene.vue"),
  },
  {
    path: "/watch",
    name: "Watch",
    meta: {
      title: "监听"
    },
    component: () => import("main/view/home/Watch.vue"),
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("main/view/login/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("main/view/home/Home.vue"),
    children: [...menuRoutes],
  },
];


const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createWebHistory(),
  routes,
});



export default router;

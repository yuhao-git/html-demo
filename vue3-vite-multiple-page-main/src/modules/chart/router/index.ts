import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/chart",
    name: "chart",
    component: () => import("main/view/chart/chart.vue"),
  },
];


const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createWebHistory(),
  routes,
});



export default router;

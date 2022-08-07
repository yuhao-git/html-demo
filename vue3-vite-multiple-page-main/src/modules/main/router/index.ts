import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";


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
    children: [
      {
        path: "/virtual-table",
        name: "VirtualTable",
        component: () => import("main/view/home/VirtualTable.vue"),
      },
      {
        path: "/test",
        name: "Test",
        component: () => import("main/view/home/Test.vue"),
      },
      {
        path: "/vue-use",
        name: "VueUse",
        component: () => import("@/components/VueUse.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createWebHistory(),
  routes,
});




let arr:Array<string|number> ;
let arr2:(number|string|object)[] ;

arr = [11,2,2,3]
arr2 = [{name:"小王"}]
console.log(arr, arr2)


interface intr {
  name:  string,
  age: number
}

let arr3:intr[] = []

arr3 = []
console.log(arr3)

export default router;

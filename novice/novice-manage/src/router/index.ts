import {
  createRouter,
  createWebHashHistory
} from "vue-router";

import login from '../views/login/index.vue'
import layout from "../layout/index.vue"
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  { path: "/404", component: () => import('../views/error/404.vue') },
  { path: "/:pathMatch(.*)", redirect: "/404" },
  {
    path: "/", component: layout, children: [
      { path: "/card", component: () => import('@/views/cardDesign/index.vue') },
      { path: "/dashboard", component: () => import('@/views/dashboard/index.vue') },
    ]
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
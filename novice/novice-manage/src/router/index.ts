import {
  createRouter,
  createWebHashHistory
} from "vue-router";

import login from '../views/login/index.vue'

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  { path: "/404", component: () => import('../views/error/404.vue') },
  { path: "/:pathMatch(.*)", redirect: "/404" },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
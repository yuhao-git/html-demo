import {
  createRouter,
  createWebHashHistory
} from "vue-router";



const routes = [
  { path: "/login", component: () => import('../views/login/index.vue') },
  { path: "/404", component: () => import('../views/error/404.vue') },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
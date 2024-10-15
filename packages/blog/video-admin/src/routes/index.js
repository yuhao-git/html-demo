import { createMemoryHistory, createRouter } from 'vue-router'

import login from '../views/login.vue'
import page404 from '../views/404.vue'

const routes = [
  { path: '/', component: login },
  { path: '/404', component: page404 },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
import {createRouter, createWebHashHistory} from 'vue-router'
/**
 * 异常路由
 */
import ExceptionRoutes from '@/router/exception'

/**
 * 定义路由信息
 * @type {{}[]}
 */
const routes = [{
    name: '_index',
    path: '/',
    redirect: '/index'
},{
    name: 'login',
    path: '/login',
    component: () => import("../views/login/Login.vue"),
    meta: {}
}, {
    name: 'forgetPwd',
    path: '/forgetPwd',
    component: () => import("../views/login/ForgetPwd.vue"),
    meta: {}
}, {
    name: 'index',
    path: '/index',
    component: () => import("../views/index/Index.vue"),
    meta: {}
}, {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import("../views/dashboard/Dashboard.vue"),
    meta: {}
}, ...ExceptionRoutes]
/**
 * 创建路由，存在history和hash模式
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
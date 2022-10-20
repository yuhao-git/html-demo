/**
 * 异常路由信息
 */
export default [{
    name: '404',
    path: '/404',
    component: () => import('@/components/exception/404.vue')
},{
    name: '500',
    path: '/500',
    component: () => import('@/components/exception/500.vue')
}]
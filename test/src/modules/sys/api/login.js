import http from '@/utils/http'

/**
 * 用户登录
 * @param params
 */
export function login(params) {
    return http({
        method: 'POST',
        url: '/login',
        data: params
    })
}

/**
 * 退出登录
 * @param params
 */
export function logout() {
    return http({
        method: 'POST',
        url: '/logout'
    })
}
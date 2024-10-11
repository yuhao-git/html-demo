import request from '@/utils/request'
import type { Login } from "./typing"

export async function login(data: Login): Promise<any> {
    return request({ url: '/admin/user/login', method: "post", data })
}
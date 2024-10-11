import request from '@/utils/request'

export async function shutdownSystem(): Promise<any> {
    return request({ url: '/admin/system/shutdown', method: "post" })
}

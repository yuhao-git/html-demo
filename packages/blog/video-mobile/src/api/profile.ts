import request from '@/utils/request'

/**
 * 上传头像
 */
export const uploadAvatar = (data: any) => request.post('/image/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })

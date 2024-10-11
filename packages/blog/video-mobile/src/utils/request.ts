import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Snackbar } from '@varlet/ui'
import '@varlet/ui/es/style'
import useAppStore from "@/stores/modules/app"
import { localStorage } from '@/utils/local-storage'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
const appStore = useAppStore()
let count = 0;
// 这是用于设置请求后端的Token KEY。
// 根据自己的需求，可以修改为Access-Token，Authorization等。
// 请注意，尽量使用横线 `-` 作为分隔符。
// 避免因负载均衡器如nginx而丢弃自定义请求头。
export const REQUEST_TOKEN_KEY = 'Authorization'

// 创建一个axios实例
const request = axios.create({
  // API默认前缀
  // method: 'post',
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 60 * 1000 * 10, // 请求超时时间
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  console.log(error)
  let message = error.message
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      message = (data && data.message) || statusText
      // 如果需要直接跳转到登录页面
      location.replace('login')
      appStore.setTabBarActive('profile')
    }
    // 401 未登录/未授权
    else if (status === 401 && data.result && data.result.isLogin) {
      message = '授权验证失败'
    }
    else {
      message = (data && data.message) || statusText
    }
  }
  else {
    message = error.message
  }
  count--;
  appStore.setLoading(count > 0);
  if (Array.isArray(message)) {
    message = message.join(', ');
  }
  Snackbar({ type: 'warning', content: message })
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  count++;
  appStore.setLoading(true);
  const savedToken = localStorage.get(STORAGE_TOKEN_KEY)
  // 如果token存在
  // 让每个请求都携带一个自定义的token，请根据实际情况修改。
  if (savedToken) {
    config.headers[REQUEST_TOKEN_KEY] = savedToken
  }
  return config
}

// 添加请求拦截器
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: any }) {
  count--;
  appStore.setLoading(count > 0);
  return response.data
}

// 添加响应拦截器
request.interceptors.response.use(responseHandler, errorHandler)

export default request

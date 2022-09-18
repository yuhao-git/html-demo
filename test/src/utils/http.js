import axios from 'axios'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import {message} from 'ant-design-vue';
import qs from 'qs'
import {useStorage  } from '@vueuse/core'
import {CSRF_TOKEN_CACHE_KEY} from "../config/config";
const csrfStorage = useStorage(CSRF_TOKEN_CACHE_KEY, {}, sessionStorage)
/**
 * 显示加载框
 */
function showLoading() {
    NProgress.start();
}
/**
 * 隐藏加载框
 */
function hideLoading() {
    NProgress.done();
}
//超时时间
axios.defaults.timeout = 300000
//是否携带cookie
axios.defaults.withCredentials = true;
//以form形式提交
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const {apiUrl} = APP_INFO

axios.interceptors.request.use(function(config){
    showLoading()
    if (config.data && !(config.data instanceof FormData)) {
        config.data = qs.stringify(config.data);
        //以form形式提交
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    if (csrfStorage.value.name) {
        config.headers[csrfStorage.value.name] = csrfStorage.value.value
    }
    config.baseURL = apiUrl
    return config;
}, function(error){
    hideLoading()
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    hideLoading()
    const res = response.data;
    if (res.code !== '1') {
        //处理失败情况
        const {code} = res.error
        if (code == 'nologin') { //未登录
            const route = useRoute()
            top.location.href = '/#/login'
            // route.replace({path: '/login', query: {state: 'invalid'}})
        } else if (code == 'noauth') { //无操作权限
            message.success(res.msg)
        } else if (code == '404') { //未找到页面
            route.replace('/404')
        } else if (code == 'busauth') { //需要鉴权
            message.success(res.msg)
        } else {
            if (res.msg) {
                message.error(res.msg)
            }
        }
        return Promise.reject(res.data);
    }
    return res.data;
}, error => {
    hideLoading()
    if (error && error.response) {
        const status = error.response.status
        if (status == 503) {
            message.info('您操作太快了，请休息一会')
        } else {
            message.error('服务不可用,请稍后尝试[' + error + ']', 2);
        }
    } else {
        message.error('服务不可用,请稍后尝试[' + error + ']', 2);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;
import {ref, toRaw, nextTick} from 'vue'
import {useRouter} from 'vue-router'
import useAnimate from '@/composables/useAnimate'
import {message} from 'ant-design-vue'
import {usePermissionStore} from "@/store/permission";
import {encryptByAES} from "../../../../utils/crypto";

const permissionStore = usePermissionStore()

/**
 * 登录混合式API
 * @param validate
 *      表单验证方法
 * @param modelRef
 *      表单模型
 * @returns {{onLogin: onLogin, loginText: *, loginLoading: *, loginBtnRef: *}}
 */
export default function useLogin(validate, modelRef) {
    const loginLoading = ref(false)
    const loginNormalText = '登录'
    const loginLoadingText = '登录中...'
    const loginText = ref(loginNormalText)
    const router = useRouter()
    const loginBtnRef = ref(undefined)
    const { animateCss } = useAnimate()
    const onLogin = (errCallback) => {
        validate().then(() => {
            //执行登录API
            const params = {...toRaw(modelRef)}
            loginLoading.value = true
            loginText.value = loginLoadingText
            params.loginId = encryptByAES(params.loginId)
            params.password = encryptByAES(params.password)
            permissionStore.login(params).then(() => {
                message.success('登录成功')
                router.push('/index')
            }).catch(() => {
                loginLoading.value = false
                loginText.value = loginNormalText
                nextTick(() => animateCss(loginBtnRef, 'shakeX'))
                if (errCallback) {
                    errCallback()
                }
            })
        }).catch(() => {
            animateCss(loginBtnRef, 'shakeX')
        })
    }
    return {
        loginBtnRef,
        loginLoading,
        loginText,
        onLogin
    }
}
import {ref} from 'vue'
/**
 * 验证码混合式API
 */
export default function useSmsCode() {

    const smsBtnLoading = ref(false)
    const smsBtnNormalText = '获取验证码？'
    const smsBtnText = ref(smsBtnNormalText)

    const fetchSmsCode = () => {
        let timer = 60
        smsBtnLoading.value = true
        smsBtnText.value =`还剩(${timer})秒`
        const timerId = setInterval(() => {
            timer--
            if (timer == 0) {
                clearInterval(timerId)
                smsBtnLoading.value = false
                smsBtnText.value = smsBtnNormalText
            } else {
                smsBtnText.value =`还剩(${timer})秒`
            }
        }, 1000)
    }

    return {
        smsBtnLoading,
        smsBtnText,
        fetchSmsCode
    }
}
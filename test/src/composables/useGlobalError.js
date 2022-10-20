/**
 * 全局错误拦截器
 * @returns {{onError: onError}}
 */
export default function useGlobalError() {
    const onError = (error) => {
        console.log(error)
    }
    return {
        onError
    }
}
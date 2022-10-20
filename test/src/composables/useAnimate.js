import {isRef} from 'vue'
/**
 * 动画组合式API
 */
export default function useAnimate() {
    /**
     * 增加动画
     * @param element
     *      html元素，也可以是vue ref
     * @param animation
     *      动画样式，可以查看https://animate.style/
     * @param prefix
     *      动画css前缀
     * @returns {Promise<any>}
     */
    const animateCss = (element, animation, prefix = 'animate__') =>
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`
            const node = isRef(element) ? element.value.$el: document.querySelector(element)
            node.classList.add(`${prefix}animated`, animationName)
            function handleAnimationEnd(event) {
                event.stopPropagation()
                node.classList.remove(`${prefix}animated`, animationName)
                node.removeEventListener('animationend', handleAnimationEnd)
                resolve()
            }
            node.addEventListener('animationend', handleAnimationEnd, {once: true})
        });
    return {
        animateCss
    }
}
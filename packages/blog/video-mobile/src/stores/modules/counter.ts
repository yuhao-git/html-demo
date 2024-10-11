import { defineStore } from 'pinia' // 引入 Pinia 的 defineStore 函数

// 定义一个名为 'counter' 的 Pinia 存储
const useCounterStore = defineStore('counter',
  () => {
    // 使用 ref 创建一个可响应的变量 counter，初始值为 0
    const counter = ref(0)

    // 定义一个方法 increment，用于增加 counter 的值
    const increment = () => {
      counter.value++
    }

    // 返回一个对象，包含 counter 和 increment 方法
    return {
      counter,
      increment,
    }
  },
  {
    // 配置 Pinia 存储，使其能够持久化
    persist: true,
  })

// 导出 useCounterStore，用于在其他组件中使用
export default useCounterStore

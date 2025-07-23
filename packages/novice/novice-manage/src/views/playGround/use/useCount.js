import { ref } from 'vue'
function useCount() {
  const count = ref(0)
  function increase() {
    count.value++
  }
  function decrease() {
    count.value--
  }
  return { count, increase, decrease }
}

export default useCount
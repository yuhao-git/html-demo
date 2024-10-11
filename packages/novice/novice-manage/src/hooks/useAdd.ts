import { ref, Ref } from "vue";

type CountProps = {
  count: Ref<number>;
  increase: () => void;
  decrease: () => void;
}


export default function useCound(iniValue: number = 1): CountProps {
  const count = ref(iniValue);

  const increase = () => {
    count.value++
  }

  const decrease = () => {
    count.value--
  }
  return {
    count,
    increase,
    decrease
  }
}
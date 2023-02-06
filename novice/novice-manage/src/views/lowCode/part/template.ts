// 模板
let template =`
<template>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({

    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
`

export default template
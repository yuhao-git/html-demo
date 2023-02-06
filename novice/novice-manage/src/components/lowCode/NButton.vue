<template>
  <el-button @click="showProps">
    <slot></slot>
  </el-button>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
  name:"NButton",
  props:['propsValue'],
  setup(props) {
    const state = reactive({})
    onMounted(() => {
    })
    return {
      propsValue:props.propsValue,
      ...toRefs(state),
    }
  },
  methods:{
    showProps(){
      console.log(this.propsValue)
    }
  }
}

</script>
<style scoped lang='less'>
</style>
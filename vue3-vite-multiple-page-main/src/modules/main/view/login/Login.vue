<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

type user = {
  name: string,
  id: string,
  sex?: string,
  age?: number
}
let router = useRouter()
let route = useRoute()
let userMsg: user = {
  name: "tom",
  id: "01"
}
let state = reactive({
  userMsg
})
let user = ref(userMsg)


</script>
<template>
  
</template>



<template>
  <div>
    reactive : {{ a }}
    <div>
      torRefs : {{ name }} -- {{ fullName }}
    </div>
    <div>
      <p>watch: {{ w }}</p> <el-button @click="stopWatch">暂停监听</el-button>
      <p> watchEffect: {{ e }}</p>
    </div>

    <el-input v-model="name"
              placeholder="你的名字" />

    <teleport to="#teleport">
      teleport : {{ name }}
    </teleport>
    

  </div>

  

</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watchEffect,
  computed,
  watch,
} from "vue";
const a = reactive({ name: "小王", age: 12 });
let { name, age } = toRefs(a);
let fullName = computed(() => name.value + "-略略路");
let w = "",
  e = "";
const stopWatch = watch(
  [() => a.name],
  (newName, oldName) => {
    w = newName + "+watch";
  },
  {
    immediate: true,
  }
);

// 监听多个值
// watch([() => state.age, year], ([curAge, newVal], [preAge, oldVal]) => {
//   console.log("新值:", curAge, "老值:", preAge);
//   console.log("新值:", newVal, "老值:", oldVal);
// });

watchEffect(() => {
  e = fullName.value + "+watchEffect";
});
</script>


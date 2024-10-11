<template>
  <div>
    <h1 :style="{'backgroundColor':'#87d068'}">Hello, Vue!</h1>
    <h1 style="textOverflow: ellipsis;">Hello, Vue!</h1>
    <h1 style="marginleft: 6px;textOverflow: ellipsis;">Hello, Vue!</h1>
    <h1 style="backgroundColor: #87d068;textOverflow: ellipsis;">Hello, Vue!</h1>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      message: "Welcome to my Vue app!",
    };
  },
};
</script>

<style>
h1 {
  color: blue;
}
</style>
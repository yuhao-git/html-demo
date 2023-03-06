<template>
  <div id="app">
    <HelloWorld />
    <!-- <chart2d /> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import chart2d from './components/charts2d/index.vue'
export default {
  name: "App",
  components: {
    HelloWorld
    // chart2d
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>

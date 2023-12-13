<template>
  <div>
    <div> - {{msg}} - </div>
    <el-button @click="send"> 发送 </el-button>
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
import { onMounted, ref } from "vue";
// import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const msg = ref("");
let socket = null;

onMounted(() => {
  connectToServe();
});

function connectToServe() {
  socket = io.connect("http://172.20.23.79:9092");
  socket.on("connect", () => {
    console.log("连接成功");
  });

  socket.on("msgEvent", function (data) {
    msg.value = data;
  });
}

//点击发送消息触发
function send() {
  console.log("发送消息");
  var msg = "hello word";
  socket.emit("msgEvent", msg);
}
</script>

<template>
  <div>
    <div>
      <p id="status">Waiting for input</p>
    </div>
    <div>
      <p id="message">hello world!</p>
    </div>
    <el-button id="connect"
               @click='connect'>Connect</el-button>
    <el-button id="disconnect"
               @click='disconnect'>Disconnect</el-button>
    <el-button id="send"
               @click='send'>Send Message</el-button>
  </div>
</template>

<script setup>
import io from "socket.io-client";
import { reactive, toRefs, onMounted } from "vue";
// import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

var socket = io.connect("http://172.20.23.79:9092");
var firstconnect = true;

function connect() {
  socket.connect();
}

//监听服务器连接事件
socket.on("connect", function () {
  status_update("Connected to Server");
});
//监听服务器关闭服务事件
socket.on("disconnect", function () {
  status_update("Disconnected from Server");
});
//监听服务器端发送消息事件
socket.on("msgEvent", function (data) {
  message(data);
  console.log("服务器发送的消息是：" + data);
});
socket.on("Broadcast", function (data) {
  message(data);
  //console.log("服务器发送的消息是："+data);
});

//断开连接
function disconnect() {
  socket.disconnect();
}

function message(data) {
  document.getElementById("message").innerHTML = "Server says: " + data;
}

function status_update(txt) {
  document.getElementById("status").innerHTML = txt;
}

function esc(msg) {
  return msg.replace(/</g, "<").replace(/>/g, ">");
}
//点击发送消息触发
function send() {
  console.log("点击了发送消息，开始向服务器发送消息");
  var msg = "我很好的,是的,0900";
  // {type:"",path:"",data:""}
  socket.emit("msgEvent", JSON.stringify({msg: msg, name: "张三", id: "123456"}));
}
</script>
<style scoped lang='less'>
</style>
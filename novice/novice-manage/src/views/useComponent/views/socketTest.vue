<template>
  <div class="h-full w-3/4 m-auto relative">
    <div class="h-1/6 flex justify-center items-center  border border-black rounded-md">
      {{userId}}
    </div>
    <div class="h-5/6 pb-0">
      <el-scrollbar height="100%"
                    class="pb-10"
                    ref="scrollbar">
        <div ref="innerRef">
          <div v-for="(item,index) in chatHistory"
               :key="index">
            {{item}}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="absolute w-full bottom-0">
      <el-input v-model="msg"
                @keydown.enter="sendMsg(msg)"
                placeholder="消息...">
        <template #append>
          <el-button @click="sendMsg(msg)">发送消息</el-button>
        </template>
      </el-input>
    </div>
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
  nextTick,
  onBeforeUnmount,
} from "vue";
import io from "socket.io-client";
let socket = null;
let msg = ref("");
let chatHistory = ref([]);
let scrollbar = ref(null);
let innerRef = ref(null);
let userId = ref("用户" + (Math.random() * 1000).toFixed(0));
onMounted(() => {
  initSocket();
});

onBeforeUnmount(() => {
  closeSocket();
});
// 页面刷新时onBeforeUnmount无效
window.addEventListener("beforeunload", function () {
  closeSocket();
});

function scrollToBottom() {
  nextTick(() => {
    scrollbar.value?.setScrollTop(innerRef.value.scrollHeight);
  });
}

function showMessage(data, type) {
  if (type === "message") {
    chatHistory.value.push(data);
    scrollToBottom();
  }
}

function sendMsg(msg) {
  if (!msg) {
    return;
  }
  socket.emit("message", msg);
}

function initSocket() {
  socket = io("ws://192.168.72.59:3000/");
  // 第一个enter代表是进入事件，第二个enter为了显示需要
  socket.on("enter", function (data) {
    showMessage(data, "enter");
  });

  socket.on("message", function (data) {
    showMessage(data, "message");
  });

  socket.on("leave", function (data) {
    showMessage(data, "leave");
  });
}

function closeSocket() {
  socket.disconnect();
}
</script>

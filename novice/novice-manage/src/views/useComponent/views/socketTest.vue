<template>
  <div class="h-full  relative ">
    <div class="form-container  min-h-fit border-b-2">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-text class="block">消息推送方式</el-text>
          <el-select class="w-full"
                     placeholder="请选择"
                     clearable
                     v-model="messagePushMethod">
            <el-option value="01"
                       label="私聊"></el-option>
            <el-option value="02"
                       label="群聊"></el-option>
            <el-option value="03"
                       label="广播"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12"
                v-if="messagePushMethod == '01'">
          <el-text class="block">目标用户Id</el-text>
          <el-select class="w-full"
                     placeholder="请选择"
                     clearable
                     v-model="toUserId">
            <el-option v-for="item in userList"
                       :key="item"
                       :label="'用户'+item"
                       :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12"
                v-if="messagePushMethod == '02'">
          <el-text class="block">房间号</el-text>
          <el-input v-model="roomId"
                    placeholder="房间号">
            <template #append>
              <el-button @click="joinRoom">加入房间</el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>

    </div>
    <div class="content-container w-full m-auto pb-10">
      <el-scrollbar height="100%"
                    ref="scrollbar">
        <div ref="innerRef">
          <div v-for="(item,index) in chatHistory"
               :key="index">
            <MsgCard :params="item"
                     :currentUserId="userId" />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="absolute w-full bottom-0">
      <el-input v-model="msg"
                @keydown.enter="sendMsg(msg,$event)"
                placeholder="按回车发送消息...">
        <template #prepend>
          我的id : {{userId}}
        </template>
        <template #append>
          <el-button @click="sendMsg(msg,$event)">发送消息</el-button>
        </template>
      </el-input>
    </div>
  </div>

</template>

<script setup>
import MsgCard from "../components/MsgCard.vue";
import { ElMessage } from "element-plus";
import io from "socket.io-client";
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

let socket = null;
let msg = ref("");
let chatHistory = ref([]);
let scrollbar = ref(null);
let innerRef = ref(null);
let userId = ref((Math.random() * 1000).toFixed(0));
let userList = ref([]);
let toUserId = ref("");
let messagePushMethod = ref("");
let roomId = ref("");

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

function initSocket() {
  socket = io("ws://192.168.72.59:3000/");
  // 加入
  enter();
  // 断开
  leave();
  // 用户列表
  gerUserList();
  // 私聊信息
  proviteMessage();
  // 群聊信息
  groupChat();
  // 广播
  message();
}

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

function sendMsg(parmaMsg, e) {
  e.preventDefault();
  if (!parmaMsg) {
    return;
  }

  let param = {
    userId: userId.value,
    msg: parmaMsg,
    date: new Date().toLocaleString(),
    messagePushMethod: messagePushMethod.value,
  };
  showMessage(param, "message");
  msg.value = "";
  if (messagePushMethod.value === "01") {
    param.toUserId = toUserId.value;
    socket.emit("proviteMessage", param);
  }
  if (messagePushMethod.value === "02") {
    param.roomId = roomId.value;
    socket.emit("groupMeaasge", param);
  }
  if (messagePushMethod.value === "03") {
    socket.emit("message", param);
  }
}

function enter() {
  socket.emit("enter", userId.value);
  socket.on("enter", function (userId) {
    ElMessage(`用户${userId}加入`);
  });
}
function leave() {
  socket.on("leave", function (userId) {
    ElMessage(`用户${userId}退出`);
  });
}
function message() {
  socket.on("message", function (data) {
    showMessage(data, "message");
  });
}

function closeSocket() {
  socket.disconnect();
}

function gerUserList() {
  socket.on("userList", (data) => {
    userList.value = data.filter((item) => item != userId.value);
  });
}

// 单聊
function proviteMessage() {
  // socket.on("proviteMessage", (param) => showMessage(param, "message"));
  socket.on("proviteMessage", (param) => {
    if (param.messagePushMethod === "01") {
      toUserId.value = param.userId;
      messagePushMethod.value = "01";
    }
    showMessage(param, "message");
  });
}

// 加入房间
function joinRoom() {
  socket.emit("joinRoom", roomId.value);
}

// 群聊
function groupChat() {
  socket.on("groupMeaasge", (param) => showMessage(param, "message"));
}
</script>


<style lang="less" scoped>
@form-height: 80px;
.mask {
  -webkit-mask-image: linear-gradient(#0000, #000 10%, #000 90%, #0000);
}

.form-container {
  height: @form-height;
}
.content-container {
  height: calc(100% - @form-height);
}
</style>
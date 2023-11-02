<template>
  <div>
    <p>
      {{state.resiveMsgList}}
    </p>
    <!-- 多端同步通讯 -->
    <el-input placeholder="发送信息"
              v-model="state.sendMsg"
              @keydown.enter="onSendMsg({data: state.sendMsg})">
      <template #append>
        <el-button @click="onSendMsg({data: state.sendMsg})"> 发送 </el-button>
      </template>
    </el-input>

    <el-button @click="clickAction"> 点击 </el-button>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
// https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
let ws = null;
const state = reactive({
  resiveMsgList: [],
  sendMsg: "",
  clickTimes: 0,
});

onMounted(() => {
  initWebsocket();
});

onUnmounted(() => {
  closeConnect();
});
function initWebsocket() {
  ws = new WebSocket("ws://localhost:12010/");

  // 开始通信时的处理
  ws.onopen = function (event) {
    console.log("连接成功！");
  };

  ws.onmessage = function (event) {
    parseMessage(event.data);
  };
}

// 解析获取到得信息
function parseMessage(data) {
  let res = JSON.parse(data);
  if (res.type === "click") {
    ElMessage(res.data);
  }
  if (res.type === "info") {
    state.resiveMsgList.push(res.data);
  }
}

// 发送信息
function onSendMsg({ data, type = "info" }) {
  let param = {
    type,
    data,
  };
  //添加状态判断，当为OPEN时，发送消息
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(param));
  } else {
    console.error("发送失败");
  }
}

// 关闭连接
function closeConnect() {
  ws.onclose = function (event) {
    //关闭时的处理操作
  };
  ws.close();
}

// 点击按钮
function clickAction() {
  state.clickTimes++;
  onSendMsg({ data: "点击了按钮" + state.clickTimes + "次", type: "click" });
}
</script>

/**
 * http://www.npmdoc.org/wszhongwenwendangws-jszhongwenjiaochengjiexi.html 文档
 * 启动服务：node app.js
 * 三维轮播后台
 */

/**
 * websocket方法 ：
 * open
 * close 
 * send
 * 
 * 
 * 监听事件：
 * onopen
 * onclose
 * onerror
 * onmessage
 * 
 */
const WebSocket = require('ws');
let clientObj = {}

const server = new WebSocket.Server({ port: 12010 });
server.on('connection', (ws) => {

  ws.on('message', (data, isBinary) => {
    let resData = JSON.parse(data);
    let resivedData = isBinary ? data : data.toString();
    if (resData.type === 'login') {
      clientObj[resData.userId] = ws;
      console.log('用户' + resData.userId + '登录成功');
    }
    
    if (resData.type === 'logout') {
      delete clientObj[resData.userId];
      console.log('用户' + resData.userId + '退出登录');
    }
    // 获取所有客户端连接对象
    const clients = server.clients.values();

    // 删除所有断开连接的用户
    for (let userId of Object.keys(clientObj)) {
      if (clientObj[userId].OPEN !== WebSocket.OPEN) {
        delete clientObj[userId];
      }
    }

    // 遍历所有客户端连接对象，并将收到的消息发送回每个客户端
    for (const client of clients) {
      // 给每个连接返回用户列表
      client.send(JSON.stringify({ type: 'userList', userList: Object.keys(clientObj) }));
      if (client !== ws && client.readyState === WebSocket.OPEN) { // 排除自身
        // 给指定对象用户发送消息
        if (clientObj[resData.to]) {
          clientObj[resData.to].send(resivedData)
        }
        // 广播
        // client.send(resivedData);
      }
    }

  });
});

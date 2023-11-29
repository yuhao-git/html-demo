/**
 * 大屏后台
 */
const WebSocket = require('ws');
let clientObj = {}

const server = new WebSocket.Server({ port: 8848 });
server.on('connection', (ws) => {
  ws.on('message', (data, isBinary) => {
    let resData = JSON.parse(data);
    if (resData.type == 'ping') {
      return
    }
    let resivedData = isBinary ? data : data.toString();
    // console.log('收到数据：', resivedData);
    // if (resData.type === 'login') {
    //   clientObj[resData.userId] = ws;
    //   console.log('用户' + resData.userId + '登录成功');
    // }

    // if (resData.type === 'logout') {
    //   delete clientObj[resData.userId];
    //   console.log('用户' + resData.userId + '退出登录');
    // }
    // 获取所有客户端连接对象
    const clients = server.clients.values();

    // 删除所有断开连接的用户
    // for (let userId of Object.keys(clientObj)) {
    //   if (clientObj[userId].OPEN !== WebSocket.OPEN) {
    //     delete clientObj[userId];
    //   }
    // }
    console.log('连接数：', server.clients.size)

    // 遍历所有客户端连接对象，并将收到的消息发送回每个客户端
    for (const client of clients) {
      // 给每个连接返回用户列表
      // client.send(JSON.stringify({ type: 'userList', userList: Object.keys(clientObj) }));
      if (client !== ws && client.readyState === WebSocket.OPEN) { // 排除自身
        // 给指定对象用户发送消息
        // if (clientObj[resData.to]) {
        //   clientObj[resData.to].send(resivedData)
        // }
        // 广播
        client.send(resivedData);
      }
    }

  });
});
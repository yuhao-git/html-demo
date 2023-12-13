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
    const clients = server.clients.values();
    console.log('连接数：', server.clients.size)
    // 遍历所有客户端连接对象，并将收到的消息发送回每个客户端
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) { // 排除自身

        client.send(resivedData);
      }
    }

  });
});
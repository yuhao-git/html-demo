/**
 * 聊天后天
 */
//创建一个http服务器
let app = require('http').createServer()

// 把http封装成io对象
let io = require('socket.io')(app, { cors: true })

// 运行的服务器端口号
let PORT = 3000
let userObj = {}
// 监听端口
app.listen(PORT)
// io.emit代表广播，socket.emit代表私发
io.on('connection', function (socket) {
  // 加入
  socket.on('enter', (userId) => enter(socket, userId))
  // socket.on 表示服务器接收一个客户端message 事件
  socket.on('message', (param) => relayMessage(socket, param))
  // 客户端断开，自带事件
  socket.on('disconnect', () => leave(socket))
  // 私聊
  socket.on('proviteMessage', (param) => privateChat(socket, param))
  // 群聊
  socket.on('groupMeaasge', (param) => groupChat(socket, param))
  // 加入房间
  socket.on('joinRoom', (roomId) => joinRoom(socket, roomId))
})

// 新用户加入
function enter(socket, userId) {
  // 将每个用户id存储在userObj中
  userObj[userId] = socket.id;
  // 给每个用户取名字
  socket.nickname = userId;
  // 给所有人发送用户列表
  socket.broadcast.emit('enter', socket.nickname)
  sendUserList(socket);
}

// 用户退出
function leave(socket) {
  delete userObj[socket.nickname];
  socket.broadcast.emit('leave', socket.nickname)
  sendUserList(socket);
}

// 转发消息
function relayMessage(socket, param) {
  // io.emit('message',  param); // 广播
  socket.broadcast.emit('message', param); //  发送给所有客户端，除了发送者
}

// 返回用户列表
function sendUserList(socket) {
  let userList = Object.keys(userObj);
  io.emit('userList', userList)
}

// 私聊
function privateChat(socket, param) {
  socket.to(userObj[param.toUserId]).emit('proviteMessage', param);
}

// 加入某房间
function joinRoom(socket, roomId) {
  socket.join(roomId);
}

// 群聊
function groupChat(socket, param) {
  socket.to(param.roomId).emit('groupMeaasge', param);
}


// io.on('connect', onConnect);

// function onConnect(socket){

//   // 发送给当前客户端
//   socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

//   // 发送给所有客户端，除了发送者
//   socket.broadcast.emit('broadcast', 'hello friends!');

//   // 发送给同在 'game' 房间的所有客户端，除了发送者
//   socket.to('game').emit('nice game', "let's play a game");

//   // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
//   socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

//   // 发送给同在 'game' 房间的所有客户端，包括发送者
//   io.in('game').emit('big-announcement', 'the game will start soon');

//   // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
//   io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

//   // 发送给指定 socketid 的客户端（私密消息）
//   socket.to(<socketid>).emit('hey', 'I just met you');

//   // 包含回执的消息
//   socket.emit('question', 'do you think so?', function (answer) {});

//   // 不压缩，直接发送
//   socket.compress(false).emit('uncompressed', "that's rough");

//   // 如果客户端还不能接收消息，那么消息可能丢失
//   socket.volatile.emit('maybe', 'do you really need it?');

//   // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
//   io.local.emit('hi', 'my lovely babies');


//   // 加入房间
//   socket.join('some room');

//  // 每个 Socket 都会自带一个随机的、独一无二的 id ，为了方便起见，每个 Socket 会自动 jion 加入以自己 id 命名的房间 可以很容易的用来实现 单聊模式
// io.on("connection", socket => {
//   socket.on("private message", (anotherSocketId, msg) => {
//     socket.to(anotherSocketId).emit("private message", socket.id, msg);
//   });
// });


// };
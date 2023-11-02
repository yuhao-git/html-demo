//创建一个http服务器
let app = require('http').createServer()

// 把http封装成io对象
let io = require('socket.io')(app, { cors: true })

// 运行的服务器端口号
let PORT = 3000
let clientCount = 0
let userObj = {}
// 监听端口
app.listen(PORT)

io.on('connection', function (socket) {
  // 给每个用户取名字
  clientCount++
  socket.nickname = 'user' + clientCount
  // io.emit代表广播，socket.emit代表私发
  io.emit('enter', socket.nickname + '  comes in')

  // socket.on 表示服务器接收一个客户端message 事件
  socket.on('message', relayMessage)

  // 客户端断开，自带事件
  socket.on('disconnect', function () {
    io.emit('leave', socket.nickname + ' left')
  })
})

// 转发消息
function relayMessage(param) {
  io.emit('message', socket.nickname + ' says: ' + param)
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

// };
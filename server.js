var net = require('net');
//建立 net.createServer() 的物件
var server = net.createServer();
var io = require('socket.io'); // 加入 Socket.IO

//用 net method listen() 方法讓 本機的 8124 port  給此 TCP server 使用
server.listen(8124, function () {
  console.log('TCP Server start');
});
//使用 connection 事件
io.listen(server);
var serv_io = io.listen(server);
serv_io.sockets.on('connection', function(socket) {
  // 傳送時間訊息給瀏覽器
  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 10);
  // 接收來自於瀏覽器的資料
  socket.on('client_data', function(data) {
    process.stdout.write(data.letter);
  });
});

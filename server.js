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
  /*socket.on('lng_data', function(data) {
    console.log("lng");
    console.log(data);
    socket.broadcast.emit('lng_data',data);
  });
  socket.on('lat_data', function(data) {
    console.log("lat");
    console.log(data);
    socket.broadcast.emit('lat_data',data);
  });
  socket.on('type_data', function(data) {
    console.log("type");
    console.log(data);
    socket.broadcast.emit('type_data',data);
  });*/
  socket.on('LOI_position', function(data) {
    var mdata = data.toString();
    console.log("LOI_position");
    console.log(data);
    socket.broadcast.emit('LoiGetPosition',mdata);
  });
  socket.on('AOI_position', function(data) {
    var mdata = data.toString();
    console.log("AOI_position");
    console.log(data);
    socket.broadcast.emit('AoiGetPosition',mdata);
  });
  socket.on('LoiShare', function(data) {
    console.log("LoiShare");
    let mdata = JSON.stringify(data);
    console.log(mdata);
    socket.broadcast.emit('LoiChange',mdata);
  });
  socket.on('position', function(data) {
    var mdata = data.toString();
    console.log("position");
    console.log(data);
    socket.broadcast.emit('GetPosition',mdata);
  });
  socket.on('share', function(data) {
    console.log("share");
    let mdata = JSON.stringify(data);
    console.log(mdata);
    socket.broadcast.emit('ChangeView',mdata);
  });

  socket.on('ios_search_group_id',function(data){
    console.log("ios_search_group_id");
    socket.broadcast.emit('ios_search_receive_group_id',data);
  });
  socket.on('ios_show_group_id',function(data){
    console.log("ios_show_group_id");
    socket.broadcast.emit('ios_show_receive_group_id',data);
  });
  socket.on('ios_send_longtitude', function(data) {
    console.log("ios_send_longtitude");
    socket.broadcast.emit('ios_receive_longtitude',data);
  });
  socket.on('ios_send_latitude', function(data) {
    console.log("ios_send_latitude");
    socket.broadcast.emit('ios_receive_latitude',data);
  });
socket.on('ios_send_type', function(data) {
  console.log("ios_send_type");
    socket.broadcast.emit('ios_receive_type',data);
  });

  socket.on('search',function(data){
    let mdata = JSON.stringify(data);
    console.log(mdata);
    socket.broadcast.emit('get_search',mdata);
  });


socket.on('ios_send_poi', function(data) {
    console.log('ios_send_poi')
    console.log(data);
    socket.broadcast.emit('ios_receive_poi',data);
  });
socket.on('ios_send_xoi', function(data) {
  console.log('ios_send_xoi')
    console.log(data);
    socket.broadcast.emit('ios_receive_xoi',data);
  });
});

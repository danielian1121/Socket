var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO
var querystring = require('querystring');
var util = require('util');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


var server = http.createServer(function(request, response) {
  /*console.log('HTTP Connection Successful');
  var path = url.parse(request.url).pathname;
  formData = ''
  switch (path) {
    case '/':
      request.on('data', function(chunk){
        formData += chunk;
    });
      request.on('end', function(){
        formData = querystring.parse(formData);
        console.log(formData);
        response.end(util.inspect(formData));
    });*/
      /*
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();*/
    /*  break;
    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;
    case '/1.jpg':
      fs.readFile(__dirname + path,'binary',function(err, file) {
      	if (err) {
      	  console.log(err);
      	}else{
      	    response.writeHead(200, {'Content-Type': 'image/jpeg'});
      	    response.write(file,'binary');
      	    response.end();
      	}
      });
      break;
    case '/2.jpg':
      fs.readFile(__dirname + path,'binary',function(err, file) {
      	if (err) {
          console.log(err);
        }else{
            response.writeHead(200, {'Content-Type': 'image/jpeg'});
            response.write(file,'binary');
            response.end();
        }
      });
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }*/
});

server.listen(8001);



io.listen(server); // 開啟 Socket.IO 的 listener

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

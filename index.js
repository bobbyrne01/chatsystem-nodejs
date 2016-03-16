var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// setup endpoint
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// on connection, setup handlers
io.on('connection', function(socket){

  io.emit('chat message', 'User connected.');

  // send message to clients
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', 'User disconnected.');
  });
});

// start server
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});

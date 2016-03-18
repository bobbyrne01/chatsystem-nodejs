var express = require('express'),
	app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
	winston = require('winston'),
  ipaddress = '127.0.0.1',
  port = 3000,
	users = [];

winston.level = 'debug'; // during dev

// hide server paths from clients
app.use('/socket', express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/css', express.static(__dirname + '/css/'));

// setup endpoint
app.get('/', function(req, res){
	winston.debug('GET /');
  res.sendfile('index.html');
});

// on connection, setup handlers
io.on('connection', function(socket){
	winston.debug('User connected');
  io.emit('message', 'User connected');

	socket.on('signIn', function(msg){
		winston.debug('User: ' + msg);
		users.push({'user': msg, 'pubkey': 'dummy'});
	});

  // send message to clients
  socket.on('message', function(msg){
		winston.debug('Message: ' + msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', function(){
		winston.debug('User disconnected');
    io.emit('message', 'User disconnected');
  });
});

// start server
http.listen(port, ipaddress, function(){
  winston.info('Listening on ' + ipaddress + ':' + port);
});

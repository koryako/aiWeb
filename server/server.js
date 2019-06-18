//require the needed files
var http = require('http');
var io = require('socket.io');


//init clients object. here we will save the user details on the socket id key
var clients = {};
//init sockets object. here we will save the socket object on the user id
var sockets = {};

//create the server
var server = http.createServer(function(request, response) {
	request.on('end', function() {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end();
	});
}).listen(3000);

var conn = io.listen(server);

//socket handlers
conn.sockets.on('connection', function(socket) {
	clients[socket.id] = {};
	clients[socket.id].user_id=socket.id;
	console.log('连接');
	//auto login event
	socket.on('send', function(data) {
		console.log(data);
	  socket.emit('back','1');							
		});
			
		//disconnect event
	socket.on('disconnect', function() {
		//if there is a user with this socket id
		if (clients[socket.id]) {
			//notify other users that the user is now offline
			socket.broadcast.emit('用户'+clients[socket.id].user_id+'退出', clients[socket.id].user_id);
			//remove the socket from sockets object
			//delete sockets[clients[socket.id].user_id];
		}
		//remove the user details from clients object
		delete clients[socket.id];
	});	
			
		
		
});

console.log('server started');

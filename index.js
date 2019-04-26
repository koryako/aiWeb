var path=require("path");
var http = require('http');
var io = require('socket.io');
var MouseController = require('./src/neural/controller.js');
var clients = {};
var sockets = {};
var server = http.createServer(function(request, response) {
	request.on('end', function() {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end();
	});
}).listen(3000);
var conn = io.listen(server);
conn.sockets.on('connection', function(socket) {
	clients[socket.id] = {};
	clients[socket.id].user_id=socket.id;
	console.log('连接');
	
	socket.on('send', function(data) {
		console.log(data);
		//delete MouseController;
 var MouseContro=new MouseController();
 // console.log(MouseController.m_pNet);
//console.log(MouseController.m_iNumValidPatterns);
 
 
var r=1;
 // while (r>0) {  
  
 MouseContro.TrainNetwork();
   console.log(MouseContro.m_dErrorSum);
   console.log(MouseContro.m_Mode.get());
   //r--;
   var data={Error:MouseContro.m_dErrorSum,Mode:MouseContro.m_Mode.get()}
    socket.emit('back',data);		
 delete MouseContro;
  //console.log(r);
  //} 
	 					
		});
			
		//disconnect event
	socket.on('disconnect', function() {
		//if there is a user with this socket id
		if (clients[socket.id]) {
			//notify other users that the user is now offline
			socket.broadcast.emit('logout', clients[socket.id].user_id);
			//remove the socket from sockets object
			//delete sockets[clients[socket.id].user_id];
		}
		
		console.log(clients[socket.id].user_id+'退出');
		
		//remove the user details from clients object
		delete clients[socket.id];
	});	
			
		
		
});

console.log('server started');



  
  


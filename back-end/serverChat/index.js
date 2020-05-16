let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

let clients = {}; // socketId: [vari valori passati dal frontend magari , come il token]
let rooms = {};

io.on('connection', (socket) => {
	console.log("Un utente si è connesso al ws " + socket.id);
	socket.on('newMessage', (data) => {
		io.emit('receivingMessage', {message: "we hai un messaggio"});
	});
	
	socket.on('newConnectionToChat', (data) => {
		socket.join(data.groupId);
		console.log(io.sockets.adapter.rooms);
	});
});

http.listen(3000, () => {
	console.log("Listening on *:3000");
});
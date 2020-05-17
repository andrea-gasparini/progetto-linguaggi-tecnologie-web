let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

let clients = {}; // socketId: [vari valori passati dal frontend magari , come il token]
let rooms = {};
let jwtSecret = "";

io.on('connection', (socket) => {

	socket.on('handshakeUser', (data) => {
		console.log("Handshaking data: " + JSON.stringify(data));
		clients[socket.id] = data; // semplice setup, data è l'userData.viewer che abbiamo nel redux front-end userReducer.
	});

	socket.on('joinChat', (data) => {
		let {groupId} = data;
		if(!(groupId in rooms)) { // significa che è il primo utente a connettersi alla stanza.
			rooms[groupId] = [socket.id]; // mettiamo il socket id nella room
		} else {
			rooms[groupId].push(socket.id) // altrimenti la stanza già era stata creata (quindi già c'erano altri utenti dentro) e pushiamo il socket.id
		}

		socket.join(groupId); // infine l'utente joina nella room.
		console.log(clients[socket.id].username + " joined in room " + groupId);
	});

	socket.on('newChatMessage', (data) => {
		console.log("Nuovo messaggio ricevuto: " + JSON.stringify(data));
		let {token} = data; // i dati che riceviamo (importanti).
	});

});

http.listen(3000, () => {
	console.log("Listening on *:3000");
});

let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let jwt = require("jsonwebtoken");

let jwtSecret = "102390293adodiXOsdpospaodslALxA*DéDSADAS°ç°ç"; // deve essere uguale a quella del server php.

io.on('connection', (socket) => {

	socket.on('joinChat', (data) => {
		let {groupId} = data;
		socket.join(groupId); // infine l'utente joina nella room.
	});

	socket.on('newChatMessage', (data) => {
		let {token} = data; // i dati che riceviamo (importanti).
		try {
			let decodedToken = jwt.verify(token, jwtSecret);
			socket.to(decodedToken.groupId).emit('handleNewMessage', {...decodedToken}); // emitto alla stanza groupId il nuovo messaggio ricevuto.
			console.log("Messaggio inviato alla room: " + decodedToken.groupId);
		} catch(err) {
			console.log(err);
			// significa che l'utente ha inviato un token non valido, hacker.
		}
	});

	socket.on('leaveRoom', (data) => {
		let {groupId} = data;
		socket.leave(groupId); // lascia la room
		console.log("Chat lasciata: "  + groupId);
	});
});

http.listen(3000, () => {
	console.log("Listening on *:3000");
});

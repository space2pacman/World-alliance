var server = require("socket.io")(7777);

server.on("connection", socket => {
	socket.on("client", data => {
		socket.emit("server", data)
	})
})
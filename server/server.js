var server = require("socket.io")(7777);
var Packet = require("./js/Packet.js");
var Player = require("./js/Player.js");
var Players = require("./js/Players.js");
var players = new Players();

server.on("connection", socketHandler);

function socketHandler(socket) {
	socket.on("client", packetHandler);
}

function packetHandler(packet) {
		var decryptPacket = new Packet(packet).receive();

		switch(decryptPacket.type) {
			case "requestAuth":
				var authPacket = decryptPacket.data;
				var login = authPacket.login;
				var x = authPacket.x;
				var y = authPacket.y;

				if(!players.exists("login", login)) {
					var player = new Player({ 
						login: login,
						x: x,
						y: y
					})

					players.add(player);
				}

				var data = {
					type: "playersInfo",
					data: players.getPlayers()
				}

				server.emit("server", new Packet(data).send());

				break;
			case "requestMove":
				var login = decryptPacket.data.login;
				var x = decryptPacket.data.x;
				var y = decryptPacket.data.y;
				var player = players.getPlayer(login);

				player.x = x;
				player.y = y;

				var data = {
					type: "move",
					data: players.getPlayers()
				}

				server.emit("server", new Packet(data).send());
				break;
		}
	}
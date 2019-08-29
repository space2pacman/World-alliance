var server = require("socket.io")(7777);

class Players {
	constructor() {
		this._players = [];
	}

	exists(key, value) {
		var values = [];

		for(var i = 0; i < this._players.length; i++) {
			values.push(this._players[i][key]);
		}

		return values.includes(value);
	}

	add(player) {
		this._players.push(player);
	}

	getPlayers() {
		return this._players;
	}
}

class Player {
	constructor(params) {
		this.login = params.login;
	}
}

class Packet {
	constructor(data) {
		this._data = data;
	}

	send() {
		return JSON.stringify(this._data)
	}

	receive() {
		return JSON.parse(this._data);
	}
}

var players = new Players();

server.on("connection", socket => {
	socket.on("client", packet => {
		var decryptPacket = new Packet(packet).receive();

		switch(decryptPacket.type) {
			case "requestAuth":
				var authPacket = decryptPacket.data;
				var login = authPacket.login;

				if(!players.exists("login", login)) {
					var player = new Player({ login: login })

					players.add(player);
				}

				var data = {
					type: "playersInfo",
					data: players.getPlayers()
				}

				server.emit("server", new Packet(data).send());

				break;
			case "requestMove":
				console.log(decryptPacket.data.login)

				break;
		}
	})
})
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

	getPlayer(login) {
		for(var i = 0; i < this._players.length; i++) {
			if(this._players[i].login === login) {
				return this._players[i];
			}
		}
	}
}

class Player {
	constructor(params) {
		this.login = params.login;
		this.x = params.x;
		this.y = params.y;
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
	})
})
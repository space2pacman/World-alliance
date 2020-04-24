let Player = require("./../Player");
let Packet = require("./../Packet");

class RequestAuth {
	constructor(packet, server, players) {
		this._server = server;
		this._packet = packet;
		this._players = players;
		this._init();
	}

	_init() {
		let packet = this._packet.data;
		let login = packet.login;
		let x = packet.x;
		let y = packet.y;

		if(!this._players.exists("login", login)) {
			let player = new Player({ 
				login: login,
				x: x,
				y: y
			})

			this._players.add(player);
		}

		let data = {
			type: "playersInfo",
			data: this._players.getPlayers()
		}

		this._server.send(new Packet(data).encrypt());
	}
}

module.exports = RequestAuth;
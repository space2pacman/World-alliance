let Player = require("./../Player");
let Packet = require("./../Packet");
let server = require("./../Server");
let players = require("./../Players");

class RequestAuth {
	constructor(packet, socket) {
		this._packet = packet;
		this._socket = socket;
		this._init();
	}

	_init() {
		let packet = this._packet.data;
		let login = packet.login;
		let x = packet.x;
		let y = packet.y;

		if(!players.exists("login", login)) {
			let player = new Player({ 
				login: login,
				x: x,
				y: y
			})

			players.add(player);
		}

		let data = {
			type: "playersInfo",
			data: players.getPlayers()
		}

		server.addSocket(login, this._socket);
		server.broadcast(new Packet(data).encrypt());
	}
}

module.exports = RequestAuth;
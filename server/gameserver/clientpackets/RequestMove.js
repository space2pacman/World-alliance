let Packet = require("./../Packet");
let server = require("./../Server");
let players = require("./../Players");

class RequestMove {
	constructor(packet) {
		this._packet = packet;
		this._init();
	}

	_init() {
		let packet = this._packet.data;
		let login = packet.login;
		let x = packet.x;
		let y = packet.y;
		let player = players.getPlayer(login);

		player.x = x;
		player.y = y;

		let data = {
			type: "move",
			data: player
		}

		server.send(new Packet(data).encrypt());
	}
}

module.exports = RequestMove;
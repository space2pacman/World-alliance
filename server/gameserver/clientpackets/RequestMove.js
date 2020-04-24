let Packet = require("./../Packet");

class RequestMove {
	constructor(packet, server, players) {
		this._packet = packet;
		this._server = server;
		this._players = players;
		this._init();
	}

	_init() {
		let packet = this._packet.data;
		let login = packet.login;
		let x = packet.x;
		let y = packet.y;
		let player = this._players.getPlayer(login);

		player.x = x;
		player.y = y;

		let data = {
			type: "move",
			data: this._players.getPlayers()
		}

		this._server.send(new Packet(data).encrypt());
	}
}

module.exports = RequestMove;
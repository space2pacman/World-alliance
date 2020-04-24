let clientPackets = require("./clientpackets/packets");
let Packet = require("./Packet");
let Player = require("./Player");
let Players = require("./Players");
let players = new Players();

class Server {
	constructor(io) {
		this._io = io;
		this._init();
	}

	send(data) {
		this._io.emit("onServer", data);
	}

	_onConnection(socket) {
		socket.on("onClient", this._onClient.bind(this));
	}

	_onClient(data) {
		let packet = new Packet(data).decrypt();

		switch(packet.type) {
			case "requestAuth":
				new clientPackets.RequestAuth(packet, this, players);

				break;
			case "requestMove":
				new clientPackets.RequestMove(packet, this, players);

				break;
		}
	}

	_init() {
		this._io.on("connection", this._onConnection.bind(this));
	}
}

module.exports = Server;
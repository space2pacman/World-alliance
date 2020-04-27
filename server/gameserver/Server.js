let Packet = require("./Packet");

class Server {
	constructor() {
		this._io = null;
		this._clientPackets = null;
	}

	setIO(io) {
		this._io = io;
		this._io.on("connection", this._onConnection.bind(this));
	}

	setClientPackets(packets) {
		this._clientPackets = packets;
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
				new this._clientPackets.RequestAuth(packet);

				break;
			case "requestMove":
				new this._clientPackets.RequestMove(packet);

				break;
			case "requestNpcList":
				new this._clientPackets.RequestNpcList(packet);

				break;
		}
	}
}

module.exports = new Server();
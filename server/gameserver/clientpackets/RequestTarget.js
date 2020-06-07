let Packet = require("./../Packet");
let server = require("./../Server");
let players = require("./../Players");
let npcList = require("./../NpcList");

class RequestTarget {
	constructor(packet) {
		this._packet = packet;
		this._init();
	}

	_init() {
		let login = this._packet.data.login;
		let type = this._packet.data.type;
		let objectId = this._packet.data.objectId;
		let player = players.getPlayer(login);

		let data = {
			type: "targetSelected",
			data: {
				type,
				objectId
			}
		}
		
		player.setTarget(type, objectId);
		server.send(login, new Packet(data).encrypt());
	}
}

module.exports = RequestTarget;
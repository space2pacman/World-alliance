let Packet = require("./../Packet");
let server = require("./../Server");
let players = require("./../Players");
let npcList = require("./../NpcList");

class RequestAttack {
	constructor(packet) {
		this._packet = packet;
		this._init();
	}

	_init() {
		let login = this._packet.data.login;
		let objectId = this._packet.data.objectId;
		let player = players.getPlayer(login);

		let data = {
			type: "Attack",
			data: {
				login,
				objectId
			}
		}
		
		player.attack(objectId);
		server.broadcast(new Packet(data).encrypt());
	}
}

module.exports = RequestAttack;
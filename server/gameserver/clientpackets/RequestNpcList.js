let Packet = require("./../Packet");
let server = require("./../Server");
let npcList = require("./../NpcList");

class RequestNpcList {
	constructor(packet) {
		this._packet = packet;
		this._init();
	}

	_init() {
		let data = {
			type: "npcList",
			data: npcList.getList()
		}

		server.send(new Packet(data).encrypt());
	}
}

module.exports = RequestNpcList;
let server = require("./Server");
let serverPackets = require("./serverpackets/packets");

class Player {
	constructor(params) {
		this.login = params.login;
		this.x = params.x;
		this.y = params.y;
		this._target = {
			type: null,
			objectId: null
		}
	}

	setTarget(type, objectId) {
		this._target.type = type;
		this._target.objectId = objectId;
	}

	attack(objectId) {
		// object.objectId, object.hp, object.maximumHp
		server.broadcast(new serverPackets.StatusUpdate(objectId).getData()); // fix
	}
}

module.exports = Player;
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
}

module.exports = Player;
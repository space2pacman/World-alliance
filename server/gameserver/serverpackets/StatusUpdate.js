class StatusUpdate {
	constructor(objectId) {
		this._data = {
			type: "StatusUpdate",
			data: {
				login: "pacman",
				objectId,
				hp: 50,
				maximumHp: 100
			}
		}
	}

	getData() {
		return JSON.stringify(this._data);
	}
}

module.exports = StatusUpdate;
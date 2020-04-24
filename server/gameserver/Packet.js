class Packet {
	constructor(data) {
		this._data = data;
	}

	encrypt() {
		return JSON.stringify(this._data)
	}

	decrypt() {
		return JSON.parse(this._data);
	}
}

module.exports = Packet;
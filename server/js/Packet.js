class Packet {
	constructor(data) {
		this._data = data;
	}

	send() {
		return JSON.stringify(this._data)
	}

	receive() {
		return JSON.parse(this._data);
	}
}

module.exports = Packet;
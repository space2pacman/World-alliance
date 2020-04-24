class Packet {
	constructor(handler, event) {
		this._handler = handler;
		this._event = event;
	}

	send(data) {
		return this._handler.emit(this._event, JSON.stringify(data));
	}

	receive(data) {
		return JSON.parse(data);
	}
}
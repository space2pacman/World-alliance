class RequestAuth {
	constructor(login) {
		this._data = {
			type: "requestAuth",
			data: {
				login: login,
				x: 0,
				y: 0
			}
		}
	}
		
	getData() {
		return this._data;
	}
}

class RequestMove {
	constructor(login, x, y) {
		this._data = { 
			type: "requestMove",
			data: {
				login: login,
				x: x, 
				y: y
			}
		}
	}

	getData() {
		return this._data;
	}
}

class RequestNpcList {
	constructor(login, x, y) {
		this._data = { 
			type: "requestNpcList",
			data: {}
		}
	}

	getData() {
		return this._data;
	}
}

let clientPackets = {
	RequestAuth,
	RequestMove,
	RequestNpcList
}
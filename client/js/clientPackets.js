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

class RequestPlayerMove {
	constructor(login, x, y) {
		this._data = { 
			type: "requestPlayerMove",
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
	constructor(login) {
		this._data = { 
			type: "requestNpcList",
			data: { login }
		}
	}

	getData() {
		return this._data;
	}
}

let clientPackets = {
	RequestAuth,
	RequestPlayerMove,
	RequestNpcList
}
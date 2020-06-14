class RequestAuth {
	constructor(login) {
		this._data = {
			type: "requestAuth",
			data: {
				login,
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
				login,
				x, 
				y
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
			data: { 
				login
			}
		}
	}

	getData() {
		return this._data;
	}
}

class RequestTarget {
	constructor(login, data) {
		let type = data.target.getAttribute("type");
		let objectId;

		switch(type) {
			case "npc":
				npcList.each(npc => {
					if(npc.getCharacter() === data.target) {
						objectId = npc.getObjectId();
					}
				})

				break;
		}

		this._data = {
			type: "requestTarget",
			data: {
				type,
				login,
				objectId
			}
		}
	}

	getData() {
		return this._data;
	}
}

class RequestAttack {
	constructor(login, objectId) {
		this._data = {
			type: "requestAttack",
			data: {
				login,
				objectId
			}
		}
	}

	getData() {
		return this._data;
	}
}

class RequestStatus {
	constructor(login, objectId) {
		this._data = {
			type: "requestStatus",
			data: {
				login,
				objectId
			}
		}
	}

	getData() {
		return this._data;
	}
}

let clientPackets = {
	RequestAuth,
	RequestPlayerMove,
	RequestNpcList,
	RequestTarget,
	RequestAttack
}
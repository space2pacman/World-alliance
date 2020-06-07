class NpcList {
	constructor() {
		this._list = [];
	}

	add(npc) {
		this._list.push(npc);
	}

	getByObjectId(objectId) {
		for(let i = 0; i < this._list.length; i++) {
			if(this._list[i].getObjectId() === objectId) {
				return this._list[i];
			}
		}
	}

	each(callback) {
		for(let i = 0; i < this._list.length; i++) {
			callback(this._list[i]);
		}
	}

	getList() {
		return this._list;
	}
}
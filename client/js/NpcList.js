class NpcList {
	constructor() {
		this._list = [];
	}

	add(npc) {
		this._list.push(npc);
	}

	getNpc(key, value) {
		for(let i = 0; i < this._list.length; i++) {
			if(this._list[i][key] === value) {
				return this._list[i];
			}
		}
	}

	getList() {
		return this._list;
	}
}
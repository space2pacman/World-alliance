let Npc = require("./Npc");

class NpcList {
	constructor() {
		this._data = null;
		this._list = []
	}

	addData(data) {
		this._data = data;
	}

	create() {
		this._data.forEach(item => {
			// creation of all npc of one kind
			for(let i = 0; i < item.count; i++) {
				this.add(new Npc(item));
			}
		})
	}

	add(npc) {
		this._list.push(npc);
	}

	getList() {
		return this._list;
	}
}

module.exports = new NpcList();
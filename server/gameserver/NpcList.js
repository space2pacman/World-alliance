class NpcList {
	constructor() {
		this._list = [{
			id: 1000,
			objectId: 1,
			name: "Roien",
			x: 100,
			y: 100
		}]
	}

	add(npc) {
		this._list.push(npc);
	}

	getList() {
		return this._list;
	}
}

module.exports = new NpcList();
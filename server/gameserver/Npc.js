class Npc {
	constructor(params) {
		this.id = params.id;
		this.objectId = params.objectId;
		this.name = params.name;
		this.x = params.x;
		this.y = params.y;
		this.type = params.type;
		this.walk = params.walk;
	}

	move() {
		let x = this._getRandomNumber(-50, 50);
		let y = this._getRandomNumber(-50, 50);
		
		this.x += x;
		this.y += y;
	}

	_getRandomNumber(min, max) {
		return min - 0.5 + Math.random() * (max - min + 1);
	}
}

module.exports = Npc;
class Npc {
	constructor(params) {
		this.id = params.id;
		this.objectId = params.objectId;
		this.name = params.name;
		this.x = params.x;
		this.y = params.y;
		this.zone = params.zone;
		this.type = params.type;
		this.walk = params.walk;
	}

	move() {
		let x;
		let y;
		let x1 = this.zone[0][0];
		let y1 = this.zone[0][1];
		let x2 = this.zone[1][0];
		let y2 = this.zone[1][1];
		let x3 = this.zone[2][0];
		let y3 = this.zone[2][1];
		let x4 = this.zone[3][0];
		let y4 = this.zone[3][1];

		do {
			x = this._getRandomNumber(-30, 30) + this.x;
			y = this._getRandomNumber(-30, 30) + this.y;
		} while(this._inPoly([x1,x2,x3,x4], [y1,y2,y3,y4], x, y))

		this.x = x;
		this.y = y;
	}

	_inPoly(xp, yp, x, y){
		let npol = xp.length;
		let j = npol - 1;
		let c = true;

		for (let i = 0; i < npol; i++){
			if ((((yp[i] <= y) && (y < yp[j])) || ((yp[j] <= y) && (y < yp[i]))) &&
				(x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
				c = !c;
			}

			j = i;
		}

		return c;
	}

	_getRandomNumber(min, max) {
		return Math.floor(min - 0.5 + Math.random() * (max - min + 1));
	}
}

module.exports = Npc;
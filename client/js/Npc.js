class Npc {
	constructor(params, width = 50, height = 50) {
		this.id = params.id;
		this.objectId = params.objectId;
		this.name = params.name;
		this.x = params.x;
		this.y = params.y;
		this.width = width;
		this.height = height;
		this.object = null;
		this.type = "npc";
		this._init();
		this._timer = null;
	}

	create() {
		let name = document.createElement("div");

		name.classList.add("name");
		name.innerHTML = this.name;
		this.object = document.createElement("div");
		this.object.classList.add("npc");
		this.object.style.backgroundImage = `url(img/npc/${this.id}.png)`
		this.object.style.width = this.width + "px";
		this.object.style.height = this.height + "px";
		this.object.style.left = this.x + "px";
		this.object.style.top = this.y + "px";
		this.object.setAttribute("type", this.type);
		this.object.appendChild(name);

		return this.object;
	}

	// test
	getCharacter() {
		return this.object;
	}

	dispatchEvent(event, data) {
		window.dispatchEvent(new CustomEvent(event, { detail: data }));
	}

	on(event, handler) {
		window.addEventListener(event, handler.bind(this));
	}

	getAngle(x1, y1, x2, y2) {
		return Math.floor(Math.atan2(y1-y2,x1-x2)*(180/Math.PI) + 180);
	}

	getDirections(x1, y1, x2, y2) {
		let direction;
		let angle = this.getAngle(x1, y1, x2, y2);
		
		if(angle >= 315 || angle <= 45) {
			direction = "right";
		}

		if(angle >= 45 && angle <= 135) {
			direction = "down";
		}

		if(angle >= 135 &&  angle <= 225) {
			direction = "left";
		}

		if(angle >= 225 && angle <= 315) {
			direction = "up";
		}

		return direction;
	}

	move(x, y) {
		let directions = ["left", "right", "up", "down"];

		clearInterval(this._timer);
		this.dispatchEvent("onStopNpcMove", { npc: this });
		this.dispatchEvent("onStartNpcMove", { npc: this, direction: this.getDirections(this.x, this.y, x, y), directions });
		this.drawPath(this.x, this.y, x, y, handler.bind(this));

		function handler(currentX, currentY) {
			this.object.style.left = (currentX - 25) + "px";
			this.object.style.top = (currentY - 25) + "px";
			this.x = currentX;
			this.y = currentY;

			if(this.x === x && this.y === y) {
				this.dispatchEvent("onStopNpcMove", { npc: this, directions });
			}
		}
	}
	
	drawPath(x1, y1, x2, y2, callback) {
		let deltaX = Math.abs(x2 - x1);
		let deltaY = Math.abs(y2 - y1);
		let signX = x1 < x2 ? 1 : -1;
		let signY = y1 < y2 ? 1 : -1;
		let error = deltaX - deltaY;
		this._timer = setInterval(tick, 50);

		function tick() {
			if(x1 != x2 || y1 != y2) {
				let error2 = error * 2;

				if(error2 > -deltaY) {
					error -= deltaY;
					x1 += signX;
				}

				if(error2 < deltaX) {
					error += deltaX;
					y1 += signY;
				}

				callback(x1, y1);
			}
		}
	}

	_onStartNpcMove(data) {
		let character = data.detail.npc.getCharacter();
		let direction = data.detail.direction;
		let directions = data.detail.directions;
		
		directions.forEach(direction => character.classList.remove("player--walk-" + direction))
		character.classList.add("player--walk");
		character.classList.add("player--walk-" + direction);
	}

	_onStopNpcMove(data) {
		let character = data.detail.npc.getCharacter();
		
		character.classList.remove("player--walk");
	}

	_init() {
		this.on("onStartNpcMove", this._onStartNpcMove.bind(this));
		this.on("onStopNpcMove", this._onStopNpcMove.bind(this));
	}
	// /test
		
}
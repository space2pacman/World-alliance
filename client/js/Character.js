class Character {
	constructor(name, type) {
		this._name = name;
		this._character = document.createElement("div");
		this._timerId = null;
		this._type = type;
		this._width = 50;
		this._height = 50;
		this._x = 0;
		this._y = 0;
		this._init();
	}

	on(event, handler) {
		window.addEventListener(event, handler.bind(this));
	}

	dispatchEvent(event, data) {
		window.dispatchEvent(new CustomEvent(event, { detail: data }));
	}

	getName() {
		return this._name;
	}

	getCharacter() {
		return this._character;
	}

	getTimerId() {
		return this._timerId;
	}

	setTimerId(id) {
		this._timerId = id;
	}

	getType() {
		return this._type;
	}

	getWidth() {
		return this._width;
	}

	getHeight() {
		return this._height;
	}

	getX() {
		return this._x;
	}

	setX(x) {
		this._x = x;
	}

	getY() {
		return this._y;
	}

	setY(y) {
		this._y = y;
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

	setPosition(x, y) {
		let character = this.getCharacter();

		character.style.left = x + "px";
		character.style.top = y + "px";
	}

	startDrawPath(x1, y1, x2, y2, callback) {
		let deltaX = Math.abs(x2 - x1);
		let deltaY = Math.abs(y2 - y1);
		let signX = x1 < x2 ? 1 : -1;
		let signY = y1 < y2 ? 1 : -1;
		let error = deltaX - deltaY;
		
		this.setTimerId(setInterval(tick, 50));

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

	stopDrawPath() {
		clearInterval(this.getTimerId());
	}

	_onStartCharacterMove(data) {
		let character = data.detail.character;
		let direction = data.detail.direction;
		let directions = data.detail.directions;
		
		directions.forEach(direction => character.classList.remove("character--walk-" + direction))
		character.classList.add("character--walk");
		character.classList.add("character--walk-" + direction);
	}

	_onStopCharacterMove(data) {
		let character = data.detail.character;

		character.classList.remove("character--walk");
	}

	_init() {
		this.on("onStartCharacterMove", this._onStartCharacterMove.bind(this));
		this.on("onStopCharacterMove", this._onStopCharacterMove.bind(this));
	}
}
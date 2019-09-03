class Player {
	constructor(login, width = 50, height = 50) {
		this.width = width;
		this.height = height;
		this._login = login;
		this._x = 0;
		this._y = 0;
		this._timer = null;
	}

	create() {
		this._player = document.createElement("div");
		this._player.classList.add("player");
		this._player.classList.add(this._login);
		this._player.style.width = this.width + "px";
		this._player.style.height = this.height + "px";
		this._player.setAttribute("login", this._login);

		return this._player;
	}

	dispatchEvent(event, data) {
		window.dispatchEvent(new CustomEvent(event, { detail: data }));
	}

	getCharacter() {
		return this._player;
	}

	on(event, handler) {
		window.addEventListener(event, handler.bind(this));
	}

	getAngle(x1, y1, x2, y2) {
		return Math.floor(Math.atan2(y1-y2,x1-x2)*(180/Math.PI) + 180);
	}

	getDirections(x1, y1, x2, y2) {
		var directions = [];
		var angle = this.getAngle(x1, y1, x2, y2);
		
		if(angle >= 315 || angle <= 45) {
			directions.push("right");
		}

		if(angle >= 45 && angle <= 135) {
			directions.push("down");
		}

		if(angle >= 135 &&  angle <= 225) {
			directions.push("left");
		}

		if(angle >= 225 && angle <= 315) {
			directions.push("up");
		}

		return directions;
	}

	move(x, y, logins) {
		var allDirections = ["left", "right", "up", "down"];

		clearInterval(this._timer);
		this.dispatchEvent("playerStopMove", allDirections);
		this.dispatchEvent("playerStartMove", this.getDirections(this._x, this._y, x, y));
		this._drawPath(this._x, this._y, x, y, handler.bind(this));

		function handler(currentX, currentY) {
			if(logins.data === logins.current) {
				var data = { 
					detail: { 
						x: currentX, 
						y: currentY 
					}

				}
				window.dispatchEvent(new CustomEvent("moveMap", data))
			} else {
				this._player.style.left = (currentX - 25) + "px";
				this._player.style.top = (currentY - 25) + "px";
			}

			this._x = currentX;
			this._y = currentY;

			if(this._x === x && this._y === y) {
				this.dispatchEvent("playerStopMove", allDirections);
			}
		}
	}

	setPosition(x, y) {
		this._player.style.left = x + "px";
		this._player.style.top = y + "px";
	}

	_drawPath(x1, y1, x2, y2, callback) {
		var deltaX = Math.abs(x2 - x1);
		var deltaY = Math.abs(y2 - y1);
		var signX = x1 < x2 ? 1 : -1;
		var signY = y1 < y2 ? 1 : -1;
		var error = deltaX - deltaY;
		this._timer = setInterval(tick, 10);

		function tick() {
			if(x1 != x2 || y1 != y2) {
				var error2 = error * 2;

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
}
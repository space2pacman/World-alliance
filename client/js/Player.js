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

	// dispatchEvent(event) {
	// 	window.dispatchEvent(new CustomEvent(event))
	// }

	getCharacter() {
		return this._player;
	}

	on(event, handler) {
		window.addEventListener(event, handler.bind(this));
	}

	move(x, y, logins) {
		clearInterval(this._timer);
		//this.dispatchEvent("playerStartMove");
		this._drawLine(this._x, this._y, x, y, handler.bind(this));

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

			// if(this._x === x && this._y === y) {
			// 	this.dispatchEvent("playerStopMove");
			// }
		}
	}

	setPosition(x, y) {
		this._player.style.left = x + "px";
		this._player.style.top = y + "px";
	}

	_drawLine(x1, y1, x2, y2, callback) {
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
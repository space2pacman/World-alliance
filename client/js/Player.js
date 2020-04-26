class Player {
	constructor(login, socket, width = 50, height = 50) {
		this.width = width;
		this.height = height;
		this.login = login;
		this._character = null;
		this._socket = socket;
		this.x = 0;
		this.y = 0;
		this._timer = null;
		this._init();
	}

	create() {
		this._character = document.createElement("div");
		this._character.classList.add("player");
		this._character.style.backgroundImage = `url(img/character/${this.login}.png)`
		this._character.style.width = this.width + "px";
		this._character.style.height = this.height + "px";
		this._character.setAttribute("login", this.login);

		return this._character;
	}

	dispatchEvent(event, data) {
		window.dispatchEvent(new CustomEvent(event, { detail: data }));
	}

	getCharacter() {
		return this._character;
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

	move(x, y, logins) {
		let directions = ["left", "right", "up", "down"];
		let player = players.getPlayer(logins.data)

		clearInterval(player._timer);
		player.dispatchEvent("onStopMove", { player, directions });
		player.dispatchEvent("onStartMove", { player, direction: player.getDirections(player.x, player.y, x, y) });
		player.drawPath(player.x, player.y, x, y, handler.bind(player));

		function handler(currentX, currentY) {
			if(logins.data === logins.current) {
				let data = { 
					detail: { 
						x: currentX, 
						y: currentY 
					}

				}

				window.dispatchEvent(new CustomEvent("moveMap", data))
			} else {
				this._character.style.left = (currentX - 25) + "px";
				this._character.style.top = (currentY - 25) + "px";
			}

			this.x = currentX;
			this.y = currentY;

			if(this.x === x && this.y === y) {
				this.dispatchEvent("onStopMove", { player: this, directions });
			}
		}
	}

	setPosition(x, y) {
		this._character.style.left = x + "px";
		this._character.style.top = y + "px";
	}

	sendPacket(data) {
		this._socket.emit("onClient", data);
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

	_onStartMove(data) {
		let character = data.detail.player.getCharacter();
		let direction = data.detail.direction;
		
		character.classList.add("player--walk");
		character.classList.add("player--walk-" + direction);
	}

	_onStopMove(data) {
		let character = data.detail.player.getCharacter();
		let directions = data.detail.directions;
		
		character.classList.remove("player--walk");
		directions.forEach(direction => character.classList.remove("player--walk-" + direction))
	}

	_init() {
		this.on("onStartMove", this._onStartMove.bind(this));
		this.on("onStopMove", this._onStopMove.bind(this));
	}
}
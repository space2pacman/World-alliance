class Player extends Character {
	constructor(name, socket) {
		super(name, "player");

		this._socket = socket;
	}

	create() {
		let name = document.createElement("div");
		let character = this.getCharacter();

		name.classList.add("name");
		name.innerHTML = this.getName();
		character.classList.add("character");
		character.style.backgroundImage = `url(img/${this.getType()}/${this.getName()}.png)`;
		character.style.width = this.getWidth() + "px";
		character.style.height = this.getHeight() + "px";
		character.setAttribute("name", this.getName());
		character.setAttribute("type", this.getType());
		character.appendChild(name);

		return character;
	}

	move(x, y, logins) {
		let directions = ["left", "right", "up", "down"];
		let player = players.getPlayer(logins.data)

		clearInterval(player.getTimerId());
		player.dispatchEvent("onStopCharacterMove", { character: this.getCharacter() });
		player.dispatchEvent("onStartCharacterMove", { character: this.getCharacter(), direction: player.getDirections(player.getX(), player.getY(), x, y), directions },);
		player.drawPath(player.getX(), player.getY(), x, y, handler.bind(player));

		function handler(currentX, currentY) {
			let character = this.getCharacter();

			if(logins.data === logins.current) {
				let data = { 
					detail: { 
						x: currentX, 
						y: currentY 
					}

				}

				window.dispatchEvent(new CustomEvent("moveMap", data))
			} else {
				character.style.left = (currentX - 25) + "px";
				character.style.top = (currentY - 25) + "px";
			}

			this.setX(currentX);
			this.setY(currentY);

			if(this.getX() === x && this.getY() === y) {
				this.dispatchEvent("onStopCharacterMove", { character: this.getCharacter(), directions });
			}
		}
	}

	sendPacket(data) {
		this._socket.emit("onClient", data);
	}
}
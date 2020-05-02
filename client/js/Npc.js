class Npc extends Character {
	constructor(params) {
		super(params.name, "npc");

		this._id = params.id;
		this._objectId = params.objectId;
		this.setX(params.x);
		this.setY(params.y);
	}

	getId() {
		return this._id;
	}

	getObjectId() {
		return this._objectId;
	}

	create() {
		let name = document.createElement("div");
		let character = this.getCharacter();

		name.classList.add("name");
		name.innerHTML = this.getName();
		character.classList.add("character");
		character.style.backgroundImage = `url(img/${this.getType()}/${this.getId()}.png)`;
		character.style.width = this.getWidth() + "px";
		character.style.height = this.getHeight() + "px";
		character.style.left = this.getX() + "px";
		character.style.top = this.getY() + "px";
		character.setAttribute("type", this.getType());
		character.appendChild(name);

		return character;
	}

	move(x, y) {
		let directions = ["left", "right", "up", "down"];

		clearInterval(this.getTimerId());
		this.dispatchEvent("onStopCharacterMove", { character: this.getCharacter() });
		this.dispatchEvent("onStartCharacterMove", { character: this.getCharacter(), direction: this.getDirections(this.getX(), this.getY(), x, y), directions });
		this.drawPath(this.getX(), this.getY(), x, y, handler.bind(this));

		function handler(currentX, currentY) {
			let character = this.getCharacter();

			character.style.left = (currentX - 25) + "px";
			character.style.top = (currentY - 25) + "px";
			this.setX(currentX);
			this.setY(currentY);

			if(this.getX() === x && this.getY() === y) {
				this.dispatchEvent("onStopCharacterMove", { character: this.getCharacter(), directions });
			}
		}
	}	
}
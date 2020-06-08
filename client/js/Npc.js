class Npc extends Character {
	constructor(params) {
		super(params.name, "npc");

		this._id = params.id;
		this._objectId = params.objectId;
		this.setHp(params.hp);
		this.setX(params.x);
		this.setY(params.y);
	}

	getHp() {
		return this._hp;
	}

	setHp(hp) {
		this._hp = hp;
	}

	getId() {
		return this._id;
	}

	getObjectId() {
		return this._objectId;
	}

	selectTarget() {
		let character = this.getCharacter();

		character.classList.add("character--selected");
	}

	unselectTarget() {
		let character = this.getCharacter();

		character.classList.remove("character--selected");
	}

	create() {
		let name = document.createElement("div");
		let hp = document.createElement("div");
		let currentHp = document.createElement("div");
		let character = this.getCharacter();

		name.classList.add("name");
		name.innerHTML = this.getName();
		
		hp.classList.add("character__hp");
		currentHp.classList.add("character__hp-current");
		currentHp.style.width = "30%"; // fix
		hp.appendChild(currentHp);

		character.classList.add("character");
		character.style.backgroundImage = `url(img/${this.getType()}/${this.getId()}.png)`;
		character.style.width = this.getWidth() + "px";
		character.style.height = this.getHeight() + "px";
		character.style.left = this.getX() + "px";
		character.style.top = this.getY() + "px";
		character.style.zIndex = this.getY();
		character.setAttribute("type", this.getType());
		character.appendChild(name);
		character.appendChild(hp);

		return character;
	}

	move(x, y) {
		let directions = ["left", "right", "up", "down"];

		this.stopDrawPath();
		this.dispatchEvent("onStopCharacterMove", { character: this.getCharacter() });
		this.dispatchEvent("onStartCharacterMove", { character: this.getCharacter(), direction: this.getDirections(this.getX(), this.getY(), x, y), directions });
		this.startDrawPath(this.getX(), this.getY(), x, y, handler.bind(this));

		function handler(currentX, currentY) {
			let character = this.getCharacter();

			character.style.left = (currentX - 25) + "px";
			character.style.top = (currentY - 25) + "px";
			character.style.zIndex = (currentY - 25);
			this.setX(currentX);
			this.setY(currentY);

			if(this.getX() === x && this.getY() === y) {
				this.dispatchEvent("onStopCharacterMove", { character: this.getCharacter(), directions });
			}
		}
	}	
}
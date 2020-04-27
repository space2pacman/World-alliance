class Npc {
	constructor(params, width = 50, height = 50) {
		this._id = params.id;
		this._objectId = params.objectId;
		this._name = params.name;
		this._x = params.x;
		this._y = params.y;
		this._width = width;
		this._height = height;
		this._object = null;
		this._type = "npc";
	}

	create() {
		let name = document.createElement("div");

		name.classList.add("name");
		name.innerHTML = this._name;
		this._object = document.createElement("div");
		this._object.classList.add("npc");
		this._object.style.backgroundImage = `url(img/npc/${this._id}.png)`
		this._object.style.width = this._width + "px";
		this._object.style.height = this._height + "px";
		this._object.style.left = this._x + "px";
		this._object.style.top = this._y + "px";
		this._object.setAttribute("type", this._type);
		this._object.appendChild(name);

		return this._object;
	}
}
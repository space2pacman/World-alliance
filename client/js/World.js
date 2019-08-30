class World {
	constructor(element, width, height) {
		this._element = document.querySelector(element);
		this._objects = [];
		this._map = null;
		this.width = width;
		this.height = height;
		this.createMap();
	}

	on(event, handler) {
		this._element.addEventListener(event, handler);
	}

	addPlayer(player) {
		this._objects.push(player);
	}

	placeObjects(login) {
		for(var i = 0; i < this._objects.length; i++) {
			if(this._objects[i].getAttribute("login") === login) {
				this._element.appendChild(this._objects[i]);
			} else {
				this._map.appendChild(this._objects[i])
			}

		}
	}

	exists(value) {
		var values = [];

		for(var i = 0; i < this._objects.length; i++) {
			values.push(this._objects[i].getAttribute("login"));
		}

		return values.includes(value);
	}

	createMap() {
		this._map = document.createElement("div");
		this._map.classList.add("map");
		this._element.appendChild(this._map);
	}

}
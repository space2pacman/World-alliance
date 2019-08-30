class World {
	constructor(element, width, height) {
		this._element = document.querySelector(element);
		this._objects = [];
		this._map = null;
		this.width = width;
		this.height = height;
		this.createMap();
		this._init();
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

		window.addEventListener("moveMap", handler.bind(this));

		function handler(e) {
			var x = e.detail.x;
			var y = e.detail.y;
			
			this._map.style.left = -(x - this.width / 2) + "px";
			this._map.style.top = -(y - this.height / 2) + "px";
		}
	}

	_init() {
		this._element.style.width = this.width + "px";
		this._element.style.height = this.height + "px";
	}

}
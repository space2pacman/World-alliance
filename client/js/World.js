var map = [
	[113,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,114],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,105,107,110,111,112,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,120,122,125,126,127,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,120,122,138,139,140,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,120,122,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,120,122,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,135,137,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[127,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,125],
	[128,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,129]
];

class World {
	constructor(element, width, height, cellWidth, cellHeight) {
		this.width = width;
		this.height = height;
		this._element = document.querySelector(element);
		this._objects = [];
		this._map = null;
		this._cellWidth = cellWidth;
		this._cellHeight = cellHeight;
		this._createMap();
		this._fillMap();
		this._init();
	}

	on(event, handler) {
		this._map.addEventListener(event, handler);
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

	_createMap() {
		this._map = document.createElement("div");
		this._map.classList.add("map");
		this._map.style.width = map[0].length * this._cellWidth + "px";
		this._map.style.height = map.length * this._cellHeight + "px";
		this._element.appendChild(this._map);

		window.addEventListener("moveMap", handler.bind(this));

		function handler(e) {
			var x = e.detail.x;
			var y = e.detail.y;
			
			this._map.style.left = -(x - this.width / 2) + "px";
			this._map.style.top = -(y - this.height / 2) + "px";
		}
	}

	_createCell() {
		var cell = document.createElement("div");

		cell.classList.add("cell");

		return cell;
	}

	_fillMap() {
		for(var i = 0; i < map.length; i++) {
			for(var j = 0; j < map[i].length; j++) {
				var cell = this._createCell();

				if(map[i][j] >= 100 || map[i][j] <= 140) {
					cell.classList.add(`surface-${map[i][j]}`);
				}

				this._map.appendChild(cell);
			}
		}
	}

	_init() {
		this._element.style.width = this.width + "px";
		this._element.style.height = this.height + "px";
	}

}
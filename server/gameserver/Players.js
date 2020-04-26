class Players {
	constructor() {
		this._players = [];
	}

	exists(key, value) {
		var values = [];

		for(var i = 0; i < this._players.length; i++) {
			values.push(this._players[i][key]);
		}

		return values.includes(value);
	}

	add(player) {
		this._players.push(player);
	}

	getPlayers() {
		return this._players;
	}

	getPlayer(login) {
		for(var i = 0; i < this._players.length; i++) {
			if(this._players[i].login === login) {
				return this._players[i];
			}
		}
	}
}

module.exports = new Players();
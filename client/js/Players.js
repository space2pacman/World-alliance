class Players {
	constructor() {
		this._players = [];
	}

	add(player) {
		this._players.push(player);
	}

	getPlayer(name) {
		for(let i = 0; i < this._players.length; i++) {
			if(this._players[i].getName() === name) {
				return this._players[i];
			}
		}
	}

	getPlayers() {
		return this._players;
	}
}
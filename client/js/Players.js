class Players {
	constructor() {
		this._players = [];
	}

	add(player) {
		this._players.push(player);
	}

	getPlayers() {
		return this._players;
	}
}
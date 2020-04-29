class Players {
	constructor() {
		this._players = [];
	}

	add(player) {
		this._players.push(player);
	}

	getPlayer(login) {
		for(let i = 0; i < this._players.length; i++) {
			if(this._players[i].login === login) {
				return this._players[i];
			}
		}
	}

	getPlayers() {
		return this._players;
	}
}
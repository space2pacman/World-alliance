window.game = {
	debug(resolution) {
		let player = document.querySelector(".player");
		let npc = document.querySelectorAll(".npc");
		let cell = document.querySelectorAll(".cell");
		let border;

		if(resolution) {
			border = "1px solid black";
		} else {
			border = "none";
		}

		player.style.border = border;

		for(let i = 0; i < npc.length; i++) {
			npc[i].style.border = border;
		}

		for(let i = 0; i < cell.length; i++) {
			cell[i].style.border = border;
		}
	}
}
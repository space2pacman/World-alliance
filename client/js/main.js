let form = document.querySelector(".js-form");
let auth = document.querySelector(".js-auth");
let login = document.querySelector(".js-login");
let interface = document.querySelector(".js-interface");
let panelSkills = document.querySelector(".js-panel-skills"); // fix
let players = new Players();
let npcList = new NpcList();
let world = new World(".world", 500, 400, 50, 50);

panelSkills.addEventListener("click", e => {
	let type = e.target.getAttribute("type");
	let player = world.getMainPlayer();

	if(type === "attack") {
		if(player.getTarget() !== null) {
			let requestAttackPacket = new Packet(new clientPackets.RequestAttack(player.getName(), player.getTarget()).getData());

			player.sendPacket(requestAttackPacket.encrypt());
		} else {
			console.log("fail")
		}
	}
})

auth.addEventListener("click", () => {
	let socket = new io("http://127.0.0.1:7777");
	let player = new Player(login.value, socket);
	let requestAuthPacket = new Packet(new clientPackets.RequestAuth(player.getName()).getData());
	let requestNpcListPacket = new Packet(new clientPackets.RequestNpcList(player.getName()).getData());
	
	player.sendPacket(requestAuthPacket.encrypt());
	player.sendPacket(requestNpcListPacket.encrypt());
	form.classList.add("hidden");
	interface.classList.remove("hidden");
	world.setMainPlayer(player);
	world.show();

	world.on("click", data => {
		if(world.isCharacter(data)) {
			let requestTargetPacket = new Packet(new clientPackets.RequestTarget(player.getName(), data).getData());

			player.sendPacket(requestTargetPacket.encrypt());
		} else {
			let requestPlayerMovePacket = new Packet(new clientPackets.RequestPlayerMove(player.getName(), data.offsetX, data.offsetY).getData());
			
			player.sendPacket(requestPlayerMovePacket.encrypt());
		}


	});

	socket.on("onServer", world.onServer.bind(world));
})
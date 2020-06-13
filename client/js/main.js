let form = document.querySelector(".js-form");
let auth = document.querySelector(".js-auth");
let login = document.querySelector(".js-login");
let players = new Players();
let npcList = new NpcList();


auth.addEventListener("click", () => {
	let socket = new io("http://127.0.0.1:7777");
	let world = new World(".world", 500, 400, 50, 50);
	let player = new Player(login.value, socket);
	let requestAuthPacket = new Packet(new clientPackets.RequestAuth(player.getName()).getData());
	let requestNpcListPacket = new Packet(new clientPackets.RequestNpcList(player.getName()).getData());
	player.sendPacket(requestAuthPacket.encrypt());
	player.sendPacket(requestNpcListPacket.encrypt());
	form.classList.add("hidden");
	world.setMainPlayer(player);

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
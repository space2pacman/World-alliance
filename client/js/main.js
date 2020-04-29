let form = document.querySelector(".js-form");
let auth = document.querySelector(".js-auth");
let login = document.querySelector(".js-login");
let players = new Players();
let npcList = new NpcList();
let player;

auth.addEventListener("click", () => {
	let socket = new io("http://127.0.0.1:7777");
	let world = new World(".world", 500, 400, 50, 50);
	let requestAuthPacket = new Packet(new clientPackets.RequestAuth(login.value).getData());
	let requestNpcListPacket = new Packet(new clientPackets.RequestNpcList(login.value).getData());
	
	player = new Player(login.value, socket);
	player.sendPacket(requestAuthPacket.encrypt());
	player.sendPacket(requestNpcListPacket.encrypt());
	form.classList.add("hidden");

	world.on("click", data => {
		let requestPlayerMovePacket = new Packet(new clientPackets.RequestPlayerMove(login.value, data.offsetX, data.offsetY).getData());

		player.sendPacket(requestPlayerMovePacket.encrypt());
	});

	socket.on("onServer", world.onServer.bind(world));
})

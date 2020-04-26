let form = document.querySelector(".js-form");
let auth = document.querySelector(".js-auth");
let login = document.querySelector(".js-login");
let players = new Players();
let player;

auth.addEventListener("click", () => {
	let socket = new io("http://127.0.0.1:7777");
	let world = new World(".world", 500, 400, 50, 50);
	let packet = new Packet(new clientPackets.RequestAuth(login.value).getData());
	
	player = new Player(login.value, socket);
	player.sendPacket(packet.encrypt());
	form.classList.add("hidden");

	world.on("click", data => {
		let packet = new Packet(new clientPackets.RequestMove(login.value, data.offsetX, data.offsetY).getData());

		player.sendPacket(packet.encrypt());
	});

	socket.on("onServer", world.onServer.bind(world));
})

let login = "pacman";
let world = new World(".world", 500, 400, 50, 50);
let socket = new io("http://127.0.0.1:7777");
let players = new Players();
let player = new Player(login, socket);
let packet = new Packet(new clientPackets.RequestAuth(login).getData());

player.sendPacket(packet.encrypt());

world.on("click", data => {
	let packet = new Packet(new clientPackets.RequestMove(login, data.offsetX, data.offsetY).getData());

	player.sendPacket(packet.encrypt());
});

socket.on("onServer", world.onServer.bind(world));
let npcList = require("./NpcList");
let server = require("./Server");
let Packet = require("./Packet");

class Tasks {
	npcMove() {
		setTimeout(callback, 3000);

		function callback() {
			npcList.getList().forEach(npc => {
				if(npc.walk) {
					npc.move();
					
					let data = {
						type: "npcMove",
						data: {
							objectId: npc.objectId,
							x: npc.x,
							y: npc.y
						}
					}

					server.broadcast(new Packet(data).encrypt());
				}
			})

			setTimeout(callback, 3000);
		}
	}
}

module.exports = new Tasks();
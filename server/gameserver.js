let io = require("socket.io")(7777);
let server = require("./gameserver/Server");
let clientPackets = require("./gameserver/clientpackets/packets");
// init objects
let npcList = require("./gameserver/NpcList");
let players = require("./gameserver/Players");

npcList.addData(require("./data/npc"));
npcList.create();
server.setIO(io);
server.setClientPackets(clientPackets);
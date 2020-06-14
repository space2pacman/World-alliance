let io = require("socket.io")(7777);
let server = require("./gameserver/Server");
let clientPackets = require("./gameserver/clientpackets/packets");
// init objects
let npcList = require("./gameserver/NpcList");
let players = require("./gameserver/Players");
let tasks = require("./gameserver/Tasks");
let idFactory = require("./util/idFactory");

idFactory.addFilePath("./data/idstate.json");
npcList.addData(require("./data/npc"));
npcList.create();
tasks.startNpcMove();
server.setIO(io);
server.setClientPackets(clientPackets);
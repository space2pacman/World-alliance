let io = require("socket.io")(7777);
let server = require("./gameserver/Server");
let clientPackets = require("./gameserver/clientpackets/packets");
let Player = require("./gameserver/Player");
let players = require("./gameserver/Players");

server.setIO(io);
server.setClientPackets(clientPackets);
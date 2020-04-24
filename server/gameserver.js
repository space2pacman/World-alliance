let io = require("socket.io")(7777);
let Server = require("./gameserver/Server");
let server = new Server(io);
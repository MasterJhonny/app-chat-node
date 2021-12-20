const socketIo = require('socket.io');
const config = require('./config');
const { host, port } = config;
const socket = {};

function connect (server) {
  socket.io = socketIo(server, {
    cors: {
      origins: [`http://${host}:${port}`]
    }
  });
}

module.exports = { connect, socket };

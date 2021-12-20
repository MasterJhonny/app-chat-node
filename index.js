// import packege express incialization server
const express = require('express');
const config = require('./config');
// import corss
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const port = config.port;
const host = config.host;


// import socket
const socket = require('./socket');
// import apirouter
const routerApi = require('./router/index');
// import function error handlers
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { SocketAddress } = require('net');
const { Socket } = require('socket.io');


// run use corss
app.use(cors());
// for read the body in json format
app.use(express.json());
// conction socket
socket.connect(server);
// run ruoters
routerApi(app);

// use function error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// for server file static, ponemos the name of file como argunmento
app.use('/app', express.static('public'));


socket.socket.io.on('connection', (sokt) => {

  sokt.on('init', (data) => {
    sokt.broadcast.emit('en:linea', {
      status: 'en linea',
      data: data
    });
  })

  sokt.on('typing', (data) => {
    sokt.broadcast.emit('typing', data);
  })
})


server.listen(port, () => {
    console.log(`run http://${host}:${port}`)
})

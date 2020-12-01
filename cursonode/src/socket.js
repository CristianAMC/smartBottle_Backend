const socket_io  = require('socket.io'); 
const socket = {}; 

function connect(server) {
    socket.io  =  socket_io(server); 
}

module.exports = { 
    connect: connect,
    socket: socket
}

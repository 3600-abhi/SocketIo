const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;


app.use('/', express.static(__dirname + '/public'));


io.on('connection', function (socket) {

    console.log('A user connected', socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected', socket.id);
    });

    socket.on('new_msg', function (data) {

        /** 
         * io.emit('msg_rcvd', data);
         * It will send the message to all the clients
        */

        io.emit('msg_rcvd', data);


        /** 
         * socket.emit('msg_rcvd', data);
         * It will send the message to the client who sended the message means (itself only)
         * Because the socket object belongs to that particular client
        */

        /** 
         * socket.broadcast.emit('msg_rcvd', data);
         * Except the client who sended the message it will send to all clients
        */
    });
});

server.listen(PORT, function () {
    console.log(`Successfully started the server at PORT : ${PORT}`);
});
declare var require: any;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle socket events here
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const express = require('express');
const socket = require('socket.io');

// App , Port setup and start server
const app = express();
const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Messages array store
const messages = [];

// Static files
app.use(express.static('public'));

//Socket setup
const io = socket(server);
io.on('connection', socket => {
    console.log('Socket connected', socket.id);
    socket.emit('initial-connection', messages);

    // Chat events
    socket.on('chat', data => {
        messages.push(data);
        io.socket.emit('chat', data);
    });

    // Typing event
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});

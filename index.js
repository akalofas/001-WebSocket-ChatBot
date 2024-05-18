const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const debug = require('debug');

require('dotenv').config();

const app = express();

// Create debug instances with color
const serverDebug = debug('app:server');
serverDebug.color = 2; // Green
const ioDebug = debug('app:socket');
ioDebug.color = 4; // Red

// CORS middleware for all routes
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	})
);

const port = process.env.PORT || 9000;

const server = http.createServer(app);

app.use(express.static('public'));

server.listen(port, () => {
	serverDebug(`Server is running on port ${port}`);
});

const io = socketIO(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	},
});

const messages = [];

io.on('connection', (socket) => {
	ioDebug('Socket connected', socket.id);

	socket.emit('initial-connection', messages);

	socket.on('chat', (data) => {
		messages.push(data);
		io.emit('chat', data);
		ioDebug(`Chat message received: ${JSON.stringify(data)}`);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
		ioDebug(`Typing event from ${data}`);
	});
});

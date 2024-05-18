// Connect to server
// const socket = io.connect('http://localhost:5850');

// DOM elements
const messageEl = document.getElementById('message');
const handleEl = document.getElementById('handle');
const btnEl = document.getElementById('send');
const chatlistEl = document.getElementById('chatlist');
const feedbackEl = document.getElementById('feedback');

// Shared Functions
function sendMessage(event) {
    if (messageEl.value.trim() && handleEl.value.trim()) {
        socket.emit('chat', {
            handle: handleEl.value,
            message: messageEl.value,
        });
        messageEl.value = '';
    }
}

// Emit chat message event
btnEl.addEventListener('click', sendMessage);
messageEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage(event);
    }
})

// Emit typing event
messageEl.addEventListener('keypress', () => {
	socket.emit('typing', handleEl.value);
});

// Listen for initial connection and load chat history
socket.on('initial-connection', (messages) => {
	chatlistEl.innerHTML = '';
	messages.forEach(appendMessage);
});

// Listen for chat messages and append them
socket.on('chat', appendMessage);

// Display typing feedback
let typingTimeout;
socket.on('typing', (data) => {
	clearTimeout(typingTimeout);
	feedbackEl.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
	typingTimeout = setTimeout(() => (feedbackEl.innerHTML = ''), 32000);
});

// Function to append messages to chat
function appendMessage(msg) {
    clearTimeout(typingTimeout);
	const messageDiv = document.createElement('div');
    messageDiv.setAttribute('data-time', msg.handle);
    messageDiv.classList.add('msg');
    messageDiv.textContent = `${msg.message}`;
    if (msg.handle === handleEl.value) {
        messageDiv.classList.add('send');
	    chatlistEl.appendChild(messageDiv);
    } else {
        messageDiv.classList.add('rcvd');
        chatlistEl.appendChild(messageDiv);
    }
}

// Handle connection errors
socket.on('connect_error', (error) => {
	console.error('Connection failed:', error);
});

// Handle disconnection
socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

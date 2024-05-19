// Socket Connection Handlers
// --------------------------
// Handle initial connection, disconnections, and connection errors.
socket.on('initial-connection', (messages) => {
	chatlistEl.innerHTML = '';
	messages.forEach(appendMessage);
});

socket.on('connect_error', (error) => {
	console.error('Connection failed:', error);
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

// DOM Elements
// ------------
// References to the DOM elements used in the script.
const messageEl = document.getElementById('message');
const handleEl = document.getElementById('handle');
const btnEl = document.getElementById('send');
const chatlistEl = document.getElementById('chatlist');
const feedbackEl = document.getElementById('feedback');

// Event Listeners
// ---------------
// Setup event listeners for sending messages and displaying typing feedback.
btnEl.addEventListener('click', sendMessage);
messageEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage(event);
    }
});

messageEl.addEventListener('keypress', () => {
    socket.emit('typing', handleEl.value);
});

// Socket Event Handlers
// ---------------------
// Listen for chat messages and typing events.
socket.on('chat', appendMessage);

socket.on('typing', (data) => {
    clearTimeout(typingTimeout);
    feedbackEl.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
    typingTimeout = setTimeout(() => (feedbackEl.innerHTML = ''), 2000);
});

// Shared Variables
// ------------------
// Typing indicator
let typingTimeout;
// Track the last sender whose name was displayed
let lastDisplayedSender = null; 

// Shared Functions
// -----------------
// Auto Scroll to bottom when send or receive a message
function scrollToBottom() {
	chatlistEl.scrollTop = chatlistEl.scrollHeight;
}


// Function for sending messages
function sendMessage(event) {
    if (messageEl.value.trim() && handleEl.value.trim()) {
        socket.emit('chat', {
            handle: handleEl.value,
            message: messageEl.value,
        });
        messageEl.value = '';
    }
}

// Function for appending messages to the chat list.
function appendMessage(msg) {
    clearTimeout(typingTimeout);

    const messageDiv = document.createElement('div');
    const messageTextDiv = document.createElement('div');
    const senderDiv = document.createElement('div');
    messageTextDiv.classList.add('chat__bubble');
    messageTextDiv.textContent = msg.message;

    if (msg.handle === handleEl.value) {
        messageDiv.classList.add('chat__bubble--sent');
        messageTextDiv.classList.add('chat__message--sent');
        senderDiv.classList.add('chat__message--sender');
    } else {
        messageDiv.classList.add('chat__bubble--received');
        messageTextDiv.classList.add('chat__message--received');
        senderDiv.classList.add('chat__message--receiver');
    }

    let showSender = lastDisplayedSender !== msg.handle;

    if (showSender) {
        senderDiv.textContent = msg.handle;
        messageDiv.appendChild(senderDiv);
        lastDisplayedSender = msg.handle;
    }

    messageDiv.appendChild(messageTextDiv);

    chatlistEl.appendChild(messageDiv);
    scrollToBottom();
}

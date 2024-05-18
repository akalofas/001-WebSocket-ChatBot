// Connect to server
const httpOrHttps = process.env.HTTPS || 'http';
const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || 9000;
const socket = io.connect(`${httpOrHttps}://${server}:${port}`);

// Variables
const messageEl = document.getElementById('message');
const handleEl = document.getElementById('handle');
const btnEl = document.getElementById('send');
const outputEl = document.getElementById('output');
const feedbackEl = document.getElementById('feedback');

// Handle emit events
btnEl.addEventListener('click', event => {
    socket.emit('chat', {
        messageEl: messageEl.value,
        handleEl: handleEl.value
    });
    messageEl.value = '';
});

// Message input field
messageEl.addEventListener('keypress', event => {
    socket.emit('typing', handleEl.value);
});

// Chat History
socket.on('initial-connection', (messages) => {
    for (let m of messages) {
        appendMessage(m);
    }
});

// Events
socket.on('chat', appendMessage);

socket.on('typing', data => {
    feedbackEl.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

function appendMessage(msg) {
    feedbackEl.innerHTML = '';
    outputEl.innerHTML += `<p><strong>${msg.handleEl}</strong>: ${msg.messageEl}</p>`;
}
const socket = io();

document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const message = document.getElementById('messageInput').value;
    const room = 'someRoom'; // User's room

    socket.emit('chatMessage', { room, message });

    document.getElementById('messageInput').value = '';
});  

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.getElementById('chatWindow').appendChild(messageElement);
});
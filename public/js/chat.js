const socket = io(); // Connect to the server

// Join a room
const room = 'SomeRoomName';
socket.emit('joinRoom', room);

// Send a message
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let message = document.getElementById('messageInput').value;
    socket.emit('chatMessage', { message, room });
    document.getElementById('messageInput').value = '';
});

// Add a new message to the chat window
socket.on('chatMessage', function(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg; // Insert the message text into the div
    document.getElementById('chatWindow').appendChild(messageDiv);
});



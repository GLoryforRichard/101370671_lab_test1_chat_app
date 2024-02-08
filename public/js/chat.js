const socket = io(); // Connect to the server

// Join a room
const room = 'SomeRoomName';
socket.emit('joinRoom', { username: "Username", room: "Roomname" });

// Send a message
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let message = document.getElementById('messageInput').value;
    socket.emit('chatMessage', { message, room });
    document.getElementById('messageInput').value = '';
});

// Load the chat history
socket.on('historyMessages', function(messages) {
    const chatWindow = document.getElementById('chatWindow');
    // Clear the chat window
    chatWindow.innerHTML = '';
    // Add each message to the chat window
    messages.forEach(function(msg) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${msg.from_user}: ${msg.message}`;
        chatWindow.appendChild(messageDiv);
    });
});

// Request chat history from the server
socket.emit('requestHistory', room);

// Add a new message to the chat window
socket.on('chatMessage', function(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg; // Insert the message text into the div
    document.getElementById('chatWindow').appendChild(messageDiv);
});

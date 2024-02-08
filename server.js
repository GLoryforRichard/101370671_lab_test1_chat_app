const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB Atlas connection string
// const mongoDBAtlasUri = 'mongodb+srv://richard:lsz190166134@chatdb.vq15ixf.mongodb.net/?retryWrites=true&w=majority';

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Chat server is running');
  res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', async ({ username, room }) => {
      socket.join(room);
      const messages = await Message.find({ room }).sort('date_sent');
      socket.emit('historyMessages', messages);
    });
  

    socket.on('chatMessage', async ({ room, message }) => {
        console.log(message); 
        try {
            const newMessage = new Message({
                from_user: socket.id, // Use the socket ID as the user's ID
                room,
                message
            });

            const msg = await Message.create({ from_user: socket.id, room, message });

            io.to(room).emit('chatMessage', {
                from_user: socket.id,
                room,
                message
            }); // Broadcast the message to everyone in the room
          } catch (error) {
            console.error('Message save error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

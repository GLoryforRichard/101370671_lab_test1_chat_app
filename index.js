const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB Atlas connection string
const mongoDBAtlasUri = 'mongodb+srv://richard:lsz190166134@chatdb.vq15ixf.mongodb.net/?retryWrites=true&w=majority';

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

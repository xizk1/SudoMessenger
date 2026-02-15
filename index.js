const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Для теста разрешаем всё
    methods: ["GET", "POST"]
  }
});

// Хранилище сообщений (в памяти)
let messages = [];
let users = {};

// Главная страница
app.get('/', (req, res) => {
  res.send('Сервер SudoMessenger работает!');
});

// Получить историю сообщений
app.get('/api/messages', (req, res) => {
  res.json(messages.slice(-50)); // последние 50 сообщений
});

// WebSocket подключения
io.on('connection', (socket) => {
  console.log('🔵 Пользователь подключился:', socket.id);
  
  // Отправляем историю новому пользователю
  socket.emit('chat history', messages.slice(-50));
  
  // Отправляем список онлайн пользователей
  io.emit('users online', Object.keys(users).length);
  
  // Когда пользователь устанавливает имя
  socket.on('set username', (username) => {
    users[socket.id] = username;
    io.emit('users online', Object.keys(users).length);
    io.emit('system message', `✨ ${username} присоединился к чату`);
  });
  
  // Получение сообщения
  socket.on('chat message', (data) => {
    const messageData = {
      id: Date.now().toString(),
      text: data.text,
      user: data.user || users[socket.id] || 'Аноним',
      time: new Date().toLocaleTimeString(),
      socketId: socket.id
    };
    
    messages.push(messageData);
    if (messages.length > 100) messages.shift(); // храним только 100 сообщений
    
    // Рассылаем всем
    io.emit('chat message', messageData);
    console.log(`💬 ${messageData.user}: ${messageData.text}`);
  });
  
  // Печатает...
  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  });
  
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });
  
  // Отключение
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      io.emit('system message', `👋 ${username} покинул чат`);
      delete users[socket.id];
    }
    io.emit('users online', Object.keys(users).length);
    console.log('🔴 Пользователь отключился:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📱 Адрес: https://sudomessenger.onrender.com`);
});
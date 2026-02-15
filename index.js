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
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ============= ХРАНИЛИЩА ДАННЫХ =============
let users = {}; // { socketId: { username, avatar, channel, contacts } }
let channels = {
    'general': { 
        name: 'Общий', 
        messages: [], 
        users: [],
        description: 'Основной канал для всех'
    },
    'random': { 
        name: 'Случайный', 
        messages: [], 
        users: [],
        description: 'Для обсуждения всего подряд'
    }
};
let privateMessages = {}; // { chatId: [messages] }

// ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============
function generateChatId(user1, user2) {
    return [user1, user2].sort().join('_');
}

// ============= ОСНОВНЫЕ МАРШРУТЫ =============
app.get('/', (req, res) => {
    res.send('Сервер SudoMessenger работает!');
});

app.get('/api/channels', (req, res) => {
    res.json(Object.values(channels));
});

// ============= WEB SOCKETS =============
io.on('connection', (socket) => {
    console.log('🔵 Новое подключение:', socket.id);
    
    // По умолчанию в общем канале
    socket.join('general');
    
    // Инициализация пользователя
    users[socket.id] = {
        id: socket.id,
        username: 'Аноним',
        avatar: '😊',
        channel: 'general',
        contacts: [],
        online: true,
        lastSeen: new Date()
    };
    
    // ============= УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ =============
    
    // Установка имени
    socket.on('set username', (username) => {
        users[socket.id].username = username;
        users[socket.id].avatar = users[socket.id].avatar || '😊';
        
        // Добавляем в общий канал
        channels['general'].users.push({
            id: socket.id,
            username: username,
            avatar: users[socket.id].avatar
        });
        
        // Отправляем приветственное сообщение
        const welcomeMsg = {
            type: 'system',
            text: `✨ ${username} присоединился к чату`,
            channel: 'general',
            time: new Date().toLocaleTimeString()
        };
        channels['general'].messages.push(welcomeMsg);
        io.to('general').emit('system message', welcomeMsg);
        
        // Обновляем списки
        io.emit('users online', getOnlineCount());
        io.emit('users list', getUsersList());
        socket.emit('channels list', Object.values(channels));
        socket.emit('channel history', channels['general'].messages.slice(-50));
    });
    
    // Смена аватара
    socket.on('change avatar', (avatar) => {
        users[socket.id].avatar = avatar;
        
        // Обновляем в каналах
        Object.keys(channels).forEach(channelName => {
            const userInChannel = channels[channelName].users.find(u => u.id === socket.id);
            if (userInChannel) {
                userInChannel.avatar = avatar;
            }
        });
        
        io.emit('users list', getUsersList());
        socket.emit('avatar changed', avatar);
    });
    
    // ============= УПРАВЛЕНИЕ КАНАЛАМИ =============
    
    // Создание канала
    socket.on('create channel', (channelData) => {
        const { name, description } = channelData;
        const channelKey = name.toLowerCase().replace(/\s+/g, '_');
        
        if (!channels[channelKey]) {
            channels[channelKey] = {
                name: name,
                description: description || '',
                messages: [],
                users: [],
                createdBy: users[socket.id].username,
                createdAt: new Date().toLocaleString()
            };
            
            // Оповещаем всех
            io.emit('channel created', {
                key: channelKey,
                ...channels[channelKey]
            });
            
            socket.emit('system message', {
                type: 'success',
                text: `✅ Канал "${name}" создан!`,
                time: new Date().toLocaleTimeString()
            });
        } else {
            socket.emit('system message', {
                type: 'error',
                text: `❌ Канал "${name}" уже существует`,
                time: new Date().toLocaleTimeString()
            });
        }
    });
    
    // Переключение канала
    socket.on('switch channel', (channelKey) => {
        if (!channels[channelKey]) return;
        
        // Убираем из старого канала
        const oldChannel = users[socket.id].channel;
        if (channels[oldChannel]) {
            channels[oldChannel].users = channels[oldChannel].users.filter(u => u.id !== socket.id);
        }
        
        // Добавляем в новый канал
        socket.leave(oldChannel);
        socket.join(channelKey);
        users[socket.id].channel = channelKey;
        
        channels[channelKey].users.push({
            id: socket.id,
            username: users[socket.id].username,
            avatar: users[socket.id].avatar
        });
        
        // Отправляем историю канала
        socket.emit('channel history', channels[channelKey].messages.slice(-50));
        socket.emit('channel users', channels[channelKey].users);
        socket.emit('current channel', {
            key: channelKey,
            name: channels[channelKey].name
        });
    });
    
    // ============= СООБЩЕНИЯ =============
    
    // Публичное сообщение в канал
    socket.on('chat message', (data) => {
        const user = users[socket.id];
        const currentChannel = user.channel;
        
        const messageData = {
            id: Date.now().toString() + Math.random(),
            type: 'message',
            text: data.text,
            user: user.username,
            avatar: user.avatar,
            channel: currentChannel,
            time: new Date().toLocaleTimeString(),
            userId: socket.id
        };
        
        // Сохраняем в истории канала
        channels[currentChannel].messages.push(messageData);
        if (channels[currentChannel].messages.length > 100) {
            channels[currentChannel].messages.shift();
        }
        
        // Отправляем всем в канале
        io.to(currentChannel).emit('chat message', messageData);
        console.log(`💬 [${channels[currentChannel].name}] ${user.username}: ${data.text}`);
    });
    
    // Приватное сообщение
    socket.on('private message', (data) => {
        const { to, text } = data;
        const fromUser = users[socket.id];
        
        // Находим получателя
        const toUser = Object.values(users).find(u => u.username === to);
        
        if (toUser) {
            const chatId = generateChatId(fromUser.username, to);
            
            if (!privateMessages[chatId]) {
                privateMessages[chatId] = [];
            }
            
            const messageData = {
                id: Date.now().toString(),
                type: 'private',
                text: text,
                from: fromUser.username,
                to: to,
                time: new Date().toLocaleTimeString(),
                avatar: fromUser.avatar
            };
            
            privateMessages[chatId].push(messageData);
            
            // Отправляем получателю
            io.to(toUser.id).emit('private message', messageData);
            // Отправляем отправителю
            socket.emit('private message sent', messageData);
        } else {
            socket.emit('system message', {
                type: 'error',
                text: `❌ Пользователь "${to}" не найден`,
                time: new Date().toLocaleTimeString()
            });
        }
    });
    
    // ============= КОНТАКТЫ =============
    
    // Добавление в контакты
    socket.on('add contact', (contactName) => {
        const user = users[socket.id];
        
        // Проверяем, существует ли пользователь
        const contactExists = Object.values(users).some(u => u.username === contactName);
        
        if (contactExists && contactName !== user.username) {
            if (!user.contacts.includes(contactName)) {
                user.contacts.push(contactName);
                socket.emit('contacts list', user.contacts);
                socket.emit('system message', {
                    type: 'success',
                    text: `✅ ${contactName} добавлен в контакты`,
                    time: new Date().toLocaleTimeString()
                });
            }
        } else {
            socket.emit('system message', {
                type: 'error',
                text: `❌ Пользователь "${contactName}" не найден`,
                time: new Date().toLocaleTimeString()
            });
        }
    });
    
    // Удаление из контактов
    socket.on('remove contact', (contactName) => {
        const user = users[socket.id];
        user.contacts = user.contacts.filter(c => c !== contactName);
        socket.emit('contacts list', user.contacts);
    });
    
    // Получение списка контактов
    socket.on('get contacts', () => {
        socket.emit('contacts list', users[socket.id].contacts);
    });
    
    // ============= СТАТУСЫ =============
    
    // Печатает...
    socket.on('typing', (data) => {
        const { channel, username } = data;
        socket.to(channel).emit('user typing', {
            username: username,
            channel: channel
        });
    });
    
    socket.on('stop typing', (data) => {
        const { channel } = data;
        socket.to(channel).emit('user stop typing', { channel: channel });
    });
    
    // ============= ОТКЛЮЧЕНИЕ =============
    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            // Убираем из каналов
            Object.keys(channels).forEach(channelName => {
                channels[channelName].users = channels[channelName].users.filter(u => u.id !== socket.id);
            });
            
            // Оповещаем
            const leaveMsg = {
                type: 'system',
                text: `👋 ${user.username} покинул чат`,
                channel: 'general',
                time: new Date().toLocaleTimeString()
            };
            channels['general'].messages.push(leaveMsg);
            io.emit('system message', leaveMsg);
            
            delete users[socket.id];
            
            // Обновляем списки
            io.emit('users online', getOnlineCount());
            io.emit('users list', getUsersList());
        }
        console.log('🔴 Отключился:', socket.id);
    });
});

// ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============
function getOnlineCount() {
    return Object.keys(users).length;
}

function getUsersList() {
    return Object.values(users).map(u => ({
        username: u.username,
        avatar: u.avatar,
        online: u.online,
        id: u.id
    }));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`📱 http://localhost:${PORT}`);
});
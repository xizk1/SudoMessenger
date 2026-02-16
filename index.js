const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ============= ГЛАВНАЯ СТРАНИЦА =============
app.get('/', (req, res) => {
    res.send('работает!');
});

// ============= БАЗА ДАННЫХ (В ФАЙЛАХ) =============
const DATA_DIR = './data';
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Загрузка данных
let users = loadData('users.json', {}); // { username: { password, nickname, avatar, friends, friendRequests, settings, channels, createdAt } }
let channels = loadData('channels.json', {}); // { channelId: { name, description, creator, members, messages, createdAt } }
let messages = loadData('messages.json', []); // { id, from, to, text, type, channel, timestamp }
let notifications = loadData('notifications.json', {}); // { username: [notifications] }

function loadData(filename, defaultValue) {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8');
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

function saveData(filename, data) {
    fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// ============= API МАРШРУТЫ =============

// Регистрация
app.post('/api/register', (req, res) => {
    const { username, password, nickname } = req.body;
    
    if (users[username]) {
        return res.json({ success: false, error: 'Username already exists' });
    }
    
    users[username] = {
        username,
        password, // В реальном проекте хешировать!
        nickname: nickname || username,
        avatar: '😊',
        friends: [],
        friendRequests: [],
        channels: ['general'],
        settings: {
            theme: 'light',
            notifications: true,
            privacy: 'everyone' // everyone, friends, nobody
        },
        createdAt: new Date().toISOString(),
        online: false,
        lastSeen: new Date().toISOString()
    };
    
    saveData('users.json', users);
    
    // Добавляем в общий канал
    if (!channels['general']) {
        channels['general'] = {
            id: 'general',
            name: 'Общий чат',
            description: 'Главный канал для всех',
            creator: 'system',
            members: [],
            messages: [],
            createdAt: new Date().toISOString(),
            type: 'public'
        };
    }
    channels['general'].members.push(username);
    saveData('channels.json', channels);
    
    res.json({ success: true });
});

// Логин
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!users[username] || users[username].password !== password) {
        return res.json({ success: false, error: 'Invalid username or password' });
    }
    
    users[username].online = true;
    users[username].lastSeen = new Date().toISOString();
    saveData('users.json', users);
    
    res.json({ 
        success: true, 
        user: {
            username: users[username].username,
            nickname: users[username].nickname,
            avatar: users[username].avatar,
            friends: users[username].friends,
            settings: users[username].settings
        }
    });
});

// Поиск пользователей
app.get('/api/users/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const results = Object.values(users)
        .filter(u => 
            u.username.toLowerCase().includes(query) || 
            (u.nickname && u.nickname.toLowerCase().includes(query))
        )
        .map(u => ({
            username: u.username,
            nickname: u.nickname,
            avatar: u.avatar,
            online: u.online
        }))
        .slice(0, 20);
    
    res.json(results);
});

// Поиск каналов
app.get('/api/channels/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const results = Object.values(channels)
        .filter(c => 
            c.name.toLowerCase().includes(query) || 
            (c.description && c.description.toLowerCase().includes(query))
        )
        .map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            members: c.members.length,
            type: c.type
        }))
        .slice(0, 20);
    
    res.json(results);
});

// Получить профиль пользователя
app.get('/api/user/:username', (req, res) => {
    const username = req.params.username;
    const currentUser = req.query.currentUser;
    
    if (!users[username]) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const user = users[username];
    const isFriend = users[currentUser]?.friends.includes(username);
    const hasRequest = users[currentUser]?.friendRequests.includes(username);
    const isCurrentUser = currentUser === username;
    
    res.json({
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        online: user.online,
        lastSeen: user.lastSeen,
        createdAt: user.createdAt,
        isFriend,
        hasRequest,
        isCurrentUser
    });
});

// Отправить заявку в друзья
app.post('/api/friends/request', (req, res) => {
    const { from, to } = req.body;
    
    if (!users[to] || !users[from]) {
        return res.json({ success: false, error: 'User not found' });
    }
    
    if (users[from].friends.includes(to)) {
        return res.json({ success: false, error: 'Already friends' });
    }
    
    if (!users[to].friendRequests.includes(from)) {
        users[to].friendRequests.push(from);
        saveData('users.json', users);
        
        // Создаем уведомление
        if (!notifications[to]) notifications[to] = [];
        notifications[to].push({
            id: generateId(),
            type: 'friend_request',
            from: from,
            text: `${users[from].nickname} хочет добавить вас в друзья`,
            timestamp: new Date().toISOString(),
            read: false
        });
        saveData('notifications.json', notifications);
        
        // Отправляем уведомление через socket если онлайн
        const toSocket = onlineUsers[to];
        if (toSocket) {
            io.to(toSocket).emit('notification', notifications[to].slice(-1)[0]);
        }
    }
    
    res.json({ success: true });
});

// Принять заявку в друзья
app.post('/api/friends/accept', (req, res) => {
    const { username, from } = req.body;
    
    if (!users[username] || !users[from]) {
        return res.json({ success: false });
    }
    
    // Удаляем из заявок
    users[username].friendRequests = users[username].friendRequests.filter(f => f !== from);
    
    // Добавляем в друзья обоим
    if (!users[username].friends.includes(from)) {
        users[username].friends.push(from);
    }
    if (!users[from].friends.includes(username)) {
        users[from].friends.push(username);
    }
    
    saveData('users.json', users);
    
    // Уведомление отправителю
    if (!notifications[from]) notifications[from] = [];
    notifications[from].push({
        id: generateId(),
        type: 'friend_accept',
        from: username,
        text: `${users[username].nickname} принял(а) вашу заявку`,
        timestamp: new Date().toISOString(),
        read: false
    });
    saveData('notifications.json', notifications);
    
    const fromSocket = onlineUsers[from];
    if (fromSocket) {
        io.to(fromSocket).emit('notification', notifications[from].slice(-1)[0]);
    }
    
    res.json({ success: true });
});

// Отклонить заявку
app.post('/api/friends/reject', (req, res) => {
    const { username, from } = req.body;
    
    if (users[username]) {
        users[username].friendRequests = users[username].friendRequests.filter(f => f !== from);
        saveData('users.json', users);
    }
    
    res.json({ success: true });
});

// Получить уведомления
app.get('/api/notifications/:username', (req, res) => {
    const username = req.params.username;
    res.json(notifications[username] || []);
});

// Отметить уведомления как прочитанные
app.post('/api/notifications/read', (req, res) => {
    const { username } = req.body;
    if (notifications[username]) {
        notifications[username].forEach(n => n.read = true);
        saveData('notifications.json', notifications);
    }
    res.json({ success: true });
});

// Создать канал
app.post('/api/channels/create', (req, res) => {
    const { name, description, creator, type } = req.body;
    const channelId = name.toLowerCase().replace(/\s+/g, '_') + '_' + generateId();
    
    channels[channelId] = {
        id: channelId,
        name,
        description: description || '',
        creator,
        members: [creator],
        messages: [],
        createdAt: new Date().toISOString(),
        type: type || 'public'
    };
    
    saveData('channels.json', channels);
    
    // Добавляем пользователю
    if (users[creator]) {
        users[creator].channels.push(channelId);
        saveData('users.json', users);
    }
    
    res.json({ success: true, channel: channels[channelId] });
});

// Получить каналы пользователя
app.get('/api/user/:username/channels', (req, res) => {
    const username = req.params.username;
    const userChannels = users[username]?.channels || ['general'];
    
    const result = userChannels
        .map(id => channels[id])
        .filter(c => c)
        .map(c => ({
            id: c.id,
            name: c.name,
            unread: 0 // TODO: реализовать счетчик непрочитанных
        }));
    
    res.json(result);
});

// ============= WEB SOCKETS (реальное время) =============
const onlineUsers = {}; // { username: socketId }

io.on('connection', (socket) => {
    console.log('🔵 Новое подключение:', socket.id);
    
    socket.on('user online', (username) => {
        onlineUsers[username] = socket.id;
        if (users[username]) {
            users[username].online = true;
            saveData('users.json', users);
            
            // Оповещаем друзей
            users[username].friends.forEach(friend => {
                const friendSocket = onlineUsers[friend];
                if (friendSocket) {
                    io.to(friendSocket).emit('friend online', username);
                }
            });
        }
    });
    
    // Отправка сообщения
    socket.on('send message', (data) => {
        const { from, to, text, type } = data;
        
        const message = {
            id: generateId(),
            from,
            to,
            text,
            type: type || 'private',
            timestamp: new Date().toISOString(),
            read: false
        };
        
        messages.push(message);
        saveData('messages.json', messages);
        
        // Если это личное сообщение
        if (type === 'private') {
            const toSocket = onlineUsers[to];
            if (toSocket) {
                io.to(toSocket).emit('new message', message);
            }
            
            // Уведомление если офлайн
            if (!toSocket) {
                if (!notifications[to]) notifications[to] = [];
                notifications[to].push({
                    id: generateId(),
                    type: 'message',
                    from,
                    text: `Новое сообщение от ${users[from].nickname}`,
                    timestamp: new Date().toISOString(),
                    read: false
                });
                saveData('notifications.json', notifications);
            }
        }
        
        // Если сообщение в канал
        if (type === 'channel') {
            const channel = channels[to];
            if (channel) {
                channel.messages.push(message);
                saveData('channels.json', channels);
                
                // Отправляем всем участникам канала
                channel.members.forEach(member => {
                    const memberSocket = onlineUsers[member];
                    if (memberSocket && member !== from) {
                        io.to(memberSocket).emit('channel message', {
                            channel: to,
                            message
                        });
                    }
                });
            }
        }
        
        socket.emit('message sent', message);
    });
    
    socket.on('disconnect', () => {
        // Находим пользователя по socket.id
        let disconnectedUser = null;
        for (const [username, socketId] of Object.entries(onlineUsers)) {
            if (socketId === socket.id) {
                disconnectedUser = username;
                delete onlineUsers[username];
                if (users[username]) {
                    users[username].online = false;
                    users[username].lastSeen = new Date().toISOString();
                    saveData('users.json', users);
                    
                    // Оповещаем друзей
                    users[username].friends.forEach(friend => {
                        const friendSocket = onlineUsers[friend];
                        if (friendSocket) {
                            io.to(friendSocket).emit('friend offline', username);
                        }
                    });
                }
                break;
            }
        }
        console.log('🔴 Отключился:', disconnectedUser || socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
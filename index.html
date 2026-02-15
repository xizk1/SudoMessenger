<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SudoMessenger - как Telegram</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        :root {
            --tg-blue: #3390ec;
            --tg-bg: #f0f2f5;
            --tg-white: #ffffff;
            --tg-gray: #e9ecef;
            --tg-dark: #1e2a3a;
            --tg-green: #27ae60;
            --tg-red: #e74c3c;
        }

        body {
            background: var(--tg-bg);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .app-container {
            width: 1400px;
            height: 900px;
            max-width: 100%;
            max-height: 100vh;
            background: var(--tg-white);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            overflow: hidden;
            position: relative;
        }

        /* ===== ЛЕВАЯ ПАНЕЛЬ (КОНТАКТЫ) ===== */
        .left-panel {
            width: 350px;
            background: var(--tg-white);
            border-right: 1px solid var(--tg-gray);
            display: flex;
            flex-direction: column;
        }

        .user-profile {
            padding: 20px;
            background: var(--tg-bg);
            display: flex;
            align-items: center;
            gap: 15px;
            border-bottom: 1px solid var(--tg-gray);
        }

        .profile-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .profile-info {
            flex: 1;
        }

        .profile-name {
            font-weight: bold;
            font-size: 16px;
        }

        .profile-status {
            font-size: 13px;
            color: #666;
        }

        .search-box {
            padding: 15px 20px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 12px 20px;
            border: 1px solid var(--tg-gray);
            border-radius: 25px;
            outline: none;
            font-size: 14px;
            background: var(--tg-bg);
            transition: all 0.3s;
        }

        .search-box input:focus {
            border-color: var(--tg-blue);
            background: var(--tg-white);
        }

        .search-results {
            position: absolute;
            top: 70px;
            left: 20px;
            right: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            max-height: 300px;
            overflow-y: auto;
            z-index: 100;
            display: none;
        }

        .search-results.show {
            display: block;
        }

        .search-result-item {
            padding: 12px 15px;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: background 0.2s;
            border-bottom: 1px solid var(--tg-gray);
        }

        .search-result-item:hover {
            background: var(--tg-bg);
        }

        .result-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .result-info {
            flex: 1;
        }

        .result-name {
            font-weight: 600;
            font-size: 14px;
        }

        .result-username {
            font-size: 12px;
            color: #666;
        }

        .tabs {
            display: flex;
            padding: 0 20px;
            border-bottom: 1px solid var(--tg-gray);
        }

        .tab {
            flex: 1;
            padding: 15px 0;
            text-align: center;
            cursor: pointer;
            font-weight: 500;
            color: #666;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }

        .tab.active {
            color: var(--tg-blue);
            border-bottom-color: var(--tg-blue);
        }

        .chats-list {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
        }

        .chat-item {
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 2px;
            position: relative;
        }

        .chat-item:hover {
            background: var(--tg-bg);
        }

        .chat-item.active {
            background: var(--tg-blue);
            color: white;
        }

        .chat-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .online-dot {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 12px;
            height: 12px;
            background: var(--tg-green);
            border-radius: 50%;
            border: 2px solid white;
        }

        .chat-info {
            flex: 1;
        }

        .chat-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .chat-name {
            font-weight: 600;
            font-size: 15px;
        }

        .chat-time {
            font-size: 11px;
            color: #999;
        }

        .chat-last-message {
            font-size: 13px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 180px;
        }

        .chat-item.active .chat-last-message,
        .chat-item.active .chat-time {
            color: rgba(255,255,255,0.8);
        }

        .unread-badge {
            background: var(--tg-blue);
            color: white;
            border-radius: 20px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: bold;
            margin-left: 10px;
        }

        /* ===== ЦЕНТРАЛЬНАЯ ПАНЕЛЬ (ЧАТ) ===== */
        .chat-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--tg-bg);
        }

        .chat-header-main {
            padding: 15px 25px;
            background: var(--tg-white);
            border-bottom: 1px solid var(--tg-gray);
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .chat-header-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chat-header-info {
            flex: 1;
        }

        .chat-header-name {
            font-weight: bold;
            font-size: 18px;
        }

        .chat-header-status {
            font-size: 13px;
            color: #666;
        }

        .chat-header-actions {
            display: flex;
            gap: 15px;
        }

        .header-action {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--tg-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 20px;
        }

        .header-action:hover {
            background: var(--tg-gray);
        }

        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSIjZjBmMmY1Ii8+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0iI2YwZjJmNSIvPjwvc3ZnPg==');
        }

        .message {
            max-width: 65%;
            padding: 12px 18px;
            border-radius: 18px;
            position: relative;
            word-wrap: break-word;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.outgoing {
            background: var(--tg-blue);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }

        .message.incoming {
            background: var(--tg-white);
            color: black;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }

        .message.system {
            background: rgba(0,0,0,0.05);
            color: #666;
            align-self: center;
            font-size: 12px;
            padding: 5px 15px;
            border-radius: 20px;
            max-width: 90%;
        }

        .message-sender {
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 5px;
            color: var(--tg-blue);
        }

        .message.incoming .message-sender {
            color: var(--tg-blue);
        }

        .message-text {
            font-size: 14px;
            line-height: 1.4;
        }

        .message-time {
            font-size: 10px;
            opacity: 0.7;
            margin-top: 5px;
            text-align: right;
        }

        .typing-indicator {
            padding: 15px 25px;
            color: #666;
            font-style: italic;
            font-size: 13px;
            min-height: 50px;
        }

        .message-input-area {
            padding: 20px 25px;
            background: var(--tg-white);
            border-top: 1px solid var(--tg-gray);
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .message-input-area input {
            flex: 1;
            padding: 15px 20px;
            border: 1px solid var(--tg-gray);
            border-radius: 30px;
            outline: none;
            font-size: 15px;
            background: var(--tg-bg);
            transition: all 0.3s;
        }

        .message-input-area input:focus {
            border-color: var(--tg-blue);
            background: var(--tg-white);
        }

        .send-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--tg-blue);
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        .send-button:hover {
            transform: scale(1.1);
        }

        .attach-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid var(--tg-gray);
            background: var(--tg-white);
            color: #666;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* ===== ПРАВАЯ ПАНЕЛЬ (ПРОФИЛЬ) ===== */
        .right-panel {
            width: 300px;
            background: var(--tg-white);
            border-left: 1px solid var(--tg-gray);
            display: flex;
            flex-direction: column;
        }

        .profile-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid var(--tg-gray);
        }

        .profile-big-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            cursor: pointer;
        }

        .profile-display-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .profile-username {
            color: #666;
            margin-bottom: 15px;
        }

        .profile-stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            padding: 15px;
            border-top: 1px solid var(--tg-gray);
            border-bottom: 1px solid var(--tg-gray);
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            font-weight: bold;
            font-size: 18px;
        }

        .stat-label {
            font-size: 12px;
            color: #666;
        }

        .profile-actions {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .action-button {
            padding: 12px;
            border: none;
            border-radius: 10px;
            background: var(--tg-bg);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .action-button.primary {
            background: var(--tg-blue);
            color: white;
        }

        .action-button.danger {
            background: var(--tg-red);
            color: white;
        }

        .action-button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        .settings-section {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
        }

        .settings-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid var(--tg-gray);
        }

        .settings-item:last-child {
            border-bottom: none;
        }

        .settings-label {
            font-weight: 500;
        }

        .toggle-switch {
            width: 50px;
            height: 26px;
            background: #ccc;
            border-radius: 13px;
            position: relative;
            cursor: pointer;
            transition: background 0.2s;
        }

        .toggle-switch.active {
            background: var(--tg-blue);
        }

        .toggle-switch::after {
            content: '';
            position: absolute;
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: transform 0.2s;
        }

        .toggle-switch.active::after {
            transform: translateX(24px);
        }

        /* ===== МОДАЛЬНЫЕ ОКНА ===== */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 20px;
            width: 450px;
            max-width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        .modal-title {
            font-size: 22px;
            font-weight: bold;
        }

        .modal-close {
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }

        .modal-field {
            margin-bottom: 20px;
        }

        .modal-field label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #333;
        }

        .modal-field input,
        .modal-field textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid var(--tg-gray);
            border-radius: 10px;
            outline: none;
            font-size: 15px;
        }

        .modal-field input:focus,
        .modal-field textarea:focus {
            border-color: var(--tg-blue);
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        .modal-button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .modal-button.primary {
            background: var(--tg-blue);
            color: white;
        }

        .modal-button.secondary {
            background: var(--tg-bg);
            color: #333;
        }

        .avatar-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 20px 0;
        }

        .avatar-option {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--tg-blue);
            color: white;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
            margin: 0 auto;
        }

        .avatar-option:hover {
            transform: scale(1.1);
        }

        .avatar-option.selected {
            border: 3px solid var(--tg-green);
            transform: scale(1.1);
        }

        .login-screen {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3390ec, #1c5a9c);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
        }

        .login-box {
            background: white;
            padding: 40px;
            border-radius: 30px;
            width: 400px;
            max-width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .login-logo {
            font-size: 60px;
            margin-bottom: 20px;
        }

        .login-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }

        .login-subtitle {
            color: #666;
            margin-bottom: 30px;
        }

        .login-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
        }

        .login-tab {
            flex: 1;
            padding: 12px;
            border: 1px solid var(--tg-gray);
            border-radius: 10px;
            background: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
        }

        .login-tab.active {
            background: var(--tg-blue);
            color: white;
            border-color: var(--tg-blue);
        }

        .login-field {
            margin-bottom: 15px;
            text-align: left;
        }

        .login-field label {
            display: block;
            margin-bottom: 5px;
            color: #555;
            font-size: 14px;
        }

        .login-field input {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid var(--tg-gray);
            border-radius: 12px;
            outline: none;
            font-size: 15px;
        }

        .login-field input:focus {
            border-color: var(--tg-blue);
        }

        .login-button {
            width: 100%;
            padding: 16px;
            background: var(--tg-blue);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.2s;
        }

        .login-button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        .notification-badge {
            position: absolute;
            top: 5px;
            right: 5px;
            background: var(--tg-red);
            color: white;
            border-radius: 20px;
            padding: 2px 6px;
            font-size: 11px;
            min-width: 18px;
            text-align: center;
        }

        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>
    <!-- ЭКРАН ВХОДА -->
    <div id="loginScreen" class="login-screen">
        <div class="login-box">
            <div class="login-logo">📱</div>
            <div class="login-title">SudoMessenger</div>
            <div class="login-subtitle">Войди в свой аккаунт</div>
            
            <div class="login-tabs">
                <button class="login-tab active" onclick="switchAuthTab('login')">Вход</button>
                <button class="login-tab" onclick="switchAuthTab('register')">Регистрация</button>
            </div>
            
            <!-- Форма входа -->
            <div id="loginForm">
                <div class="login-field">
                    <label>Имя пользователя</label>
                    <input type="text" id="loginUsername" placeholder="@username">
                </div>
                <div class="login-field">
                    <label>Пароль</label>
                    <input type="password" id="loginPassword" placeholder="••••••••">
                </div>
                <button class="login-button" onclick="login()">Войти</button>
            </div>
            
            <!-- Форма регистрации (скрыта) -->
            <div id="registerForm" class="hidden">
                <div class="login-field">
                    <label>Имя пользователя</label>
                    <input type="text" id="regUsername" placeholder="@username">
                </div>
                <div class="login-field">
                    <label>Отображаемое имя</label>
                    <input type="text" id="regNickname" placeholder="Как тебя зовут">
                </div>
                <div class="login-field">
                    <label>Пароль</label>
                    <input type="password" id="regPassword" placeholder="••••••••">
                </div>
                <div class="login-field">
                    <label>Повтори пароль</label>
                    <input type="password" id="regPassword2" placeholder="••••••••">
                </div>
                <div class="avatar-grid" style="grid-template-columns: repeat(6, 1fr);">
                    <div class="avatar-option" onclick="selectAvatar('😊')">😊</div>
                    <div class="avatar-option" onclick="selectAvatar('😎')">😎</div>
                    <div class="avatar-option" onclick="selectAvatar('🤓')">🤓</div>
                    <div class="avatar-option" onclick="selectAvatar('👻')">👻</div>
                    <div class="avatar-option" onclick="selectAvatar('🤖')">🤖</div>
                    <div class="avatar-option" onclick="selectAvatar('👽')">👽</div>
                    <div class="avatar-option" onclick="selectAvatar('🐶')">🐶</div>
                    <div class="avatar-option" onclick="selectAvatar('🐱')">🐱</div>
                    <div class="avatar-option" onclick="selectAvatar('🦊')">🦊</div>
                    <div class="avatar-option" onclick="selectAvatar('🐼')">🐼</div>
                    <div class="avatar-option" onclick="selectAvatar('🦁')">🦁</div>
                    <div class="avatar-option" onclick="selectAvatar('🐧')">🐧</div>
                </div>
                <button class="login-button" onclick="register()">Зарегистрироваться</button>
            </div>
        </div>
    </div>

    <!-- ОСНОВНОЕ ПРИЛОЖЕНИЕ (скрыто до входа) -->
    <div id="appMain" class="app-container hidden">
        <!-- ЛЕВАЯ ПАНЕЛЬ -->
        <div class="left-panel">
            <div class="user-profile">
                <div class="profile-avatar" id="myAvatar" onclick="showAvatarModal()">😊</div>
                <div class="profile-info">
                    <div class="profile-name" id="myName">Загрузка...</div>
                    <div class="profile-status" id="myStatus">онлайн</div>
                </div>
                <div style="position: relative;">
                    <div class="header-action" onclick="toggleNotifications()">
                        🔔
                        <span class="notification-badge" id="notificationBadge" style="display: none;">0</span>
                    </div>
                </div>
            </div>

            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 Поиск пользователей и каналов..." oninput="search()">
                <div class="search-results" id="searchResults"></div>
            </div>

            <div class="tabs">
                <div class="tab active" onclick="switchTab('chats')" id="tabChats">Чаты</div>
                <div class="tab" onclick="switchTab('channels')" id="tabChannels">Каналы</div>
                <div class="tab" onclick="switchTab('contacts')" id="tabContacts">Контакты</div>
            </div>

            <div class="chats-list" id="chatsList">
                <!-- Список чатов будет здесь -->
            </div>
        </div>

        <!-- ЦЕНТРАЛЬНАЯ ПАНЕЛЬ (ЧАТ) -->
        <div class="chat-panel" id="chatPanel">
            <div class="chat-header-main" id="chatHeader">
                <div class="chat-header-avatar" id="chatAvatar">😊</div>
                <div class="chat-header-info">
                    <div class="chat-header-name" id="chatName">Выберите чат</div>
                    <div class="chat-header-status" id="chatStatus"></div>
                </div>
                <div class="chat-header-actions">
                    <div class="header-action" onclick="showChatInfo()">ℹ️</div>
                    <div class="header-action" onclick="showSearchInChat()">🔍</div>
                </div>
            </div>

            <div class="messages-container" id="messages"></div>

            <div class="typing-indicator" id="typingIndicator"></div>

            <div class="message-input-area">
                <div class="attach-button" onclick="showAttachMenu()">📎</div>
                <input type="text" id="messageInput" placeholder="Напишите сообщение..." onkeyup="checkTyping(event)" onkeydown="if(event.key==='Enter') sendMessage()">
                <div class="send-button" onclick="sendMessage()">➤</div>
            </div>
        </div>

        <!-- ПРАВАЯ ПАНЕЛЬ -->
        <div class="right-panel" id="rightPanel">
            <div class="profile-header">
                <div class="profile-big-avatar" id="profileBigAvatar" onclick="showAvatarModal()">😊</div>
                <div class="profile-display-name" id="profileDisplayName">Имя</div>
                <div class="profile-username" id="profileUsername">@username</div>
                
                <div class="profile-stats" id="profileStats">
                    <div class="stat">
                        <div class="stat-value" id="statFriends">0</div>
                        <div class="stat-label">друзья</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="statChannels">0</div>
                        <div class="stat-label">каналы</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="statMessages">0</div>
                        <div class="stat-label">сообщ</div>
                    </div>
                </div>
            </div>

            <div class="profile-actions" id="profileActions">
                <!-- Действия будут меняться в зависимости от профиля -->
            </div>

            <div class="settings-section" id="settingsSection">
                <div class="settings-item">
                    <span class="settings-label">Тема</span>
                    <select onchange="changeTheme(this.value)">
                        <option value="light">Светлая</option>
                        <option value="dark">Темная</option>
                    </select>
                </div>
                <div class="settings-item">
                    <span class="settings-label">Уведомления</span>
                    <div class="toggle-switch active" onclick="toggleSetting('notifications')" id="toggleNotifications"></div>
                </div>
                <div class="settings-item">
                    <span class="settings-label">Кто может писать</span>
                    <select onchange="changePrivacy(this.value)">
                        <option value="everyone">Все</option>
                        <option value="friends">Только друзья</option>
                        <option value="nobody">Никто</option>
                    </select>
                </div>
                <div class="settings-item">
                    <span class="settings-label">Статус</span>
                    <select onchange="changeStatus(this.value)">
                        <option value="online">Онлайн</option>
                        <option value="away">Отошел</option>
                        <option value="offline">Невидимка</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ -->
    <div id="userProfileModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">Профиль</div>
                <div class="modal-close" onclick="closeModal('userProfileModal')">✕</div>
            </div>
            <div style="text-align: center; margin-bottom: 20px;">
                <div class="profile-big-avatar" id="modalUserAvatar" style="margin: 0 auto 15px;">😊</div>
                <div style="font-size: 20px; font-weight: bold;" id="modalUserNickname"></div>
                <div style="color: #666; margin: 5px 0;" id="modalUserUsername"></div>
                <div style="color: #27ae60;" id="modalUserStatus"></div>
            </div>
            <div class="modal-buttons" id="modalUserActions">
                <!-- Кнопки будут меняться -->
            </div>
        </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО УВЕДОМЛЕНИЙ -->
    <div id="notificationsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">🔔 Уведомления</div>
                <div class="modal-close" onclick="closeModal('notificationsModal')">✕</div>
            </div>
            <div id="notificationsList" style="max-height: 400px; overflow-y: auto;">
                <!-- Список уведомлений -->
            </div>
        </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО СОЗДАНИЯ КАНАЛА -->
    <div id="createChannelModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">📢 Создать канал</div>
                <div class="modal-close" onclick="closeModal('createChannelModal')">✕</div>
            </div>
            <div class="modal-field">
                <label>Название канала</label>
                <input type="text" id="channelName" placeholder="Например: Новости">
            </div>
            <div class="modal-field">
                <label>Описание</label>
                <textarea id="channelDesc" placeholder="О чем канал?" rows="3"></textarea>
            </div>
            <div class="modal-field">
                <label>Тип канала</label>
                <select id="channelType">
                    <option value="public">Публичный (все могут найти)</option>
                    <option value="private">Приватный (только по ссылке)</option>
                </select>
            </div>
            <div class="modal-buttons">
                <button class="modal-button primary" onclick="createChannel()">Создать</button>
                <button class="modal-button secondary" onclick="closeModal('createChannelModal')">Отмена</button>
            </div>
        </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО ВЫБОРА АВАТАРА -->
    <div id="avatarModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">😊 Выбери аватар</div>
                <div class="modal-close" onclick="closeModal('avatarModal')">✕</div>
            </div>
            <div class="avatar-grid">
                <div class="avatar-option" onclick="changeAvatar('😊')">😊</div>
                <div class="avatar-option" onclick="changeAvatar('😎')">😎</div>
                <div class="avatar-option" onclick="changeAvatar('🤓')">🤓</div>
                <div class="avatar-option" onclick="changeAvatar('👻')">👻</div>
                <div class="avatar-option" onclick="changeAvatar('🤖')">🤖</div>
                <div class="avatar-option" onclick="changeAvatar('👽')">👽</div>
                <div class="avatar-option" onclick="changeAvatar('🐶')">🐶</div>
                <div class="avatar-option" onclick="changeAvatar('🐱')">🐱</div>
                <div class="avatar-option" onclick="changeAvatar('🦊')">🦊</div>
                <div class="avatar-option" onclick="changeAvatar('🐼')">🐼</div>
                <div class="avatar-option" onclick="changeAvatar('🦁')">🦁</div>
                <div class="avatar-option" onclick="changeAvatar('🐧')">🐧</div>
                <div class="avatar-option" onclick="changeAvatar('🐸')">🐸</div>
                <div class="avatar-option" onclick="changeAvatar('🐨')">🐨</div>
                <div class="avatar-option" onclick="changeAvatar('🦉')">🦉</div>
            </div>
        </div>
    </div>

    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <script>
        // ============= ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =============
        const SERVER_URL = 'https://sudomessenger.onrender.com';
        let socket;
        let currentUser = null;
        let currentChat = null;
        let currentTab = 'chats';
        let selectedAvatar = '😊';
        let notifications = [];
        let typingTimer;
        let isTyping = false;

        // ============= ФУНКЦИИ АВТОРИЗАЦИИ =============
        function switchAuthTab(tab) {
            document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');
            
            if (tab === 'login') {
                document.getElementById('loginForm').classList.remove('hidden');
                document.getElementById('registerForm').classList.add('hidden');
            } else {
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('registerForm').classList.remove('hidden');
            }
        }

        function selectAvatar(avatar) {
            selectedAvatar = avatar;
            document.querySelectorAll('.avatar-option').forEach(el => {
                el.classList.remove('selected');
            });
            event.target.classList.add('selected');
        }

        async function register() {
            const username = document.getElementById('regUsername').value.trim();
            const nickname = document.getElementById('regNickname').value.trim();
            const password = document.getElementById('regPassword').value;
            const password2 = document.getElementById('regPassword2').value;

            if (!username || !nickname || !password) {
                alert('Заполни все поля!');
                return;
            }

            if (password !== password2) {
                alert('Пароли не совпадают!');
                return;
            }

            const response = await fetch(`${SERVER_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, nickname, password })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Регистрация успешна! Теперь войди.');
                switchAuthTab('login');
            } else {
                alert(data.error || 'Ошибка регистрации');
            }
        }

        async function login() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!username || !password) {
                alert('Введи логин и пароль!');
                return;
            }

            const response = await fetch(`${SERVER_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (data.success) {
                currentUser = data.user;
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('appMain').classList.remove('hidden');
                
                // Подключаем сокет
                socket = io(SERVER_URL);
                socket.emit('user online', currentUser.username);
                
                // Обновляем интерфейс
                updateMyProfile();
                loadChats();
                setupSocketListeners();
            } else {
                alert(data.error || 'Ошибка входа');
            }
        }

        // ============= НАСТРОЙКА СОКЕТОВ =============
        function setupSocketListeners() {
            socket.on('new message', (msg) => {
                if (currentChat && currentChat.type === 'private' && 
                    (msg.from === currentChat.id || msg.to === currentChat.id)) {
                    addMessage(msg);
                }
                updateChatList();
            });

            socket.on('channel message', (data) => {
                if (currentChat && currentChat.type === 'channel' && 
                    currentChat.id === data.channel) {
                    addMessage(data.message);
                }
                updateChatList();
            });

            socket.on('notification', (notification) => {
                notifications.push(notification);
                updateNotifications();
            });

            socket.on('friend online', (username) => {
                if (currentChat && currentChat.id === username) {
                    document.getElementById('chatStatus').textContent = 'онлайн';
                }
                updateChatList();
            });

            socket.on('friend offline', (username) => {
                if (currentChat && currentChat.id === username) {
                    document.getElementById('chatStatus').textContent = 'был(а) недавно';
                }
                updateChatList();
            });
        }

        // ============= ЗАГРУЗКА ДАННЫХ =============
        function updateMyProfile() {
            document.getElementById('myName').textContent = currentUser.nickname;
            document.getElementById('myAvatar').textContent = currentUser.avatar;
            document.getElementById('profileBigAvatar').textContent = currentUser.avatar;
            document.getElementById('profileDisplayName').textContent = currentUser.nickname;
            document.getElementById('profileUsername').textContent = '@' + currentUser.username;
            document.getElementById('statFriends').textContent = currentUser.friends?.length || 0;
        }

        async function loadChats() {
            // Загружаем контакты и каналы
            const response = await fetch(`${SERVER_URL}/api/user/${currentUser.username}/channels`);
            const channels = await response.json();
            
            // TODO: загрузить последние сообщения
            renderChats([...currentUser.friends.map(f => ({ type: 'private', id: f })), ...channels]);
        }

        function renderChats(chats) {
            const list = document.getElementById('chatsList');
            list.innerHTML = '';
            
            chats.forEach(chat => {
                const item = document.createElement('div');
                item.className = `chat-item ${currentChat?.id === chat.id ? 'active' : ''}`;
                item.onclick = () => openChat(chat);
                
                item.innerHTML = `
                    <div class="chat-avatar">
                        ${chat.avatar || '😊'}
                        ${chat.online ? '<span class="online-dot"></span>' : ''}
                    </div>
                    <div class="chat-info">
                        <div class="chat-header">
                            <span class="chat-name">${chat.name || chat.id}</span>
                            <span class="chat-time">${chat.lastTime || ''}</span>
                        </div>
                        <div class="chat-last-message">${chat.lastMessage || 'Нет сообщений'}</div>
                    </div>
                    ${chat.unread ? '<span class="unread-badge">' + chat.unread + '</span>' : ''}
                `;
                
                list.appendChild(item);
            });
        }

        // ============= ПОИСК =============
        async function search() {
            const query = document.getElementById('searchInput').value.trim();
            if (query.length < 2) {
                document.getElementById('searchResults').classList.remove('show');
                return;
            }

            // Ищем пользователей
            const usersRes = await fetch(`${SERVER_URL}/api/users/search/${query}`);
            const users = await usersRes.json();
            
            // Ищем каналы
            const channelsRes = await fetch(`${SERVER_URL}/api/channels/search/${query}`);
            const channels = await channelsRes.json();

            const results = document.getElementById('searchResults');
            results.innerHTML = '';
            
            users.forEach(user => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.onclick = () => showUserProfile(user.username);
                item.innerHTML = `
                    <div class="result-avatar">${user.avatar}</div>
                    <div class="result-info">
                        <div class="result-name">${user.nickname}</div>
                        <div class="result-username">@${user.username}</div>
                    </div>
                    ${user.online ? '<span style="color: #27ae60;">●</span>' : ''}
                `;
                results.appendChild(item);
            });

            channels.forEach(channel => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.onclick = () => joinChannel(channel.id);
                item.innerHTML = `
                    <div class="result-avatar">📢</div>
                    <div class="result-info">
                        <div class="result-name">${channel.name}</div>
                        <div class="result-username">${channel.members} участников</div>
                    </div>
                `;
                results.appendChild(item);
            });

            if (users.length || channels.length) {
                results.classList.add('show');
            } else {
                results.innerHTML = '<div style="padding: 15px; text-align: center;">Ничего не найдено</div>';
                results.classList.add('show');
            }
        }

        // ============= ПРОФИЛИ ПОЛЬЗОВАТЕЛЕЙ =============
        async function showUserProfile(username) {
            const response = await fetch(`${SERVER_URL}/api/user/${username}?currentUser=${currentUser.username}`);
            const user = await response.json();

            document.getElementById('modalUserAvatar').textContent = user.avatar;
            document.getElementById('modalUserNickname').textContent = user.nickname;
            document.getElementById('modalUserUsername').textContent = '@' + user.username;
            document.getElementById('modalUserStatus').textContent = user.online ? 'онлайн' : 'был(а) недавно';

            const actions = document.getElementById('modalUserActions');
            actions.innerHTML = '';

            if (user.isCurrentUser) {
                // Свой профиль
                actions.innerHTML = `
                    <button class="modal-button primary" onclick="closeModal('userProfileModal'); showSettings()">Настройки</button>
                `;
            } else if (user.isFriend) {
                // Уже друг
                actions.innerHTML = `
                    <button class="modal-button primary" onclick="openChat({ type: 'private', id: '${user.username}' })">Написать</button>
                    <button class="modal-button danger" onclick="removeFriend('${user.username}')">Удалить</button>
                `;
            } else if (user.hasRequest) {
                // Заявка отправлена
                actions.innerHTML = `
                    <button class="modal-button secondary" disabled>Заявка отправлена</button>
                `;
            } else {
                // Можно добавить
                actions.innerHTML = `
                    <button class="modal-button primary" onclick="sendFriendRequest('${user.username}')">Добавить в друзья</button>
                `;
            }

            openModal('userProfileModal');
        }

        async function sendFriendRequest(to) {
            const response = await fetch(`${SERVER_URL}/api/friends/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: currentUser.username, to })
            });

            const data = await response.json();
            if (data.success) {
                alert('Заявка отправлена!');
                closeModal('userProfileModal');
            }
        }

        // ============= УВЕДОМЛЕНИЯ =============
        async function toggleNotifications() {
            await fetch(`${SERVER_URL}/api/notifications/read`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username })
            });

            const response = await fetch(`${SERVER_URL}/api/notifications/${currentUser.username}`);
            notifications = await response.json();

            const list = document.getElementById('notificationsList');
            list.innerHTML = '';

            if (notifications.length === 0) {
                list.innerHTML = '<div style="text-align: center; padding: 30px; color: #666;">Нет уведомлений</div>';
            } else {
                notifications.forEach(n => {
                    const item = document.createElement('div');
                    item.style.cssText = 'padding: 15px; border-bottom: 1px solid #eee;';
                    
                    if (n.type === 'friend_request') {
                        item.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>${n.text}</strong>
                                    <div style="font-size: 12px; color: #999;">${new Date(n.timestamp).toLocaleString()}</div>
                                </div>
                                <div>
                                    <button onclick="acceptFriendRequest('${n.from}')" style="background: #27ae60; color: white; border: none; padding: 5px 10px; border-radius: 5px; margin-right: 5px;">✓</button>
                                    <button onclick="rejectFriendRequest('${n.from}')" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px;">✕</button>
                                </div>
                            </div>
                        `;
                    } else {
                        item.innerHTML = `
                            <div>
                                <strong>${n.text}</strong>
                                <div style="font-size: 12px; color: #999;">${new Date(n.timestamp).toLocaleString()}</div>
                            </div>
                        `;
                    }
                    
                    list.appendChild(item);
                });
            }

            document.getElementById('notificationBadge').style.display = 'none';
            openModal('notificationsModal');
        }

        async function acceptFriendRequest(from) {
            const response = await fetch(`${SERVER_URL}/api/friends/accept`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, from })
            });

            if (response.ok) {
                alert('Друг добавлен!');
                currentUser.friends.push(from);
                document.getElementById('statFriends').textContent = currentUser.friends.length;
                toggleNotifications();
                loadChats();
            }
        }

        async function rejectFriendRequest(from) {
            const response = await fetch(`${SERVER_URL}/api/friends/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, from })
            });

            if (response.ok) {
                toggleNotifications();
            }
        }

        function updateNotifications() {
            const badge = document.getElementById('notificationBadge');
            const unread = notifications.filter(n => !n.read).length;
            
            if (unread > 0) {
                badge.textContent = unread;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }

        // ============= КАНАЛЫ =============
        function showCreateChannelModal() {
            openModal('createChannelModal');
        }

        async function createChannel() {
            const name = document.getElementById('channelName').value.trim();
            const description = document.getElementById('channelDesc').value.trim();
            const type = document.getElementById('channelType').value;

            if (!name) {
                alert('Введи название канала!');
                return;
            }

            const response = await fetch(`${SERVER_URL}/api/channels/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, creator: currentUser.username, type })
            });

            const data = await response.json();
            if (data.success) {
                alert('Канал создан!');
                closeModal('createChannelModal');
                loadChats();
            }
        }

        // ============= ЧАТ =============
        function openChat(chat) {
            currentChat = chat;
            document.getElementById('chatName').textContent = chat.name || chat.id;
            document.getElementById('chatAvatar').textContent = chat.avatar || '😊';
            document.getElementById('messages').innerHTML = '';
            
            // Загружаем историю
            // TODO: загрузить сообщения
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const text = input.value.trim();

            if (!text || !currentChat || !socket) return;

            socket.emit('send message', {
                from: currentUser.username,
                to: currentChat.id,
                text: text,
                type: currentChat.type || 'private'
            });

            input.value = '';
            stopTyping();
        }

        function addMessage(msg) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            
            const isOutgoing = msg.from === currentUser.username;
            messageDiv.className = `message ${isOutgoing ? 'outgoing' : 'incoming'}`;
            
            messageDiv.innerHTML = `
                ${!isOutgoing ? '<div class="message-sender">' + (msg.fromNick || msg.from) + '</div>' : ''}
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
            `;
            
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // ============= ТИПИНГ =============
        function checkTyping(event) {
            if (!socket || !currentChat) return;

            const input = document.getElementById('messageInput');

            if (input.value.length > 0 && !isTyping) {
                isTyping = true;
                socket.emit('typing', {
                    to: currentChat.id,
                    from: currentUser.username
                });
            }

            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                stopTyping();
            }, 1000);
        }

        function stopTyping() {
            if (isTyping && socket) {
                isTyping = false;
                socket.emit('stop typing', {
                    to: currentChat.id
                });
            }
        }

        // ============= НАСТРОЙКИ =============
        function changeTheme(theme) {
            // TODO: реализовать смену темы
            console.log('Theme changed to:', theme);
        }

        function changePrivacy(value) {
            console.log('Privacy changed to:', value);
        }

        function changeStatus(value) {
            console.log('Status changed to:', value);
        }

        function toggleSetting(setting) {
            const toggle = document.getElementById('toggleNotifications');
            toggle.classList.toggle('active');
        }

        // ============= АВАТАР =============
        function showAvatarModal() {
            openModal('avatarModal');
        }

        function changeAvatar(avatar) {
            currentUser.avatar = avatar;
            document.getElementById('myAvatar').textContent = avatar;
            document.getElementById('profileBigAvatar').textContent = avatar;
            socket.emit('change avatar', avatar);
            closeModal('avatarModal');
        }

        // ============= УПРАВЛЕНИЕ МОДАЛКАМИ =============
        function openModal(id) {
            document.getElementById(id).classList.add('active');
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        // ============= ПЕРЕКЛЮЧЕНИЕ ТАБОВ =============
        function switchTab(tab) {
            currentTab = tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
            
            // TODO: загрузить соответствующие данные
        }

        // ============= ВСПОМОГАТЕЛЬНЫЕ =============
        function showChatInfo() {
            if (currentChat) {
                showUserProfile(currentChat.id);
            }
        }

        function showSearchInChat() {
            alert('Поиск по чату (будет позже)');
        }

        function showAttachMenu() {
            alert('Прикрепление файлов (будет позже)');
        }

        function showSettings() {
            // TODO: показать настройки
        }

        function removeFriend(username) {
            if (confirm(`Удалить ${username} из друзей?`)) {
                // TODO: удалить друга
            }
        }

        function joinChannel(channelId) {
            // TODO: присоединиться к каналу
        }
    </script>
</body>
</html>
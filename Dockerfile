# Используем официальный образ Node.js
FROM node:18-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем весь код сервера
COPY . .

# Указываем порт, который будет слушать приложение
EXPOSE 3000

# Запускаем сервер
CMD ["node", "index.js"]

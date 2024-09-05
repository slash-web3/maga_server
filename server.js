const WebSocket = require('ws');
const port = process.env.PORT || 8080; // Використовуємо порт з середовища або 8080 за замовчуванням

// Створюємо WebSocket сервер і слухаємо на порту
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        // Передаємо отримане повідомлення всім підключеним клієнтам
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// Логування для перевірки URL
const host = '0.0.0.0'; // Для Render використовується 0.0.0.0
console.log(`Signaling server is running on ws://${host}:${port}`);

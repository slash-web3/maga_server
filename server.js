const WebSocket = require('ws');
const port = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        // Розсилаємо повідомлення всім іншим клієнтам
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Надсилаємо отримані дані всім клієнтам
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

console.log(`Signaling server is running on ws://localhost:${port}`);
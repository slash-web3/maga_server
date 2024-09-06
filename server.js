const WebSocket = require('ws');
const port = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Логіку обробки повідомлень можна поліпшити, щоб фільтрувати повідомлення
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Перевірка, чи повідомлення є дійсним JSON
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.error('Invalid message format:', message);
            return;
        }

        // Пересилання повідомлень іншим клієнтам
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));
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

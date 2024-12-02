const WebSocket = require(`ws`);
const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on(`connection`, (socket) => {
    clients.push(socket);
    console.log(`новый клиент подключился`);

    socket.send(`добро пожаловать в чат!`);

    socket.on(`message`, (message) => {
        const text = message.toString();
        console.log(`получено  сообщение: ${message}`);

        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    });


    socket.on(`close`, () => {
        clients = clients.filter((client) => client !== socket);
    });
});

console.log(`сервер WebSocket запущен на порту 8080`);
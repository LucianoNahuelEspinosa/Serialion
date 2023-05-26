const { ipcMain } = require('electron');
import { Client } from 'node-osc';

let clients = [];

ipcMain.on("addClient", (e, message) => {
    clients.push(message);
    e.reply('addClient', clients);
});

ipcMain.on("removeClient", (e, message) => {
    clients.splice(message, 1);
    e.reply('removeClient', clients);
});

setInterval(() => {
    if (clients !== null) {
        clients.map((c) => {
            var client = new Client(c.ip, c.port);

            if (client !== null) {
                client.send('/oscAddress', 200, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
}, 1000);
const { ipcMain } = require('electron');
import { Client } from 'node-osc';

//↓↓↓↓↓↓↓↓↓↓↓↓ CLIENTS FUNCTIONS ↓↓↓↓↓↓↓↓↓↓↓↓
let clients = [];

ipcMain.on("addClient", (e, message) => {
    clients.push(message);
    e.reply('addClient', clients);
});

ipcMain.on("removeClient", (e, message) => {
    clients.splice(message, 1);
    e.reply('removeClient', clients);
});
//↑↑↑↑↑↑↑↑↑↑ END CLIENTS FUNCTIONS ↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓ SEND DATA FUNCTIONS ↓↓↓↓↓↓↓↓↓↓↓↓
let addresses = [];

ipcMain.on("addAddress", (e, message) => {
    addresses.push(message);
    e.reply('addAddress', addresses.length - 1);
});

ipcMain.on("updateOSCValue", (e, message) => {
    addresses[message.index] = message;
});

ipcMain.on("editAddress", (e, message) => {
    addresses[message.index] = message;
});
//↑↑↑↑↑↑↑↑↑↑ END SEND DATA FUNCTIONS ↑↑↑↑↑↑↑↑↑↑

// Send data every 1 second
setInterval(() => {
    if (clients !== null) {
        clients.map((c) => {
            var client = new Client(c.ip, c.port);

            if (client !== null) {
                if (addresses !== null) {
                    addresses.map((a) => {
                        client.send(a.address, a.value, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                }
            }
        });
    }
}, 1000);
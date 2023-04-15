const { ipcMain } = require('electron');
import { SerialPort } from 'serialport';

let ports = '';

SerialPort.list().then(port => {
    ports = port;
    console.log(port);
});

ipcMain.on("ports", (e, message) => {
    // console.log(message);
    e.reply('ports', ports);
});
const { ipcMain } = require('electron');
import { SerialPort, ReadlineParser } from 'serialport';

let ports = '';

SerialPort.list().then(port => {
    ports = port;
    console.log(port);
});

ipcMain.on("ports", (e, message) => {
    // console.log(message);
    e.reply('ports', ports);
});

ipcMain.on("refreshPorts", (e, message) => {
    SerialPort.list().then(port => {
        ports = port;
        console.log(port);
        e.reply('refreshPorts', port);
    });
});

let selectPort = null;

ipcMain.on("selectPort", (e, message) => {
    for (var i = 0; i < ports.length; i++) {
        if (ports[i].path === message) {
            selectPort = new SerialPort({
                path: ports[i].path,
                baudRate: 9600,
            });
            e.reply('selectPort', 'Port has been selected');
        }
    }
});

var serialData = '';

const readData = () => {
    if (selectPort !== null) {
        const parser = selectPort.pipe(new ReadlineParser());
        parser.on('data', (data) => {
            // console.log(data);
            serialData = data;
        });
    }
}

ipcMain.on("getData", (e, message) => {
    // console.log(message);
    readData();
    e.reply('getData', serialData);
});
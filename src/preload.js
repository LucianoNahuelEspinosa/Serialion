// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    IpcApi: {
        sendMessage(dir, message) {
            ipcRenderer.send(dir, message);
        },
        getMessage(dir, func) {
            ipcRenderer.on(dir, (event, ...args) => func(...args));
        },
    },
});
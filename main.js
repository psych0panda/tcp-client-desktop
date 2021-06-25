const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const net = require('net');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile("index.html");

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
    console.log("ARGS:", args)
    const conn = net.createConnection(args.port, args.host);
    conn.on('connect', function() {
          console.log('connected to server');
          conn.write(args.message);
    });
    conn.on('data' , function (data){
          console.log("Data received from the server: " , data.toString());
          win.webContents.send("fromMain", data.toString());
    });
    // When connection disconnected.
    conn.on('end',function () {
        console.log('Client socket disconnect. ');
    });
    conn.on('timeout', function () {
        console.log('Client connection timeout. ');
    });
    conn.on('error', function (err) {
        console.error(JSON.stringify(err));
        conn.destroy()
    });
});
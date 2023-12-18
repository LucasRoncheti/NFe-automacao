// electron.js

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path =  require('path');

let mainWindow;

function createWindow() {
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, 'src/images/robot-icon-4.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  // abre o arquivo html que será exibido no electron, e conversa com o servidor node na porta 3000
  const url = isDev
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, 'src/mainHtml/main.html')}`;

  mainWindow.loadURL(url);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

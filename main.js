// electron.js

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { execFile } = require('child_process')


app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-web-security');

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




  // exevuta os scripts node com os servidores antes de abrir o html do electron 
  const nodeScriptPath = path.join(__dirname, 'robo.mjs');
  const nodeScriptPath2 = path.join(__dirname, 'express-server.js');
  //servidor com o pupperteer 
  execFile('node', [nodeScriptPath], (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });


  //servidor com os arquvios css e assets 
  execFile('node', [nodeScriptPath2], (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // abre o arquivo html que será exibido no electron, e conversa com o servidor node na porta 3000
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './src/mainHtml/main.html')}`;

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

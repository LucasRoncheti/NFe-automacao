const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');


// Adicione estas linhas para configurar o electron-reload
if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}

let mainWindow;

function createWindow() {
  // Obtém as dimensões da tela
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

  // Cria a janela do navegador
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carrega o arquivo HTML principal.
  mainWindow.loadFile('src/mainHtml/main.html');

  // Abre as ferramentas de desenvolvimento.
  mainWindow.webContents.openDevTools();

  // Evento quando a janela é fechada.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas do navegador.
app.whenReady().then(createWindow);

// Sai quando todas as janelas estão fechadas, exceto no macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // No macOS, recria uma janela na aplicação quando o ícone no dock é clicado.
  if (mainWindow === null) createWindow();
});


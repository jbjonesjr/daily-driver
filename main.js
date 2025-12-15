const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    },
    titleBarStyle: 'default',
    backgroundColor: '#ffffff'
  });

  // Load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for GitHub authentication and API calls
ipcMain.handle('github-auth', async (event, authCode) => {
  // Placeholder for GitHub OAuth implementation
  console.log('GitHub authentication requested');
  return { success: false, message: 'GitHub OAuth not yet configured' };
});

ipcMain.handle('api-request', async (event, { url, method, data }) => {
  // Placeholder for REST API calls
  console.log('API request:', method, url);
  return { success: false, message: 'API functionality not yet implemented' };
});

// Handle file operations for markdown
ipcMain.handle('save-markdown', async (event, { content, filePath }) => {
  // Placeholder for saving markdown files
  console.log('Save markdown requested');
  return { success: false, message: 'File operations not yet implemented' };
});

ipcMain.handle('load-markdown', async (event, filePath) => {
  // Placeholder for loading markdown files
  console.log('Load markdown requested');
  return { success: false, content: '', message: 'File operations not yet implemented' };
});

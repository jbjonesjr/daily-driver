const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // GitHub authentication
  authenticateGitHub: (authCode) => ipcRenderer.invoke('github-auth', authCode),
  
  // REST API calls
  apiRequest: (url, method, data) => ipcRenderer.invoke('api-request', { url, method, data }),
  
  // Markdown file operations
  saveMarkdown: (content, filePath) => ipcRenderer.invoke('save-markdown', { content, filePath }),
  loadMarkdown: (filePath) => ipcRenderer.invoke('load-markdown', filePath),
  
  // Platform information
  platform: process.platform
});

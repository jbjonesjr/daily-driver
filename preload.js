const { contextBridge, ipcRenderer } = require('electron');
const { marked } = require('marked');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create a DOMPurify instance for Node.js environment
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

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
  
  // Markdown rendering - secure method
  renderMarkdown: (markdown) => {
    const rawHtml = marked.parse(markdown);
    return purify.sanitize(rawHtml);
  },
  
  // Platform information
  platform: process.platform
});

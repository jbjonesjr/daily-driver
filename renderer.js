// Import marked for markdown parsing
const { marked } = require('marked');
const DOMPurify = require('dompurify');

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

// DOM elements
const markdownEditor = document.getElementById('markdown-editor');
const markdownPreview = document.getElementById('markdown-preview');
const previewPane = document.getElementById('preview-pane');
const togglePreviewBtn = document.getElementById('toggle-preview');
const authBtn = document.getElementById('auth-btn');
const authStatus = document.getElementById('auth-status');
const platformSpan = document.getElementById('platform');
const newNoteBtn = document.getElementById('new-note');
const saveNoteBtn = document.getElementById('save-note');
const loadNoteBtn = document.getElementById('load-note');

// State
let previewVisible = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Display platform
  if (window.electronAPI) {
    platformSpan.textContent = window.electronAPI.platform;
  }

  // Initial preview render
  updatePreview();
});

// Markdown preview update
function updatePreview() {
  const markdown = markdownEditor.value;
  const rawHtml = marked.parse(markdown);
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  markdownPreview.innerHTML = cleanHtml;
}

// Auto-update preview as user types
markdownEditor.addEventListener('input', () => {
  updatePreview();
});

// Toggle preview visibility
togglePreviewBtn.addEventListener('click', () => {
  previewVisible = !previewVisible;
  
  if (previewVisible) {
    previewPane.style.display = 'block';
    togglePreviewBtn.classList.add('active');
  } else {
    previewPane.style.display = 'none';
    togglePreviewBtn.classList.remove('active');
  }
});

// GitHub authentication
authBtn.addEventListener('click', async () => {
  authStatus.textContent = 'Authenticating...';
  
  try {
    // Placeholder - actual OAuth flow would be implemented here
    const result = await window.electronAPI.authenticateGitHub('placeholder-code');
    
    if (result.success) {
      authStatus.textContent = '✓ Connected';
      authStatus.className = 'auth-status success';
      authBtn.textContent = 'Connected';
      authBtn.disabled = true;
    } else {
      authStatus.textContent = '✗ ' + result.message;
      authStatus.className = 'auth-status error';
    }
  } catch (error) {
    console.error('Authentication error:', error);
    authStatus.textContent = '✗ Authentication failed';
    authStatus.className = 'auth-status error';
  }
});

// New note
newNoteBtn.addEventListener('click', () => {
  if (markdownEditor.value && !confirm('Create a new note? Unsaved changes will be lost.')) {
    return;
  }
  markdownEditor.value = '';
  updatePreview();
});

// Save note
saveNoteBtn.addEventListener('click', async () => {
  const content = markdownEditor.value;
  
  if (!content.trim()) {
    alert('Nothing to save!');
    return;
  }

  try {
    const result = await window.electronAPI.saveMarkdown(content, null);
    
    if (result.success) {
      alert('Note saved successfully!');
    } else {
      alert('Failed to save: ' + result.message);
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('Failed to save note');
  }
});

// Load note
loadNoteBtn.addEventListener('click', async () => {
  try {
    const result = await window.electronAPI.loadMarkdown(null);
    
    if (result.success) {
      markdownEditor.value = result.content;
      updatePreview();
      alert('Note loaded successfully!');
    } else {
      alert('Failed to load: ' + result.message);
    }
  } catch (error) {
    console.error('Load error:', error);
    alert('Failed to load note');
  }
});

// API request example (for future use)
async function makeApiRequest(url, method = 'GET', data = null) {
  try {
    const result = await window.electronAPI.apiRequest(url, method, data);
    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

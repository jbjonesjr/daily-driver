# Daily Driver Architecture

## Overview

Daily Driver is an Electron-based desktop application for macOS that provides a markdown editor with live preview, designed for daily note-taking and activity tracking.

## Technology Stack

- **Electron 39.2.7**: Latest stable version with security updates
- **Node.js**: v20.x
- **marked**: Markdown parsing library (v15.0.6)
- **DOMPurify**: HTML sanitization (v3.2.4)
- **electron-builder**: Application packaging and distribution

## Architecture

### Main Process (`main.js`)

The main process is responsible for:
- Creating and managing the browser window
- Handling IPC (Inter-Process Communication) requests
- Managing application lifecycle
- Providing secure APIs for:
  - GitHub authentication (placeholder)
  - REST API calls (placeholder)
  - File operations (placeholder)

**Security Features:**
- Context isolation enabled
- Sandbox enabled
- Node integration disabled
- Preload script for secure IPC bridge

### Preload Script (`preload.js`)

Acts as a secure bridge between the renderer process and main process:
- Exposes limited APIs via `contextBridge`
- Prevents direct access to Node.js/Electron APIs
- Provides controlled access to:
  - GitHub authentication
  - API requests
  - Markdown file operations
  - Platform information

### Renderer Process

**HTML (`index.html`):**
- Main application UI
- Two-pane layout: editor and preview
- Content Security Policy configured

**JavaScript (`renderer.js`):**
- Markdown editor logic
- Live preview updates using marked + DOMPurify
- Event handlers for UI interactions
- IPC communication with main process

**CSS (`styles.css`):**
- Modern, responsive design
- Gradient header
- Split-pane editor/preview layout
- Syntax highlighting styles

## Security

### Content Security Policy

```
default-src 'self'; 
script-src 'self' 'unsafe-inline'; 
style-src 'self' 'unsafe-inline';
```

### Electron Security Best Practices

1. ✅ Context isolation enabled
2. ✅ Node integration disabled
3. ✅ Sandbox enabled
4. ✅ Content Security Policy defined
5. ✅ HTML sanitization via DOMPurify
6. ✅ Preload script for IPC bridge
7. ✅ No eval() or remote content

### macOS Hardening

- Hardened runtime enabled
- Code signing ready (entitlements.mac.plist)
- Gatekeeper assessment disabled (for development)

## Build System

### electron-builder Configuration

**macOS Targets:**
- DMG (disk image)
- ZIP (archive)

**Architectures:**
- x64 (Intel)
- arm64 (Apple Silicon)
- universal (both)

**Build Commands:**
```bash
npm run build:mac          # Current architecture
npm run build:mac-arm      # ARM64 only
npm run build:mac-universal # Universal binary
```

## GitHub Actions Workflow

### Jobs

1. **build-macos**: Builds the Electron app on macOS
   - Uses `macos-latest` runner
   - Caches npm dependencies
   - Produces DMG and ZIP artifacts
   - 7-day artifact retention

2. **lint**: Runs security checks
   - Uses `ubuntu-latest` runner
   - Runs `npm audit` with moderate threshold

### Triggers

- Push to `main` or `copilot/**` branches
- Pull requests to `main`
- Manual workflow dispatch

## Future Enhancements

### Planned Features

1. **File Operations**
   - Implement save/load with native file dialogs
   - Local storage integration
   - Auto-save functionality

2. **GitHub Integration**
   - OAuth authentication flow
   - GitHub API integration
   - Sync notes to GitHub gists
   - Issue/PR tracking

3. **REST API Support**
   - Generic HTTP client
   - Request/response inspection
   - API key management

4. **Enhanced Editor**
   - Syntax highlighting in editor
   - Keyboard shortcuts
   - Multiple tabs/documents
   - Search and replace

5. **Organization**
   - Note tagging and categorization
   - Search across notes
   - Date-based organization

## Development

### Prerequisites

- Node.js 20.x+
- npm 10.x+
- macOS (primary platform)

### Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start

# Build for macOS
npm run build:mac
```

### Project Structure

```
daily-driver/
├── main.js                 # Main process
├── preload.js              # Preload script
├── index.html              # Main window
├── renderer.js             # Renderer logic
├── styles.css              # Styles
├── package.json            # Config & dependencies
├── build/                  # Build config
│   └── entitlements.mac.plist
├── assets/                 # App assets
│   └── icon.svg
└── .github/
    └── workflows/
        └── build.yml       # CI/CD workflow
```

## License

ISC License - See LICENSE file for details.

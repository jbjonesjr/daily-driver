# Daily Driver

Daily notes and activity tool built with Electron for macOS.

## Features

- 📝 **Markdown Editor** - Write notes with full markdown support
- 👁️ **Live Preview** - See your formatted markdown in real-time
- 🔒 **Secure Architecture** - Built with context isolation and sandboxing
- 🎨 **Modern UI** - Clean, intuitive interface with syntax highlighting
- 🌐 **REST API Ready** - Infrastructure for API integration
- 🔐 **GitHub Auth Ready** - Prepared for GitHub OAuth integration
- 💾 **File Operations** - Save and load markdown files (coming soon)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- macOS (primary target platform)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jbjonesjr/daily-driver.git
cd daily-driver
```

2. Install dependencies:
```bash
npm install
```

3. Run the app in development mode:
```bash
npm run dev
```

Or run in production mode:
```bash
npm start
```

## Building

### Build for macOS

```bash
# Build for current architecture
npm run build:mac

# Build for ARM64 (Apple Silicon)
npm run build:mac-arm

# Build Universal binary (Intel + ARM64)
npm run build:mac-universal
```

The built application will be available in the `dist/` directory as both DMG and ZIP files.

## Development

### Project Structure

```
daily-driver/
├── main.js              # Main process (Electron)
├── preload.js           # Preload script (IPC bridge)
├── index.html           # Main window HTML
├── renderer.js          # Renderer process logic
├── styles.css           # Application styles
├── package.json         # Project configuration
├── build/               # Build configuration files
│   └── entitlements.mac.plist
├── assets/              # Application assets (icons, etc.)
│   └── icon.svg
└── .github/
    └── workflows/
        └── build.yml    # GitHub Actions build workflow
```

### Security

The app is built with security best practices:
- **Context Isolation**: Enabled to separate Electron/Node.js from renderer
- **Sandbox**: Enabled for additional process isolation
- **Node Integration**: Disabled in renderer
- **Content Security Policy**: Configured to prevent XSS attacks
- **DOMPurify**: Sanitizes HTML output from markdown

### GitHub Actions

The repository includes a GitHub Actions workflow that:
- Builds the app on macOS
- Runs security audits
- Uploads build artifacts for download

## Roadmap

- [ ] Implement file save/load functionality
- [ ] Add GitHub OAuth authentication
- [ ] Integrate REST API calls
- [ ] Add local storage for notes
- [ ] Implement note search and organization
- [ ] Add keyboard shortcuts
- [ ] Support for custom themes
- [ ] Export notes to PDF/HTML

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](LICENSE) file for details.

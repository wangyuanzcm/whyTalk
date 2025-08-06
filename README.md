# why-talk

An Electron application with Vue and TypeScript, featuring a powerful plugin system that supports both frontend and system plugins.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## Plugin System

Why-Talk includes a comprehensive plugin system that allows you to extend the application with custom functionality.

### Plugin Types

#### 🎨 Frontend Plugins

- Built with HTML, CSS, and JavaScript
- Run in isolated browser windows
- Access to plugin APIs for system integration
- Configuration via `cubeModule.json`

#### ⚙️ System Plugins

- Built with Rust and compiled to WebAssembly (WASM)
- Powered by Extism runtime for security and performance
- Direct access to system capabilities
- Sandboxed execution environment

### Quick Start

#### Install Plugin Dependencies

```bash
$ pnpm install
```

#### Create a New Frontend Plugin

```bash
$ node plugin-dev-tools.js create-frontend my-plugin
```

#### Create a New System Plugin

```bash
$ node plugin-dev-tools.js create-system my-system-plugin
```

#### Build System Plugin

```bash
$ node plugin-dev-tools.js build my-system-plugin
```

#### Test Plugins

```bash
$ pnpm test:plugins
```

#### List All Plugins

```bash
$ node plugin-dev-tools.js list
```

### Plugin Development

#### Frontend Plugin Structure

```
plugins/my-plugin/
├── cubeModule.json    # Plugin configuration
├── index.html         # Main entry point
├── style.css          # Styles
└── script.js          # JavaScript logic
```

#### System Plugin Structure

```
plugins/my-system-plugin/
├── cubeModule.json    # Plugin configuration
├── Cargo.toml         # Rust project configuration
├── src/
│   └── lib.rs         # Rust source code
├── build.sh           # Build script (Unix)
├── build.bat          # Build script (Windows)
└── plugin.wasm        # Compiled WASM module
```

### Plugin Configuration

Each plugin requires a `cubeModule.json` configuration file:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My awesome plugin",
  "author": "Developer Name",
  "main": "index.html",
  "permissions": ["storage", "notifications", "filesystem.read"]
}
```

### Available APIs

Frontend plugins have access to a rich set of APIs:

- **Plugin Info**: `pluginAPI.getPluginInfo()`
- **Permissions**: `pluginAPI.requestPermission()`, `pluginAPI.hasPermission()`
- **Storage**: `pluginAPI.storage.get()`, `pluginAPI.storage.set()`
- **Notifications**: `pluginAPI.showNotification()`
- **Messaging**: `pluginAPI.sendMessage()`, `pluginAPI.onMessage()`
- **System**: `pluginAPI.getSystemInfo()`, `pluginAPI.openExternal()`
- **Files**: `pluginAPI.readFile()`, `pluginAPI.writeFile()`
- **Network**: `pluginAPI.fetch()`
- **Clipboard**: `pluginAPI.clipboard.read()`, `pluginAPI.clipboard.write()`
- **Window**: `pluginAPI.window.minimize()`, `pluginAPI.window.close()`

### Security

The plugin system includes comprehensive security features:

- **Permission System**: Granular permissions for different capabilities
- **Sandboxing**: Plugins run in isolated environments
- **Content Security Policy**: Strict CSP for frontend plugins
- **Resource Limits**: Memory and execution time limits for system plugins
- **Host Validation**: Network requests are validated against allowed hosts

### Examples

The repository includes example plugins:

- **frontend-example**: Demonstrates frontend plugin capabilities
- **system-example**: Shows system plugin development with Rust/WASM

See the `plugins/` directory for complete examples.

### Development Tools

Use the plugin development tools for efficient plugin development:

```bash
# Create plugins
node plugin-dev-tools.js create-frontend my-frontend-plugin
node plugin-dev-tools.js create-system my-system-plugin

# Build and validate
node plugin-dev-tools.js build my-system-plugin
node plugin-dev-tools.js validate my-plugin

# List all plugins
node plugin-dev-tools.js list
```

### Requirements

For system plugin development:

- Rust toolchain (install from [rustup.rs](https://rustup.rs/))
- `wasm32-unknown-unknown` target
- Optional: `wasm-opt` for optimization

### Documentation

For detailed plugin development documentation, see:

- `plugins/README.md` - Complete plugin development guide
- Example plugins in `plugins/` directory
- API documentation in source code

# Chrome Bookmark Manager Extension

A modern Chrome extension built with TypeScript, React, and shadcn/ui components. Features a beautiful modal interface triggered by keyboard shortcuts for managing bookmarks.

## Features

- 🎨 Modern UI with shadcn/ui components
- ⌨️ Keyboard shortcuts: `Cmd+Shift+Comma` (Mac) or `Ctrl+Shift+Comma` (Windows/Linux)
- 🎭 Beautiful modal interface with Nunito Sans font
- ⚡ Built with TypeScript and React
- 🎯 Tailwind CSS for styling

## Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the extension**
   ```bash
   npm run build
   ```

3. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

4. **Development with hot reload**
   ```bash
   npm run dev
   ```
   Then reload the extension in Chrome when you make changes.

## Usage

### Keyboard Shortcut
- **Mac**: `Cmd+Shift+Comma`
- **Windows/Linux**: `Ctrl+Shift+Comma`

### Extension Popup
- Click the extension icon in the Chrome toolbar
- Click "Open Bookmark Manager" button

## Project Structure

```
src/
├── background/          # Background script
├── content/            # Content script for modal injection
├── popup/              # Extension popup
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── BookmarkModal.tsx
├── lib/               # Utilities
└── globals.css        # Global styles
```

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Lucide React** - Icon library

## Keyboard Shortcut Details

The extension registers the keyboard shortcut in the manifest and handles it through:
1. `manifest.json` - Defines the command
2. `background.ts` - Listens for the command
3. `content.tsx` - Receives message and shows modal

Press `Escape` or click the X button to close the modal.

## License

MIT License
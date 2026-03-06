# Chrome-Extension - Productivity Suite

This project is a multi-feature Manifest V3 Chrome Extension built to enhance user productivity. It was developed to demonstrate working with core Chrome APIs (Tabs, Storage, Scripting), managing background processes, implementing content scripts, and building complex UIs using React and Webpack.

## 🚀 Features

### ✨ Recent Updates
- Migrated to React 18 and Webpack 5.
- Implemented full Manifest V3 compatibility.
- Added comprehensive Tab Session Management, Website Blocker, and Quick Notes features.

### 1. Tab Session Management
Save all your currently open tabs as a named "Session" directly from the popup. You can view all saved sessions in the popup or on the new tab page, and restore them with a single click—which will open a new window containing all those tabs.

### 2. Website Blocker
Configure a list of distracting websites via the Options page. If you attempt to navigate to a blocked site, a service worker will intercept the navigation and replace the page content with a block message, helping you maintain focus.

### 3. Quick Note-Taking
Jot down quick thoughts in the extension popup. These notes are persistently saved. You can read your saved notes from the custom New Tab page, or export them from the Options page.

### 4. Custom New Tab Page
The extension overrides Chrome's default new tab page with a beautiful, custom dashboard that displays the current date, your saved notes, and all your saved tab sessions for easy access.

### 5. Advanced Integrations
- **Right-Click Context Menu**: Right-click anywhere on a webpage and click "Add page to notes" to quickly save the current page's URL to your notes.
- **Keyboard Shortcuts**: Quickly open the extension popup using `Ctrl+Shift+P` (`Cmd+Shift+P` on Mac), or save your current tab session instantly without opening the popup using `Ctrl+Shift+S` (`Cmd+Shift+S` on Mac).
- **Data Export**: Need to backup your data? Visit the Options page to download a `.json` file containing all your notes, tab sessions, and blocked site configurations.

## 🛠️ Technology Stack
- **Framework**: React 18
- **Bundler**: Webpack 5
- **Chrome APIs**: Manifest V3, `chrome.storage`, `chrome.tabs`, `chrome.scripting`, `chrome.contextMenus`, `chrome.commands`
- **Languages**: JavaScript (ES6+), JSX, HTML5, CSS3

## 📦 Setup & Installation Instructions

### Local Development
1. Ensure you have **Node.js** (v16+) installed.
2. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/boomika747/Chrome-Extension.git
   ```
3. Navigate into the project directory:
   ```bash
   cd Chrome-Extension
   ```
4. Install all required dependencies:
   ```bash
   npm install
   ```
5. Build the project using Webpack. This will compile all React code into the `/dist` directory:
   ```bash
   npm run build
   ```

### Loading the Extension into Chrome
Once you have run the build command, load it into your browser:
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Turn on **"Developer mode"** using the toggle switch in the top right corner.
3. Click the **"Load unpacked"** button in the top left corner.
4. Select the root folder of this project (`Chrome-Extension` or `productivity-suite` depending on local folder name).
5. The "Productivity Suite" extension should now be installed and visible in your browser!

### Development Mode
To actively develop and have Webpack watch for changes, you can run:
```bash
npm run dev
```
*Note: You may need to refresh the extension from `chrome://extensions` or reload the webpage for changes to take effect.*

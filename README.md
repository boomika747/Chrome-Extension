# Chrome-Extension

A highly capable multi-feature Chrome extension built with React, Webpack and Manifest V3.

## Features
- Save and restore tab sessions.
- Simple note-taking that syncs across the extension.
- Website blocker with custom redirect rules.
- Custom new tab page with widgets (notes, saved sessions).
- Keyboard shortcuts and right-click context menu integration.
- Data export.

## Setup Instructions

1. Ensure you have Node.js installed (v16+).
2. Run `npm install` inside the project folder.
3. Run `npm run build` to create the production build in `/dist`.

## Loading into Chrome
1. Go to `chrome://extensions`.
2. Enable "Developer mode" in the top right.
3. Click "Load unpacked" and select the `dist` folder generated inside `productivity-suite`.

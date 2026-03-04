// Service Worker for Productivity Suite

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "add-to-notes",
        title: "Add page to notes",
        contexts: ["page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "add-to-notes") {
        const textToAppend = `\n${tab.title} - ${tab.url}`;
        chrome.storage.local.get(['notes'], (result) => {
            const currentNotes = result.notes || "";
            chrome.storage.local.set({ notes: currentNotes + textToAppend });
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === 'save-session') {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            const urls = tabs.map(t => t.url);
            const sessionName = "Shortcut_Session_" + new Date().toLocaleTimeString();
            chrome.storage.local.get(['sessions'], (result) => {
                const sessions = result.sessions || {};
                sessions[sessionName] = urls;
                chrome.storage.local.set({ sessions });
            });
        });
    }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
        chrome.storage.sync.get(['blockedSites'], (result) => {
            const blockedSites = result.blockedSites || [];
            if (blockedSites.length === 0) return;

            try {
                const urlObj = new URL(tab.url);
                const isBlocked = blockedSites.some(site => urlObj.hostname.includes(site));

                if (isBlocked) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: () => {
                            window.stop();
                            const style = "display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da; color: #721c24; font-family: sans-serif;";
                            document.documentElement.innerHTML = `
                 <body style="${style}">
                   <h1 data-testid="blocked-message" style="border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px; background-color: #fff;">
                     Page Blocked by Productivity Suite
                   </h1>
                 </body>
               `;
                        }
                    });
                }
            } catch (e) {
                console.warn("Productivity Suite: Could not parse URL", tab.url);
            }
        });
    }
});

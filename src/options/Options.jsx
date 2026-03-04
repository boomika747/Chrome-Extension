import React, { useState, useEffect } from 'react';
import './Options.css';

const Options = () => {
    const [blockedSites, setBlockedSites] = useState([]);
    const [siteInput, setSiteInput] = useState('');

    useEffect(() => {
        chrome.storage.sync.get(['blockedSites'], (result) => {
            if (result.blockedSites) {
                setBlockedSites(result.blockedSites);
            }
        });
    }, []);

    const handleAddBlock = () => {
        if (!siteInput.trim()) return;
        const newSites = [...blockedSites, siteInput.trim()];
        chrome.storage.sync.set({ blockedSites: newSites }, () => {
            setBlockedSites(newSites);
            setSiteInput('');
        });
    };

    const handleRemoveBlock = (siteToRemove) => {
        const newSites = blockedSites.filter(site => site !== siteToRemove);
        chrome.storage.sync.set({ blockedSites: newSites }, () => {
            setBlockedSites(newSites);
        });
    };

    const handleExportData = () => {
        chrome.storage.local.get(null, (localData) => {
            chrome.storage.sync.get(null, (syncData) => {
                const exportData = {
                    sessions: localData.sessions || {},
                    notes: localData.notes || "",
                    blockedSites: syncData.blockedSites || []
                };
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'productivity_suite_export.json';
                a.click();
            });
        });
    };

    return (
        <div className="options-container">
            <header>
                <h1>Productivity Suite Configuration</h1>
            </header>

            <main>
                <div className="card">
                    <h2>Website Blocker</h2>
                    <p>Block access to distracting websites. Useful for focus time.</p>

                    <div className="block-form">
                        <input
                            type="text"
                            data-testid="block-hostname-input"
                            value={siteInput}
                            onChange={(e) => setSiteInput(e.target.value)}
                            placeholder="e.g., facebook.com, reddit.com"
                        />
                        <button data-testid="add-block-btn" onClick={handleAddBlock}>Add to Blocklist</button>
                    </div>

                    <div data-testid="blocked-sites-list" className="blocked-list">
                        {blockedSites.length === 0 ? (
                            <p className="empty-text">No sites blocked yet.</p>
                        ) : (
                            <ul>
                                {blockedSites.map((site, index) => (
                                    <li key={index}>
                                        <span>{site}</span>
                                        <button className="remove-btn" onClick={() => handleRemoveBlock(site)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h2>Data Management</h2>
                    <p>Export all your notes, sessions, and settings to a JSON file.</p>
                    <button data-testid="export-data-btn" className="export-btn" onClick={handleExportData}>
                        Export All Data
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Options;

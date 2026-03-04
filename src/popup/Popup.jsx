import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
    const [note, setNote] = useState('');
    const [sessions, setSessions] = useState({});
    const [sessionName, setSessionName] = useState('');

    useEffect(() => {
        chrome.storage.local.get(['notes', 'sessions'], (result) => {
            if (result.notes) setNote(result.notes);
            if (result.sessions) setSessions(result.sessions);
        });
    }, []);

    const handleSaveNotes = () => {
        chrome.storage.local.set({ notes: note });
    };

    const handleSaveSession = () => {
        const name = sessionName || `Session-${Date.now()}`;
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            const urls = tabs.map(t => t.url);
            const updatedSessions = { ...sessions, [name]: urls };
            chrome.storage.local.set({ sessions: updatedSessions }, () => {
                setSessions(updatedSessions);
                setSessionName('');
            });
        });
    };

    const handleRestoreSession = (name) => {
        const urls = sessions[name];
        if (urls && urls.length > 0) {
            chrome.windows.create({ url: urls });
        }
    };

    const handleOpenOptions = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    };

    return (
        <div className="popup-container">
            <h2>Productivity Suite</h2>

            <div className="section">
                <h3>Quick Notes</h3>
                <textarea
                    data-testid="notes-textarea"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Jot down notes here..."
                />
                <button data-testid="save-notes-btn" onClick={handleSaveNotes}>Save Notes</button>
            </div>

            <div className="section">
                <h3>Tab Sessions</h3>
                <input
                    type="text"
                    placeholder="Session name (optional)"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                />
                <button data-testid="save-session-btn" onClick={handleSaveSession}>Save Window as Session</button>

                <div data-testid="sessions-list" className="sessions-list">
                    {Object.keys(sessions).map(name => (
                        <div key={name} className="session-item">
                            <span>{name} ({sessions[name].length} tabs)</span>
                            <button
                                data-testid={`restore-session-${name}`}
                                onClick={() => handleRestoreSession(name)}>
                                Restore
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section footer">
                <button data-testid="open-options-btn" className="link-btn" onClick={handleOpenOptions}>
                    Open Options
                </button>
            </div>
        </div>
    );
};

export default Popup;

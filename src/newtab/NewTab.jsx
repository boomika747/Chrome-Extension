import React, { useState, useEffect } from 'react';
import './NewTab.css';

const NewTab = () => {
    const [note, setNote] = useState('');
    const [sessions, setSessions] = useState({});

    useEffect(() => {
        chrome.storage.local.get(['notes', 'sessions'], (result) => {
            if (result.notes) setNote(result.notes);
            if (result.sessions) setSessions(result.sessions);
        });
    }, []);

    const handleRestoreSession = (name) => {
        const urls = sessions[name];
        if (urls && urls.length > 0) {
            chrome.windows.create({ url: urls });
        }
    };

    return (
        <div className="newtab-container">
            <header>
                <h1>Good Day!</h1>
                <p className="date">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>

            <div className="widgets-grid">
                <div className="widget notes-widget">
                    <h2>Your Notes</h2>
                    <div data-testid="widget-notes" className="widget-content notes-content">
                        {note ? (
                            <p>{note}</p>
                        ) : (
                            <p className="empty">No notes found. Open the extension popup to take notes.</p>
                        )}
                    </div>
                </div>

                <div className="widget sessions-widget">
                    <h2>Saved Tab Sessions</h2>
                    <div data-testid="widget-sessions" className="widget-content">
                        {Object.keys(sessions).length === 0 ? (
                            <p className="empty">No saved sessions yet.</p>
                        ) : (
                            <ul className="sessions-list-newtab">
                                {Object.keys(sessions).map(name => (
                                    <li key={name}>
                                        <div className="session-info">
                                            <span className="session-name">{name}</span>
                                            <span className="session-count">{sessions[name].length} tabs</span>
                                        </div>
                                        <button onClick={() => handleRestoreSession(name)}>Restore</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTab;

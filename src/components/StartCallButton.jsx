import React from 'react';
import './StartCallButton.css';

const StartCallButton = ({ status, onToggleCall }) => {
    // status: 'idle', 'connecting', 'active', 'ended'

    const getButtonText = () => {
        switch (status) {
            case 'idle': return 'Start Call';
            case 'connecting': return 'Connecting...';
            case 'active': return 'End Call';
            case 'ended': return 'Call Ended';
            default: return 'Start Call';
        }
    };

    const isConnecting = status === 'connecting';
    const isActive = status === 'active';

    return (
        <div className="button-container">
            <button
                className={`call-button ${status}`}
                onClick={onToggleCall}
                disabled={isConnecting}
            >
                {isConnecting && <span className="spinner"></span>}
                {isActive && (
                    <div className="waveform">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                )}
                <span className="button-text">{getButtonText()}</span>
            </button>

            <div className="status-indicator">
                <span className={`dot ${status}`}></span>
                <span className="status-text">State: {status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
        </div>
    );
};

export default StartCallButton;

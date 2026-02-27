import React, { useEffect, useRef } from 'react';
import './TranscriptPanel.css';

const TranscriptPanel = ({ transcript }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcript]);

    return (
        <div className="transcript-panel">
            <h3 className="panel-title">Conversation</h3>
            <div className="messages-container" ref={scrollRef}>
                {transcript.length === 0 ? (
                    <div className="empty-state">
                        Start the call to begin your booking conversation.
                    </div>
                ) : (
                    transcript.map((msg, idx) => (
                        <div key={idx} className={`message-wrapper ${msg.role}`}>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TranscriptPanel;

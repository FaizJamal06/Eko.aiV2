import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import StartCallButton from './components/StartCallButton';
import TranscriptPanel from './components/TranscriptPanel';
import BookingConfirmation from './components/BookingConfirmation';
import UpcomingBookings from './components/UpcomingBookings';
import './index.css';

// Initialize Vapi instance. Replace with actual Public Key from Vapi Dashboard.
// Do not expose sensitive private keys.
const vapi = new Vapi('83790b03-14a9-45be-90c2-590ea22b2bdd');

// Replace with actual Assistant ID you configured in Vapi Dashboard.
const ASSISTANT_ID = '3566be19-4473-43a9-8cbb-e837eff911ab';

function App() {
    const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'connecting', 'active', 'ended'
    const [transcript, setTranscript] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(null);

    // Mock mock events for the demo
    const [upcomingEvents, setUpcomingEvents] = useState([
        { title: 'Project Kickoff', date: 'Oct 12', time: '10:00 AM', month: 'OCT', day: '12' },
        { title: 'Design Review', date: 'Oct 15', time: '2:30 PM', month: 'OCT', day: '15' }
    ]);

    useEffect(() => {
        // Vapi Event Listeners

        // Call started
        vapi.on('call-start', () => {
            setCallStatus('active');
            setTranscript([{ role: 'assistant', text: 'Hello! I am your AI booking assistant. How can I help you today?' }]);
        });

        // Call ended
        vapi.on('call-end', () => {
            setCallStatus('ended');
            // Reset after a few seconds to idle
            setTimeout(() => setCallStatus('idle'), 3000);
        });

        // Transcript messages
        vapi.on('message', (message) => {
            console.log('Vapi Message:', message); // ADDED: Debug all messages

            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setTranscript((prev) => [
                    ...prev,
                    { role: message.role, text: message.transcript }
                ]);
            }

            // Listen for function calls or tool calls from Vapi built-in tools
            if (message.type === 'function-call' || message.type === 'tool-calls') {
                console.log('Function or Tool Call received:', message);

                // Let's check both functionCall format and toolCalls format
                const callObj = message.functionCall || (message.toolCalls && message.toolCalls[0]?.function);

                if (callObj) {
                    const args = callObj.arguments || callObj.parameters;
                    const parsedArgs = typeof args === 'string' ? JSON.parse(args) : args;

                    console.log('Parsed Args:', parsedArgs);

                    if (parsedArgs && parsedArgs.start_time) {
                        setBookingDetails({
                            title: parsedArgs.summary || 'Meeting',
                            date: new Date(parsedArgs.start_time).toLocaleDateString(),
                            time: new Date(parsedArgs.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            duration: parsedArgs.duration_minutes || '30'
                        });

                        // Add to upcoming events (demo logic)
                        const newDate = new Date(parsedArgs.start_time);
                        setUpcomingEvents(prev => [{
                            title: parsedArgs.summary || 'Meeting',
                            date: newDate.toLocaleDateString(),
                            time: newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            month: newDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
                            day: newDate.getDate().toString()
                        }, ...prev]);
                    }
                }
            }
        });

        // Error handling
        vapi.on('error', (e) => {
            console.error('Vapi Error:', e);
            setCallStatus('idle');
        });

        // Cleanup listeners on unmount
        return () => {
            vapi.removeAllListeners();
        };
    }, []);

    const toggleCall = () => {
        if (callStatus === 'active') {
            vapi.stop();
            setCallStatus('ended');
        } else {
            setCallStatus('connecting');
            setTranscript([]); // clear transcript on new call
            setBookingDetails(null); // clear old bookings

            vapi.start(ASSISTANT_ID);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>AI Voice Assistant</h1>
                <p>Book your meetings effortlessly.</p>
            </header>

            <main className="main-content" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div className="left-column">
                    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                        <StartCallButton status={callStatus} onToggleCall={toggleCall} />
                    </div>

                    <TranscriptPanel transcript={transcript} />
                </div>

                <div className="right-column">
                    <BookingConfirmation eventDetails={bookingDetails} />
                    <UpcomingBookings events={upcomingEvents} />
                </div>
            </main>
        </div>
    );
}

export default App;

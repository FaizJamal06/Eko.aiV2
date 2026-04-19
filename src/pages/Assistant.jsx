import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Vapi from '@vapi-ai/web';
import { useAppContext } from '../context/AppContext';
import StartCallButton from '../components/StartCallButton';
import TranscriptPanel from '../components/TranscriptPanel';
import BookingConfirmation from '../components/BookingConfirmation';
import Navbar from '../components/Navbar';
import '../index.css';

const vapi = new Vapi('83790b03-14a9-45be-90c2-590ea22b2bdd');

const ASSISTANT_ID = '3566be19-4473-43a9-8cbb-e837eff911ab';

const SERVICES_DATA = {
    "General Checkup": ["Dr. Sharma", "Dr. Gupta", "Dr. Patel"],
    "Cardiology": ["Dr. Reddy", "Dr. Iyer"],
    "Dentistry": ["Dr. Singh", "Dr. Verma"],
    "Dermatology": ["Dr. Desai", "Dr. Kumar", "Dr. Joshi"]
};

function Assistant() {
    const [callStatus, setCallStatus] = useState('idle');
    const [transcript, setTranscript] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [selectedService, setSelectedService] = useState('');
    const { addAppointment, addInteraction, updateAgentStatus, incrementAgentCalls } = useAppContext();

    useEffect(() => {
        vapi.on('call-start', () => {
            setCallStatus('active');
            setTranscript([{ role: 'assistant', text: 'Hi there! How is your day going? I\'d love to chat for a bit.' }]);
            updateAgentStatus('ARSHAD', 'Active');
            addInteraction({
                agentId: 'ARSHAD',
                title: 'Call Started',
                details: 'User connected to AI assistant.',
                type: 'INFO',
                time: new Date().toLocaleTimeString()
            });
        });

        vapi.on('call-end', () => {
            setCallStatus('ended');
            setTimeout(() => setCallStatus('idle'), 3000);
            updateAgentStatus('ARSHAD', 'Available');
            incrementAgentCalls('ARSHAD');
            addInteraction({
                agentId: 'ARSHAD',
                title: 'Call Ended',
                details: 'User disconnected from AI assistant.',
                type: 'INFO',
                time: new Date().toLocaleTimeString()
            });
        });

        vapi.on('message', (message) => {
            console.log('Vapi Message:', message);

            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setTranscript((prev) => [
                    ...prev,
                    { role: message.role, text: message.transcript }
                ]);
                
                addInteraction({
                    agentId: 'ARSHAD',
                    title: message.role === 'assistant' ? 'Agent Spoke' : 'User Spoke',
                    details: message.transcript,
                    type: 'TRANSCRIPT',
                    time: new Date().toLocaleTimeString()
                });
            }

            if (message.type === 'function-call' || message.type === 'tool-calls') {
                console.log('Function or Tool Call received:', message);

                const callObj = message.functionCall || 
                               (message.toolCallList && message.toolCallList[0]?.function) || 
                               (message.toolCalls && message.toolCalls[0]?.function);

                if (callObj) {
                    const args = callObj.arguments || callObj.parameters;
                    const parsedArgs = typeof args === 'string' ? JSON.parse(args) : args;

                    console.log('Parsed Args:', parsedArgs);

                    if (parsedArgs && parsedArgs.start_time) {
                        const newBooking = {
                            title: parsedArgs.summary || 'Meeting',
                            date: new Date(parsedArgs.start_time).toLocaleDateString(),
                            time: new Date(parsedArgs.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            duration: parsedArgs.duration_minutes ? `${parsedArgs.duration_minutes} min` : '30 min'
                        };
                        setBookingDetails(newBooking);
                        
                        addAppointment({
                            id: Date.now(),
                            date: newBooking.date,
                            time: newBooking.time,
                            doctor: 'Dr. Vapi AI',
                            service: newBooking.title,
                            status: 'Scheduled',
                            duration: newBooking.duration
                        });

                        addInteraction({
                            agentId: 'ARSHAD',
                            title: 'Appointment Booked',
                            details: `Booked ${newBooking.title} on ${newBooking.date} at ${newBooking.time}.`,
                            type: 'BOOKING',
                            time: new Date().toLocaleTimeString()
                        });
                    }
                }
            }
        });
        vapi.on('error', (e) => {
            console.error('Vapi Error:', e);
            setCallStatus('idle');
        });
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
            setTranscript([]);
            setBookingDetails(null);

            vapi.start(ASSISTANT_ID);
        }
    };

    return (
        <div className="min-h-screen flex flex-col w-full">
            <Navbar />

            <main className="flex-1 w-full mt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
                        AI Voice Assistant
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Book your meetings effortlessly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="glass-panel flex flex-col items-center justify-center p-8 bg-card/50">
                            <StartCallButton status={callStatus} onToggleCall={toggleCall} />
                        </div>

                        <TranscriptPanel transcript={transcript} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <BookingConfirmation eventDetails={bookingDetails} />
                        
                        <div className="glass-panel p-6 bg-card/50 border border-border rounded-xl shadow-lg mt-4">
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Services we provide</h2>
                            <select 
                                className="w-full p-3 rounded-md bg-background border border-border text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                            >
                                <option value="" disabled>Select a service...</option>
                                {Object.keys(SERVICES_DATA).map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>

                            {selectedService && (
                                <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-sm uppercase tracking-wider font-semibold mb-3 text-muted-foreground">Available Doctors</h3>
                                    <div className="flex flex-col gap-3">
                                        {SERVICES_DATA[selectedService].map((doctor, index) => (
                                            <div key={index} className="px-4 py-3 rounded-lg bg-background/50 border border-border flex items-center justify-between hover:bg-secondary/20 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                                                        {doctor.split(' ')[1]?.[0] || 'D'}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-foreground block">{doctor}</span>
                                                        <span className="text-xs text-muted-foreground">{selectedService} Specialist</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-xs font-medium text-green-500">Available</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Assistant;

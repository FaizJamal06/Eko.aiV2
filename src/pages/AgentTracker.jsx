import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { Bot, ArrowLeft, Activity, Phone, PhoneOff } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentTracker = () => {
    const { id } = useParams();
    const { agents, liveInteractions } = useAppContext();

    const agent = agents.find(a => a.id === id) || { name: 'Unknown Agent', status: 'Offline', callsHandled: 0 };
    
    // Filter interactions specifically for this agent (or show global if not specified for now)
    const agentInteractions = liveInteractions.filter(i => i.agentId === id || !i.agentId);

    return (
        <div className="min-h-screen flex flex-col w-full bg-background relative font-sans overflow-hidden">
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <Navbar />

            <main className="flex-1 w-full mt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto pb-12 relative z-10">
                <Link to="/admin" className="text-muted-foreground hover:text-primary mb-6 flex items-center gap-2 w-fit transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Agent Status Card */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-panel p-8 rounded-2xl bg-card/40 border border-border shadow-lg flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 ${agent.status === 'Active' ? 'bg-green-500' : agent.status === 'Available' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                            
                            <div className="relative mb-4">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-card border-2 shadow-inner ${agent.status === 'Active' ? 'border-green-500 text-green-500 relative z-10' : 'border-primary/50 text-primary'}`}>
                                    <Bot size={40} />
                                </div>
                                {agent.status === 'Active' && (
                                    <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping" />
                                )}
                            </div>

                            <h1 className="text-2xl font-bold font-outfit mb-1">{agent.id}</h1>
                            <p className="text-muted-foreground mb-4">{agent.name}</p>

                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-sm ${
                                agent.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                agent.status === 'Available' ? 'bg-primary/10 text-primary border border-primary/20' :
                                'bg-muted border border-border'
                            }`}>
                                {agent.status === 'Active' ? <Phone className="animate-pulse" size={16} /> : <PhoneOff size={16} />}
                                {agent.status}
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/50 w-full flex justify-between px-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Calls</p>
                                    <p className="text-2xl font-black">{agent.callsHandled}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Success Rate</p>
                                    <p className="text-2xl font-black">{agent.callsHandled > 0 ? '98%' : '---'}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Agent Live Activity Log */}
                    <div className="md:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-panel h-full p-6 rounded-2xl bg-card/40 border border-border shadow-lg"
                        >
                            <h2 className="text-xl font-bold mb-6 border-b border-border/50 pb-4 flex items-center justify-between">
                                <span className="flex items-center gap-2"><Activity className="text-blue-500" /> Live Agent Feed</span>
                                {agent.status === 'Active' && <span className="text-xs font-bold text-green-500 animate-pulse flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"/> LIVE</span>}
                            </h2>

                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
                                {agentInteractions.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-10">No recent activity detected for this agent.</div>
                                ) : (
                                    agentInteractions.map((log, index) => (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }} 
                                            animate={{ opacity: 1, y: 0 }}
                                            key={index} 
                                            className="relative pl-6 border-l-2 border-primary/30 pb-4 group last:pb-0 last:border-0"
                                        >
                                            <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform" />
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-semibold text-sm text-foreground">{log.title}</p>
                                                <span className="text-xs text-muted-foreground">{log.time}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                                            {log.type === 'BOOKING' && (
                                                <span className="text-xs font-semibold bg-green-500/10 text-green-500 px-2 py-1 rounded inline-flex items-center border border-green-500/20">Appointment Saved</span>
                                            )}
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AgentTracker;

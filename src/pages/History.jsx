import React from 'react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, User, Activity, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
    switch (status) {
        case 'Completed':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    <CheckCircle size={14} /> Completed
                </span>
            );
        case 'Cancelled':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                    <XCircle size={14} /> Cancelled
                </span>
            );
        case 'Scheduled':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Clock3 size={14} /> Scheduled
                </span>
            );
        default:
            return null;
    }
};

const History = () => {
    const { appointments } = useAppContext();
    
    return (
        <div className="min-h-screen flex flex-col w-full bg-background relative font-sans overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <Navbar />

            <main className="flex-1 w-full mt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto pb-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3 font-outfit">
                        Appointment History
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Review your past and upcoming medical appointments.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-panel overflow-hidden border border-border/50 rounded-2xl bg-card/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] font-inter"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/50 bg-muted/20">
                                    <th className="p-4 text-sm font-semibold text-muted-foreground">Date & Time</th>
                                    <th className="p-4 text-sm font-semibold text-muted-foreground">Doctor</th>
                                    <th className="p-4 text-sm font-semibold text-muted-foreground">Service</th>
                                    <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
                                    <th className="p-4 text-sm font-semibold text-muted-foreground">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((item, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                                        key={item.id} 
                                        className="border-b border-border/30 hover:bg-muted/10 transition-colors group"
                                    >
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground flex items-center gap-1.5"><Calendar size={14} className="text-muted-foreground"/> {item.date}</span>
                                                <span className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><Clock size={14} className="text-muted-foreground"/> {item.time}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium text-foreground flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shadow-inner">
                                                    {item.doctor.split(' ')[1]?.[0] || 'D'}
                                                </div>
                                                {item.doctor}
                                            </span>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            <span className="flex items-center gap-2"><Activity size={16} /> {item.service}</span>
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="p-4 text-muted-foreground font-medium">
                                            {item.duration}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {appointments.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No appointment history found.
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default History;

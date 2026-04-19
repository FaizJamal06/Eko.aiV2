import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { Users, Bot, Activity, UserPlus, PhoneIncoming, Search, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CUSTOMERS = [
    { id: 1, name: 'Alice Smith', email: 'alice.smith@example.com', joined: 'Oct 12, 2023', plan: 'Premium' },
    { id: 2, name: 'Robert Johnson', email: 'robert.j@example.com', joined: 'Oct 14, 2023', plan: 'Basic' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@example.com', joined: 'Oct 15, 2023', plan: 'Premium' },
    { id: 4, name: 'Michael Brown', email: 'michael.b@example.com', joined: 'Oct 18, 2023', plan: 'Basic' },
];

const MOCK_DOCTORS = [
    { name: 'Dr. Sharma', service: 'General', status: 'Available' },
    { name: 'Dr. Reddy', service: 'Cardiology', status: 'In Call' },
    { name: 'Dr. Singh', service: 'Dentistry', status: 'Available' },
    { name: 'Dr. Kumar', service: 'Dermatology', status: 'Busy' },
];

const Admin = () => {
    const { agents, liveInteractions } = useAppContext();
    
    return (
        <div className="min-h-screen flex flex-col w-full bg-background relative font-sans overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[30%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <Navbar />

            <main className="flex-1 w-full mt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            Super Admin <span className="px-2.5 py-1 rounded-md bg-primary/20 text-primary text-xs tracking-wider uppercase">Live</span>
                        </h1>
                        <p className="text-muted-foreground">Monitor real-time system activity and user metrics.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex gap-4"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search users..." 
                                className="pl-9 pr-4 py-2 bg-card/40 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-64"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: AI Agents & Live Bookings */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        
                        {/* Live AI Agent Tracking */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="glass-panel p-6 rounded-2xl bg-card/40 border border-border shadow-lg"
                        >
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
                                <Bot className="text-primary" size={20} /> AI Agent Fleet
                            </h2>
                            <div className="flex flex-col gap-4">
                                {agents.map((agent, i) => (
                                    <div key={i} className="flex flex-col gap-3 p-4 rounded-xl bg-background/50 border border-border/50 transition-colors hover:border-primary/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex h-3 w-3">
                                                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${agent.status === 'Active' ? 'animate-ping bg-green-500' : 'bg-primary'}`}></span>
                                                  <span className={`relative inline-flex rounded-full h-3 w-3 ${agent.status === 'Active' ? 'bg-green-500' : 'bg-primary'}`}></span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{agent.id}</p>
                                                    <p className="text-xs text-muted-foreground">{agent.status}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{agent.callsHandled}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Calls</p>
                                            </div>
                                        </div>
                                        <Link 
                                            to={`/admin/agent/${agent.id}`}
                                            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
                                        >
                                            Track Live <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Live Bookings */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="glass-panel p-6 rounded-2xl bg-card/40 border border-border shadow-lg flex-1"
                        >
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
                                <Activity className="text-blue-500" size={20} /> Live Interactions
                            </h2>
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] pr-2">
                                {liveInteractions.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">No recent live activity.</p>
                                ) : (
                                    liveInteractions.map((log, index) => (
                                        <div key={index} className="relative pl-6 border-l-2 border-primary/30 pb-4 last:border-0 last:pb-0 group">
                                            <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform" />
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-semibold text-sm text-foreground">{log.title}</p>
                                                <span className="text-xs text-muted-foreground">{log.time}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                                            <p className={`text-xs font-semibold px-2 py-1 rounded inline-flex items-center border ${log.type === 'BOOKING' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                                {log.agentId}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>

                    </div>

                    {/* Right Column: Customers list & Doctors */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        
                        {/* Users Table */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="glass-panel rounded-2xl bg-card/40 border border-border shadow-lg overflow-hidden flex-1"
                        >
                            <div className="p-6 border-b border-border/50 flex justify-between items-center">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Users className="text-purple-500" size={20} /> Registered Customers
                                </h2>
                                <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-full">{MOCK_CUSTOMERS.length} total</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-muted/10 border-b border-border/30">
                                            <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                                            <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                                            <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                                            <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {MOCK_CUSTOMERS.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-muted/5 transition-colors">
                                                <td className="p-4 flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                        {customer.name[0]}
                                                    </div>
                                                    <span className="font-medium text-sm">{customer.name}</span>
                                                </td>
                                                <td className="p-4 text-sm text-muted-foreground">{customer.email}</td>
                                                <td className="p-4 text-sm text-muted-foreground">{customer.joined}</td>
                                                <td className="p-4">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${customer.plan === 'Premium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-muted text-muted-foreground border border-border'}`}>
                                                        {customer.plan}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Live Doctors Availability */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="glass-panel p-6 rounded-2xl bg-card/40 border border-border shadow-lg"
                        >
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
                                <UserPlus className="text-teal-500" size={20} /> Live Doctor Availability
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {MOCK_DOCTORS.map((doctor, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-background/40 border border-border hover:border-primary/50 transition-colors flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold text-lg mb-3 shadow-inner">
                                            {doctor.name.split(' ')[1]?.[0] || 'D'}
                                        </div>
                                        <span className="font-semibold text-sm block">{doctor.name}</span>
                                        <span className="text-xs text-muted-foreground block mb-3">{doctor.service}</span>
                                        
                                        <div className={`w-full py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1.5 ${
                                            doctor.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                                            doctor.status === 'In Call' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                            {doctor.status === 'Available' ? <CheckCircle2 size={12}/> :
                                             doctor.status === 'In Call' ? <PhoneIncoming size={12}/> :
                                             <XCircle size={12}/>}
                                            {doctor.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;

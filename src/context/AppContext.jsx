import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // Shared State
    const [appointments, setAppointments] = useState([]);
    const [liveInteractions, setLiveInteractions] = useState([]);
    
    // We mock a few agents. 'ARSHAD' is the main one that will actually change state dynamically via the Assistant page.
    const [agents, setAgents] = useState([
        { id: 'ARSHAD', name: 'Booking Assistant', status: 'Available', callsHandled: 0 },
        { id: 'ARJUN', name: 'Billing Support', status: 'Offline', callsHandled: 0 }
    ]);

    // Actions
    const addAppointment = useCallback((appointment) => {
        setAppointments(prev => [appointment, ...prev]);
    }, []);

    const addInteraction = useCallback((interaction) => {
        // Keeps only the most recent 50 interactions
        setLiveInteractions(prev => [interaction, ...prev].slice(0, 50));
    }, []);

    const updateAgentStatus = useCallback((id, status) => {
        setAgents(prev => prev.map(agent => 
            agent.id === id ? { ...agent, status } : agent
        ));
    }, []);

    const incrementAgentCalls = useCallback((id) => {
        setAgents(prev => prev.map(agent => 
            agent.id === id ? { ...agent, callsHandled: agent.callsHandled + 1 } : agent
        ));
    }, []);

    return (
        <AppContext.Provider value={{
            appointments,
            liveInteractions,
            agents,
            addAppointment,
            addInteraction,
            updateAgentStatus,
            incrementAgentCalls
        }}>
            {children}
        </AppContext.Provider>
    );
};

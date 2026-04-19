import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import History from './pages/History';
import Admin from './pages/Admin';
import AgentTracker from './pages/AgentTracker';

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/demo" element={<Assistant />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/agent/:id" element={<AgentTracker />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;

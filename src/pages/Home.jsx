import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import DemoSection from '../components/sections/DemoSection';
import UseCases from '../components/sections/UseCases';
import HowItWorks from '../components/sections/HowItWorks';
import Features from '../components/sections/Features';
import Trust from '../components/sections/Trust';
import DashboardPreview from '../components/sections/DashboardPreview';
import Pricing from '../components/sections/Pricing';
import FinalCTA from '../components/sections/FinalCTA';
import Footer from '../components/sections/Footer';

function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/30">
            <Navbar />
            <main>
                <Hero />
                <DemoSection />
                <UseCases />
                <HowItWorks />
                <Features />
                <Trust />
                <DashboardPreview />
                <Pricing />
                <FinalCTA />
                <Footer />
            </main>
        </div>
    );
}

export default Home;

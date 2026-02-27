import React from 'react';
import { PhoneCall, Cpu, MessageCircle, Database } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Customer Calls",
        description: "Your customer dials your existing business number.",
        icon: <PhoneCall className="h-8 w-8 text-white" />,
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "AI Understands",
        description: "Our advanced speech engine processes intent instantly.",
        icon: <Cpu className="h-8 w-8 text-white" />,
        color: "bg-indigo-500",
    },
    {
        id: 3,
        title: "Natural Response",
        description: "AI replies with a human-like voice in < 500ms.",
        icon: <MessageCircle className="h-8 w-8 text-white" />,
        color: "bg-cyan-500",
    },
    {
        id: 4,
        title: "Action Taken",
        description: "Call details, bookings, or tickets are saved to your CRM.",
        icon: <Database className="h-8 w-8 text-white" />,
        color: "bg-emerald-500",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground text-lg">Set it up once, run it forever.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative bg-background pt-4 lg:pt-0">
                                <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ${step.color} relative z-10 ring-8 ring-background`}>
                                    {step.icon}
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-sm font-bold text-muted-foreground mb-2">STEP 0{step.id}</div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

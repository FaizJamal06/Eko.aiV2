import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Mic, Globe, BarChart3, ShieldCheck, Repeat, Settings } from 'lucide-react';

const features = [
    {
        title: "Natural Human-Like Speech",
        description: "Our advanced TTS engine creates voices so real, customers can't tell the difference.",
        icon: <Mic className="h-6 w-6 text-blue-500" />,
    },
    {
        title: "Multi-Language Support",
        description: "Speak to your customers in their native language with 50+ languages supported instantly.",
        icon: <Globe className="h-6 w-6 text-indigo-500" />,
    },
    {
        title: "Real-Time Analytics",
        description: "Track call volume, sentiment, and resolution rates in a beautiful dashboard.",
        icon: <BarChart3 className="h-6 w-6 text-cyan-500" />,
    },
    {
        title: "Smart Call Transfer",
        description: "The AI handles routine tasks but intelligently transfers complex issues to humans.",
        icon: <Repeat className="h-6 w-6 text-purple-500" />,
    },
    {
        title: "Enterprise-Grade Security",
        description: "Your data is encrypted end-to-end. SOC2 and GDPR compliant.",
        icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    },
    {
        title: "Easy Integration",
        description: "Connects with your existing phone system and CRM in minutes.",
        icon: <Settings className="h-6 w-6 text-orange-500" />,
    },
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-background">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <br /><span className="text-blue-500">automate your phone lines</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Powerful features designed to help you scale without hiring more staff.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-card border-border/50 hover:border-border hover:bg-card/80">
                            <CardContent className="flex gap-4 p-6 pt-6">
                                <div className="shrink-0 h-12 w-12 rounded-xl bg-background flex items-center justify-center border border-border">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

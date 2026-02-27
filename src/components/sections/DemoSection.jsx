import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import VoiceWave from '../ui/VoiceWave';
import { Play, Pause, MessageSquare, Phone } from 'lucide-react';
import { cn } from '../../lib/utils'; // Keep relative path for now

const demos = [
    {
        id: 1,
        title: "Appointment Booking",
        industry: "Health Clinic",
        transcript: [
            { role: "AI", text: "Good morning, Dr. Smith's clinic. How can I help you today?" },
            { role: "User", text: "Hi, I'd like to book an appointment for a dental checkup." },
            { role: "AI", text: "I can help with that. Are you a new or returning patient?" },
            { role: "User", text: "I'm a returning patient. My name is Sarah." },
            { role: "AI", text: "Thanks, Sarah. I have an opening this Thursday at 10 AM or Friday at 2 PM. Which works best?" },
        ],
    },
    {
        id: 2,
        title: "Order Status",
        industry: "E-commerce",
        transcript: [
            { role: "AI", text: "Thank you for calling StyleStore. Are you calling about an existing order?" },
            { role: "User", text: "Yes, I haven't received my package yet." },
            { role: "AI", text: "I can check that for you. Could you please say your order number?" },
        ],
    },
];

const DemoSection = () => {
    const [activeDemo, setActiveDemo] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulate audio progress
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <section id="demo" className="py-20 bg-background relative overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Hear it in <span className="text-blue-500">Action</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Experience the natural flow of our AI conversations. It sounds just like a human.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Player & Controls */}
                    <div className="space-y-8">
                        <div className="flex gap-4 mb-4">
                            {demos.map((demo, idx) => (
                                <button
                                    key={demo.id}
                                    onClick={() => { setActiveDemo(idx); setProgress(0); setIsPlaying(false); }}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                        activeDemo === idx
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "bg-card border-border text-muted-foreground hover:border-blue-500/50"
                                    )}
                                >
                                    {demo.industry}
                                </button>
                            ))}
                        </div>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{demos[activeDemo].title}</h3>
                                            <p className="text-sm text-muted-foreground">00:45 • MP3</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <VoiceWave isPlaying={isPlaying} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        size="icon"
                                        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                                        onClick={togglePlay}
                                    >
                                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                                    </Button>
                                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-100"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center lg:text-left">
                            <p className="mb-4 text-muted-foreground">Ready to automate your calls?</p>
                            <Link to="/demo">
                                <Button className="w-full sm:w-auto px-8" size="lg">Talk to our AI Now</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Transcript */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
                        <Card className="relative h-[500px] border-border/50 bg-card/80 backdrop-blur overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-border/50 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">Live Transcript</span>
                            </div>
                            <CardContent className="p-6 flex-1 overflow-y-auto space-y-4">
                                {demos[activeDemo].transcript.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex gap-3 max-w-[85%]",
                                            msg.role === "User" ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0",
                                                msg.role === "User" ? "bg-zinc-700 text-white" : "bg-blue-600 text-white"
                                            )}
                                        >
                                            {msg.role === "AI" ? "AI" : "You"}
                                        </div>
                                        <div
                                            className={cn(
                                                "p-3 rounded-2xl text-sm leading-relaxed",
                                                msg.role === "User"
                                                    ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                                                    : "bg-blue-500/10 text-blue-100 border border-blue-500/20 rounded-tl-sm"
                                            )}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;

import React from 'react';
import { Card } from '../ui/Card';

const DashboardPreview = () => {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Full Visibility & Control</h2>
                    <p className="text-muted-foreground text-lg">
                        Monitor every conversation, track sentiment, and integrate with your favorite tools.
                    </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-background shadow-2xl overflow-hidden mb-20 relative">
                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

                    <div className="border-b border-border p-4 flex items-center justify-between bg-card/50">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">dashboard.eko.ai</div>
                        <div className="w-4" />
                    </div>

                    <div className="p-6 md:p-8 grid md:grid-cols-4 gap-6">
                        <div className="hidden md:block space-y-2">
                            {['Overview', 'Calls', 'Contacts', 'Analytics', 'Settings'].map((item, i) => (
                                <div key={item} className={`px-4 py-2 rounded-md text-sm font-medium ${i === 0 ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="md:col-span-3 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Total Calls", val: "1,234", change: "+12%" },
                                    { label: "Avg Duration", val: "2m 14s", change: "-5%" },
                                    { label: "Sentiment", val: "Positive", change: "98%" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-card border border-border">
                                        <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                                        <div className="text-2xl font-bold">{stat.val}</div>
                                        <div className="text-xs text-green-500 mt-1">{stat.change} vs last week</div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-64 rounded-lg bg-card border border-border relative overflow-hidden flex items-end px-4 gap-2 pt-10">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-500/40 transition-colors" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Works with your stack</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {['Salesforce', 'HubSpot', 'Zendesk', 'Twilio', 'Zapier', 'Slack'].map((tool) => (
                            <div key={tool} className="px-6 py-3 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors">
                                {tool}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;

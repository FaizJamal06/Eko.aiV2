import React from 'react';
import { Button } from '../ui/Button';

const FinalCTA = () => {
    return (
        <section className="py-32 bg-secondary/30 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Let Your Business Answer <br />
                    <span className="text-blue-500">Every Call — Automatically.</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join 500+ businesses saving time and closing more deals with our AI voice agents.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20">
                        Start Free Trial
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-background">
                        Talk to Sales
                    </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
            </div>
        </section>
    );
};

export default FinalCTA;

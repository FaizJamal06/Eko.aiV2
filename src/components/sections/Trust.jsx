import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Star } from 'lucide-react';

const Trust = () => {
    return (
        <section className="py-20 border-y border-border/40 bg-secondary/5">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Trusted by innovative teams</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - Replace with images if available, using text for now */}
                        {['TechCorp', 'GlobalHealth', 'EdStart', 'Shopify', 'Twilio'].map((logo) => (
                            <span key={logo} className="text-2xl font-bold text-foreground/50">{logo}</span>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="bg-gradient-to-br from-blue-900/20 to-background border-blue-500/20">
                        <CardContent className="p-8 md:p-12 text-center">
                            <div className="flex justify-center mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                                "We reduced our missed calls by 95% in the first week. The AI sounds so professional, our customers actually prefer talking to it."
                            </blockquote>
                            <div>
                                <div className="font-bold text-lg">Sarah Johnson</div>
                                <div className="text-muted-foreground">Operations Director at MediCare Clinic</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Trust;

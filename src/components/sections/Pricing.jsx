import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for testing the waters.",
        features: ["1 AI Voice Agent", "100 Minutes/month", "Basic Analytics", "Email Support"],
        buttonText: "Start For Free",
        popular: false,
    },
    {
        name: "Growth",
        price: "$499",
        description: "For businesses ready to scale.",
        features: ["3 AI Voice Agents", "Unlimited Minutes", "Advanced Analytics", "CRM Integration", "Priority Support"],
        buttonText: "Get Started",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for large teams.",
        features: ["Unlimited Agents", "Custom Voice Cloning", "Dedicated Account Manager", "API Access", "SLA Guarantee"],
        buttonText: "Contact Sales",
        popular: false,
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-background">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground text-lg">Start for free, upgrade as you grow.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <Card key={index} className={`relative flex flex-col ${plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-border'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <CardHeader className="text-center pb-8 border-b border-border/50">
                                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </CardHeader>
                            <CardContent className="flex-1 pt-8 flex flex-col">
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm">
                                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                    variant={plan.popular ? 'default' : 'outline'}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

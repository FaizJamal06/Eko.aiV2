import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Stethoscope, Building2, ShoppingBag, Headset, GraduationCap, ArrowRight } from 'lucide-react';

const useCases = [
    {
        title: "Health Clinics",
        icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
        description: "Automate appointment booking, reminders, and patient inquiries without front-desk bottlenecks.",
    },
    {
        title: "Hotels & Hospitality",
        icon: <Building2 className="h-10 w-10 text-cyan-500" />,
        description: "Handle room reservations, amenity requests, and checkout queries 24/7.",
    },
    {
        title: "E-commerce",
        icon: <ShoppingBag className="h-10 w-10 text-indigo-500" />,
        description: "Provide instant order updates, processing returns, and product FAQs.",
    },
    {
        title: "Customer Support",
        icon: <Headset className="h-10 w-10 text-blue-400" />,
        description: "Scale your support team instantly. Handle thousands of concurrent calls with zero wait times.",
    },
    {
        title: "Education",
        icon: <GraduationCap className="h-10 w-10 text-teal-500" />,
        description: "Assist students with admission deadlines, course details, and scheduling counseling.",
    },
];

const UseCases = () => {
    return (
        <section id="use-cases" className="py-24 bg-secondary/20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Every Industry</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Whether you run a local clinic or a global support team, our AI scales with your needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <Card key={index} className="bg-card border-border/50 group">
                            <CardHeader>
                                <div className="mb-4 bg-background p-3 w-fit rounded-lg border border-border group-hover:border-blue-500/30 transition-colors">
                                    {useCase.icon}
                                </div>
                                <CardTitle className="text-xl">{useCase.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center text-blue-500 font-medium text-sm cursor-pointer group-hover:underline">
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCases;

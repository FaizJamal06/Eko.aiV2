import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 block">
                            EKO
                        </a>
                        <p className="text-muted-foreground max-w-xs">
                            The smartest AI voice assistant for your business. Available 24/7.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="hover:text-foreground cursor-pointer">Features</li>
                            <li className="hover:text-foreground cursor-pointer">Security</li>
                            <li className="hover:text-foreground cursor-pointer">Pricing</li>
                            <li className="hover:text-foreground cursor-pointer">Enterprise</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="hover:text-foreground cursor-pointer">About Us</li>
                            <li className="hover:text-foreground cursor-pointer">Blog</li>
                            <li className="hover:text-foreground cursor-pointer">Careers</li>
                            <li className="hover:text-foreground cursor-pointer">Contact</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} EKO.ai. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-foreground">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-foreground">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

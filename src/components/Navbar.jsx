import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Demo', href: '/#demo' },
        { name: 'Use Cases', href: '/#use-cases' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'History', href: '/history' },
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 relative">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                            EKO
                        </Link>
                    </div>
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                        <div className="flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                link.href.startsWith('/#') ? (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Start Free Trial
                        </Button>
                    </div>
                    <div className="-mr-2 flex md:hidden items-center gap-2">
                        <div className="scale-75 origin-right">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border/40"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                link.href.startsWith('/#') ? (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                            <div className="pt-4 pb-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Free Trial</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

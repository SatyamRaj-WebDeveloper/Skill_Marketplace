"use client"

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Briefcase, Users, Menu, X, Settings, PenTool, Music, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
// Main Landing Page Component (with localStorage Theme Toggle)
const SkillMarketplaceLandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Effect to set the initial theme from localStorage or default to dark
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
        } else {
            // Default to dark if no theme is saved or if it's 'dark'
            setIsDarkMode(true);
        }
    }, []);

    // Effect to apply the theme to the page and save the preference
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#how-it-works", label: "How It Works" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            <div className="bg-white dark:bg-gray-900 font-sans antialiased">
                {/* Header / Navbar */}
                <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800 sticky top-0 z-50">
                    <div className="container mx-auto px-4 lg:px-8">
                        <nav className="flex items-center justify-between h-20">
                            <a href="#" className="flex items-center space-x-2">
                                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                <span className="font-bold text-2xl text-gray-800 dark:text-white">SkillMarket</span>
                            </a>
                            
                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 font-medium">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            
                            <div className="hidden lg:flex items-center space-x-4">
                                <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                                </button>
                                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-4 py-2 rounded-md transition-colors">Log In</a>
                                <Link href="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md">
                                    Sign Up
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="lg:hidden flex items-center gap-2">
                                <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                                </button>
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </nav>
                        
                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="lg:hidden py-4 absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
                                <div className="flex flex-col space-y-2 px-4">
                                    {navLinks.map((link) => (
                                        <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 block px-4 py-3 rounded-md text-base font-medium">
                                            {link.label}
                                        </a>
                                    ))}
                                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex flex-col space-y-4">
                                         <a href="#" className="text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 block px-4 py-3 rounded-md text-base font-medium">Log In</a>
                                        <Link href="/signup" className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold text-center hover:bg-indigo-700 transition-colors duration-300">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
                    <section className="bg-slate-50 dark:bg-gray-900 relative overflow-hidden dark:[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                        <div className="container mx-auto px-4 lg:px-8 text-center py-20 lg:py-32 relative z-10">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
                                Find & Hire Local Experts <br /> For Any Job
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10">
                                Get instant access to a trusted network of skilled professionals near you. From home repairs to personal tutoring, we've got you covered.
                            </p>
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg">
                                    <div className="w-full flex items-center text-gray-500 dark:text-gray-400">
                                        <Search className="mr-3 h-5 w-5" />
                                        <input type="text" placeholder="What service do you need?" className="w-full focus:outline-none bg-transparent" />
                                    </div>
                                    <div className="w-full sm:w-px h-px sm:h-8 bg-gray-200 dark:bg-gray-600"></div>
                                    <div className="w-full flex items-center text-gray-500 dark:text-gray-400">
                                        <MapPin className="mr-3 h-5 w-5" />
                                        <input type="text" placeholder="Your Location" className="w-full focus:outline-none bg-transparent" />
                                    </div>
                                    <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md">
                                        Find Experts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section id="how-it-works" className="py-20 lg:py-24 dark:bg-gray-900">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">How It Works</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">Get your tasks done in three simple steps.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-12 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full h-20 w-20 flex items-center justify-center mb-6 ring-8 ring-indigo-50 dark:ring-indigo-900/30">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">1. Search for a Service</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Describe the service you need and specify your location to find local professionals.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full h-20 w-20 flex items-center justify-center mb-6 ring-8 ring-indigo-50 dark:ring-indigo-900/30">
                                        <Users size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">2. Choose Your Expert</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Browse profiles, read reviews, and connect with the best-fit expert for your job.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full h-20 w-20 flex items-center justify-center mb-6 ring-8 ring-indigo-50 dark:ring-indigo-900/30">
                                        <Briefcase size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">3. Get It Done</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Book your service, manage the job, and pay securely all through our platform.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Featured Services Section */}
                    <section id="features" className="bg-slate-50 dark:bg-gray-800 py-20 lg:py-24">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Featured Services</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">Explore some of the most popular services requested by our users.</p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[{icon: <Settings/>, title: "Home Repair"}, {icon: <PenTool/>, title: "Graphic Design"}, {icon: <Music/>, title: "Music Lessons"}, {icon: <Users/>, title: "Personal Trainer"}].map(service => (
                                    <div key={service.title} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="text-indigo-600 dark:text-indigo-400 mb-4">{React.cloneElement(service.icon, { size: 40 })}</div>
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Find top-rated local professionals for your needs.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section id="contact" className="bg-indigo-600">
                        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to Get Started?</h2>
                            <p className="text-lg text-indigo-200 mt-4 mb-8 max-w-xl mx-auto">Join thousands of professionals and customers on the fastest-growing skill marketplace.</p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <a href="#" className="bg-white text-indigo-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-300 w-full sm:w-auto shadow-sm hover:shadow-md">
                                    Find a Service
                                </a>
                                <a href="#" className="bg-indigo-800/80 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-indigo-800 transition-colors duration-300 w-full sm:w-auto">
                                    Become an Expert
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black text-white">
                    <div className="container mx-auto px-4 lg:px-8 py-16">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-1">
                                <h3 className="text-xl font-bold mb-4">SkillMarket</h3>
                                <p className="text-gray-400">Connecting local talent with community needs.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-gray-200">For Customers</h4>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Service</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How to Hire</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-gray-200">For Experts</h4>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Offer a Service</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Expert Hub</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                            <p>&copy; {new Date().getFullYear()} SkillMarket. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default SkillMarketplaceLandingPage;


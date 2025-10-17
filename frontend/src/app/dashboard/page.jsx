"use client";

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, LocateFixed, Home, Paintbrush, HeartPulse, Code, Crosshair, Briefcase } from 'lucide-react';
import ProviderCard from '../components/ProviderCard.jsx';
import FeaturedCarousel from '../components/FeaturedCarousel.jsx';
// --- MOCK DATA ---
// In a real app, this would come from an API call
const mockProviders = [
    { id: 1, name: 'Eleanor Pena', service: 'Plumbing', rating: 4.9, location: 'New York, NY', img: 'https://placehold.co/100x100/6366f1/ffffff?text=EP', projects: 128, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Plumbing+Project' },
    { id: 2, name: 'Cody Fisher', service: 'Electrical', rating: 4.8, location: 'Brooklyn, NY', img: 'https://placehold.co/100x100/ec4899/ffffff?text=CF', projects: 94, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Wiring+Setup' },
    { id: 3, name: 'Jenny Wilson', service: 'Design', rating: 5.0, location: 'Remote', img: 'https://placehold.co/100x100/8b5cf6/ffffff?text=JW', projects: 215, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=UI/UX+Design' },
    { id: 4, name: 'Robert Fox', service: 'Painting', rating: 4.7, location: 'Queens, NY', img: 'https://placehold.co/100x100/f59e0b/ffffff?text=RF', projects: 76, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Home+Painting' },
    { id: 5, name: 'Wade Warren', service: 'Music', rating: 4.9, location: 'Manhattan, NY', img: 'https://placehold.co/100x100/10b981/ffffff?text=WW', projects: 150, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Guitar+Lessons' },
    { id: 6, name: 'Kristin Watson', service: 'Fitness', rating: 4.8, location: 'New York, NY', img: 'https://placehold.co/100x100/3b82f6/ffffff?text=KW', projects: 188, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Personal+Training' },
];

const mockCategories = [
    { name: 'Home Services', icon: <Home size={20}/> },
    { name: 'Creative & Design', icon: <Paintbrush size={20}/> },
    { name: 'Wellness', icon: <HeartPulse size={20}/> },
    { name: 'Tech & Development', icon: <Code size={20}/> }
];


// --- MAIN DASHBOARD PAGE ---

const DashboardPage = () => {
    const [username, setUsername] = useState('Guest');
    const [activeCategory, setActiveCategory] = useState('Home Services');
    const [location, setLocation] = useState('');

    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => setLocation('Current Location Fetched'),
                () => alert("Could not get your location. Please enable location services.")
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-700">
                 <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">Skill<span className="text-indigo-400">Market</span></div>
                    <div className="hidden md:flex flex-grow max-w-2xl mx-8 bg-gray-700 rounded-lg shadow-inner">
                        <div className="relative flex-grow">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for services..."
                                className="w-full bg-transparent text-white pl-12 pr-4 py-2.5 focus:outline-none"
                            />
                        </div>
                        <div className="border-l border-gray-600 h-6 self-center"></div>
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LocateFixed className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter Location"
                                className="w-full bg-transparent text-white pl-12 pr-4 py-2.5 focus:outline-none"
                            />
                        </div>
                         <button onClick={handleUseMyLocation} className="p-2.5 text-gray-400 hover:text-indigo-400 transition-colors" title="Use my location">
                            <Crosshair size={20}/>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="hidden sm:block text-gray-300">Welcome, {username}!</span>
                        <img src="https://placehold.co/40x40/ffffff/333333?text=U" alt="User" className="rounded-full border-2 border-indigo-500/50" />
                    </div>
                </nav>
            </header>
            
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-6 py-3 flex items-center justify-center space-x-4 md:space-x-8 overflow-x-auto">
                   {mockCategories.map(category => (
                        <button 
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category.name ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                        </button>
                   ))}
                </div>
            </div>

            <main className="container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Perfect Professional</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Browse our curated list of top-rated experts ready to help you.</p>
                </div>

                <FeaturedCarousel />

                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">All Professionals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mockProviders.map(provider => (
                           <ProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="bg-gray-800 border-t border-gray-700 mt-20">
                <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SkillMarket. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="hover:text-white transition-colors">About</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
        );
};

export default DashboardPage;


"use client";

import React, { useState, useEffect } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import ProviderCard from '../components/ProviderCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { Search, MapPin, Home, Paintbrush, HeartPulse, Code, Crosshair, } from 'lucide-react';

// --- MOCK DATA ---
const mockProviders = [
    { id: 1, name: 'Eleanor Pena', service: 'Plumbing', rating: 4.9, location: 'New York, NY', img: 'https://placehold.co/100x100/6366f1/ffffff?text=EP', projects: 128, banner: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80' },
    { id: 2, name: 'Cody Fisher', service: 'Electrical', rating: 4.8, location: 'Brooklyn, NY', img: 'https://placehold.co/100x100/ec4899/ffffff?text=CF', projects: 94, banner: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 3, name: 'Jenny Wilson', service: 'Design', rating: 5.0, location: 'Remote', img: 'https://placehold.co/100x100/8b5cf6/ffffff?text=JW', projects: 215, banner: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80' },
    { id: 4, name: 'Robert Fox', service: 'Painting', rating: 4.7, location: 'Queens, NY', img: 'https://placehold.co/100x100/f59e0b/ffffff?text=RF', projects: 76, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Home+Painting' },
    { id: 5, name: 'Wade Warren', service: 'Music', rating: 4.9, location: 'Manhattan, NY', img: 'https://placehold.co/100x100/10b981/ffffff?text=WW', projects: 150, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Guitar+Lessons' },
    { id: 6, name: 'Kristin Watson', service: 'Fitness', rating: 4.8, location: 'New York, NY', img: 'https://placehold.co/100x100/3b82f6/ffffff?text=KW', projects: 188, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Personal+Training' },
    { id: 7, name: 'Jacob Jones', service: 'Web Development', rating: 4.9, location: 'Remote', img: 'https://placehold.co/100x100/f43f5e/ffffff?text=JJ', projects: 112, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=React+Code' },
    { id: 8, name: 'Guy Hawkins', service: 'Landscaping', rating: 4.8, location: 'Staten Island, NY', img: 'https://placehold.co/100x100/84cc16/ffffff?text=GH', projects: 65, banner: 'https://placehold.co/400x200/1e293b/ffffff?text=Garden+Design' },
];

const mockCategories = [
    { name: 'Home Services', icon: <Home size={20}/> },
    { name: 'Creative & Design', icon: <Paintbrush size={20}/> },
    { name: 'Wellness', icon: <HeartPulse size={20}/> },
    { name: 'Tech & Development', icon: <Code size={20}/> }
];

const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    img: 'https://placehold.co/100x100/ffffff/333333?text=JD'
};


// --- MAIN DASHBOARD PAGE ---
const DashboardPage = () => {
    const [user ,setuser] = useState(null)
    const [activeCategory, setActiveCategory] = useState('Home Services');
    const [location, setLocation] = useState('');
    const [providers, setProviders] = useState([]);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // const getCurrentUser = async () => {
    //         setIsClient(true);
    //         try {
    //             const accessToken = localStorage.getItem('accessToken');
    //             if (!accessToken) {
    //                 console.log("No access token found, redirecting to login.");
    //                 window.location.href = '/login';
    //                 return;
    //             }

    //             const res = await axios.get("http://backend:8000/api/v1/getUser", {
    //                 headers: { 'Authorization': `Bearer ${accessToken}` }
    //             });

    //             setuser(res.data.data);
    //         } catch (error) {
    //             console.log("Error fetching user, redirecting to login:", error.message);
    //             window.location.href = '/login';
    //         }
    //     };

    // useEffect(()=>{
    // getCurrentUser();
    //   },[])

    useEffect(() => {
        setProviders(mockProviders);
    }, []);

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
            <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-700">
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
                                <MapPin className="h-5 w-5 text-gray-400" />
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
                    <button onClick={() => setIsSidebarOpen(true)} className="flex items-center space-x-4 cursor-pointer group">
                        <span className="hidden sm:block text-gray-300 group-hover:text-white transition-colors">Welcome, {mockUser.name}!</span>
                        <img src={mockUser.img} alt="User" className="rounded-full h-10 w-10 border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-colors" />
                    </button>
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

                <FeaturedCarousel providers={mockProviders} />

                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">All Professionals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {providers.map(provider => (
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
            
            <UserProfileSidebar user={mockUser} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default DashboardPage;


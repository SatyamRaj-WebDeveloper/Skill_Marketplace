"use client";

import { ChevronLeft , ChevronRight } from "lucide-react";
import { useState } from "react";

const FeaturedCarousel = () => {
    const imageurl = [
        "https://plus.unsplash.com/premium_photo-1663047318813-c99a68779632?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2tpbGxlZCUyMHRyYWRlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=1200",
        "https://plus.unsplash.com/premium_photo-1681824236192-639aad242c55?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2tpbGxlZCUyMHRyYWRlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=1200",
        "https://plus.unsplash.com/premium_photo-1661371838963-60219d5bcd38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2tpbGxlZCUyMHRyYWRlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=1200"
    ];

    // Re-enabled state and functions for carousel logic
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % imageurl.length);
    const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + imageurl.length) % imageurl.length);

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/10">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {/* Loop over the imageurl array directly */}
                {imageurl.map((imgSrc, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <img src={imgSrc} alt={`Featured service ${index + 1}`} className="w-full h-80 object-cover" />
                        {/* Use generic text since provider data is not available in this component */}
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <span className="bg-indigo-500 text-white px-3 py-1 text-sm font-semibold rounded-full mb-2 inline-block">Featured Service</span>
                            <h3 className="text-4xl font-bold">High-Quality Professionals</h3>
                            <p className="text-xl text-gray-200 mt-1">Available in your area.</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition">
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition">
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default FeaturedCarousel;


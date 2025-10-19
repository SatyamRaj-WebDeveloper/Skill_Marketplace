"use client";

import React from 'react';
import { X, User, Settings, LogOut, Briefcase } from 'lucide-react';

const UserProfileSidebar = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300" 
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-gray-800 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h2 className="text-xl font-bold">My Profile</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center p-6 space-x-4">
                        <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
                        <div>
                            <p className="font-bold text-lg">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4">
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                    <User size={20} className="mr-4 text-gray-400" />
                                    <span>Account Details</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Briefcase size={20} className="mr-4 text-gray-400" />
                                    <span>My Bookings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Settings size={20} className="mr-4 text-gray-400" />
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-6 border-t border-gray-700">
                         <button className="w-full flex items-center justify-center p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-colors">
                            <LogOut size={20} className="mr-3" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileSidebar;

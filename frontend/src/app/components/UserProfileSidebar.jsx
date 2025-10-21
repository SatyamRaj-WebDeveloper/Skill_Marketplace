"use client";

import React, { useState } from 'react';
import { X, User, Settings, LogOut, Briefcase } from 'lucide-react';
import axios from 'axios';

const UserProfileSidebar = ({ user, isOpen, onClose, onUpdateRequest }) => {

    const [isRequesting, setIsRequesting] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const LogoutUser = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const res = await axios.post("http://localhost:8000/api/v1/logout/user", null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (res.status === 200) {
                localStorage.removeItem('accessToken');
                console.log("Frontend :: user logged out successfully");
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSendRequest = async () => {
        if (!message.trim()) {
            setError('Please write a short message.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                'http://localhost:8000/api/v1/request/provider',
                { message },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            setIsRequesting(false);
            setMessage('');
            
            if (onUpdateRequest) {
                onUpdateRequest(response.data.user);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Request failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderProviderSection = () => {
        const status = user?.providerStatus || 'none';

        switch (status) {
            case 'pending':
                return (
                    <div className="flex items-center p-3 rounded-lg text-gray-400 cursor-not-allowed">
                        <Settings size={20} className="mr-4" />
                        <div>
                            <p className="text-white">Request Pending</p>
                            <p className='text-sm text-gray-500'>Your request is under review.</p>
                        </div>
                    </div>
                );
            case 'approved':
                return (
                    <a href="/provider-dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <Settings size={20} className="mr-4 text-gray-400" />
                        <div>
                            <p>Provider Dashboard</p>
                            <p className='text-sm text-gray-500'>Manage your services</p>
                        </div>
                    </a>
                );
            case 'none':
            default:
                if (!isRequesting) {
                    return (
                        <button onClick={() => setIsRequesting(true)} className="w-full flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors text-left">
                            <Settings size={20} className="mr-4 text-gray-400" />
                            <div>
                                <p>Become a Provider</p>
                                <p className='text-sm text-gray-500'>Request the Admin</p>
                            </div>
                        </button>
                    );
                } else {
                    return (
                        <div className="p-3 bg-gray-900 rounded-lg">
                            <label htmlFor="provider-request-message" className="mb-2 text-sm font-medium text-gray-300">
                                Why do you want to join?
                            </label>
                            <textarea
                                id="provider-request-message"
                                value={message}
                                required
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="Write a short message to the admin..."
                                rows={3}
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            <div className="flex justify-end items-center mt-2 space-x-2">
                                <button onClick={() => setIsRequesting(false)} className="px-3 py-1 text-sm rounded-md hover:bg-gray-600 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendRequest}
                                    disabled={isLoading}
                                    className="px-3 py-1 text-sm bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Sending...' : 'Send Request'}
                                </button>
                            </div>
                        </div>
                    );
                }
        }
    };

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
                        <img src={user?.avatar || "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935"} alt={user?.username} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
                        <div>
                            <p className="font-bold text-lg">{user?.username}</p>
                            <p className="text-sm text-gray-400">{user?.email}</p>
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
                            {/* This is where the dynamic provider section is rendered */}
                            <li>
                                {renderProviderSection()}
                            </li>
                        </ul>
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-6 border-t border-gray-700">
                        <button className="w-full flex items-center justify-center p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-colors" onClick={LogoutUser}>
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


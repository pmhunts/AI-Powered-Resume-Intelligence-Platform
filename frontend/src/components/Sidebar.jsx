import React from 'react';
import { LayoutDashboard, FileText, BarChart2, Settings, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ currentView, setView }) => {
    const navItems = [
        { id: 'LANDING', label: 'Home', icon: LayoutDashboard },
        { id: 'EDITOR', label: 'Resume Editor', icon: FileText },
        { id: 'DASHBOARD', label: 'Analysis', icon: BarChart2 },
        { id: 'SETTINGS', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="w-64 h-screen bg-bg-secondary border-r border-white/5 fixed left-0 top-0 z-50 hidden md:flex flex-col"
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    ResumeAI
                </h1>
                <p className="text-xs text-text-secondary mt-1">Premium Intelligence</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${currentView === item.id
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-text-secondary hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} className={currentView === item.id ? "text-primary" : "text-text-secondary group-hover:text-white"} />
                        <span className="font-medium">{item.label}</span>
                        {currentView === item.id && (
                            <motion.div
                                layoutId="activeInd"
                                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center space-x-3 text-text-secondary hover:text-white w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    <User size={20} />
                    <span>Profile</span>
                </button>
                <button className="flex items-center space-x-3 text-red-400 hover:text-red-300 w-full px-4 py-2 mt-1 rounded-lg hover:bg-red-500/10 transition-colors">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;

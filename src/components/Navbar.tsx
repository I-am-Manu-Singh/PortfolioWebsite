
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ProfileImage from '../assets/profile.jpg';

interface NavbarProps {
    activeTab: 'work' | 'personal';
    setActiveTab: (tab: 'work' | 'personal') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-dark/80 backdrop-blur-md border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo & Name */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                        <img src={ProfileImage} alt="Manpreet Singh" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="hidden md:block text-lg font-bold text-white tracking-tight">
                        Manpreet Singh <span className="text-primary">Portfolio</span>
                    </h1>
                </div>

                {/* Center Tabs */}
                <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 text-sm">
                    <button
                        onClick={() => setActiveTab('work')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${activeTab === 'work'
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        <Briefcase size={14} />
                        <span>Work</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${activeTab === 'personal'
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        <User size={14} />
                        <span>Personal</span>
                    </button>
                </div>

                {/* Right Actions */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-white/5 text-text-muted transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;


import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
const ProfileImage = `${import.meta.env.BASE_URL}profile.jpg`;
import ContactModal from './ContactModal';

interface NavbarProps {
    activeTab?: 'work' | 'personal';
}

const Navbar: React.FC<NavbarProps> = ({ activeTab = 'work' }) => {
    const { theme, toggleTheme } = useTheme();
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
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
                            <img src={ProfileImage} alt="Manpreet Singh" className="w-full h-full object-cover object-top" />
                        </div>
                        <h1 className="hidden md:block text-lg font-bold text-text tracking-tight">
                            Manpreet Singh <span className="text-primary">{activeTab === 'personal' ? 'Personal Portfolio' : 'Work Portfolio'}</span>
                        </h1>
                    </div>



                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/40 rounded-full text-sm font-medium transition-all text-primary hover:text-primary-light backdrop-blur-sm shadow-sm"
                        >
                            <MessageCircle size={16} />
                            <span>Contact Me</span>
                        </button>

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="md:hidden p-2 rounded-full hover:bg-white/5 text-text-muted transition-colors"
                        >
                            <MessageCircle size={20} />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/5 text-text-muted transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
};

export default Navbar;

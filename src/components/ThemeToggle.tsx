
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-dark-card/80 backdrop-blur-md border border-dark shadow-lg hover:bg-dark-card transition-all text-text"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-yellow-400" />}
        </motion.button>
    );
};

export default ThemeToggle;

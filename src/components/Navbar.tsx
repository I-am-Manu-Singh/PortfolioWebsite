import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon, MessageCircle, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
const ProfileImage = `${import.meta.env.BASE_URL}profile.jpg`;
import ContactModal from "./ContactModal";

interface NavbarProps {
    activeTab?: "work" | "personal";
    onBackToWork?: () => void;
}

const NAV_LINKS = [
    { label: "Tech Stack", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Creative Bliss Labs", href: "#mobile-labs" },
    { label: "Coding Profile", href: "#coding-profile" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Insights", href: "#featured" },
    { label: "Tutorials", href: "#tech-tutorials" },
    { label: "Testimonials", href: "#testimonials" },
];

const Navbar: React.FC<NavbarProps> = ({ activeTab = "work", onBackToWork }) => {
    const { theme, toggleTheme } = useTheme();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const yOffset = -70;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 px-4 py-2.5 bg-dark/85 backdrop-blur-md border-b border-white/5 shadow-sm"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto flex items-center justify-between gap-4">
                    {/* Logo & Name */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <a href="#hero" className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-dark group-hover:border-primary transition-colors">
                                <img src={ProfileImage} alt="Manpreet Singh" className="w-full h-full object-cover object-top" />
                            </div>
                            <span className="hidden sm:inline font-bold text-sm tracking-tight text-text group-hover:text-primary transition-colors">
                                Manpreet Singh
                            </span>
                        </a>
                    </div>

                    {/* Desktop Quick Section Links */}
                    {activeTab === "work" && (
                        <div className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted hover:text-text hover:bg-dark-card transition-colors whitespace-nowrap"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {activeTab === "personal" && (
                            <button
                                onClick={onBackToWork}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs font-mono font-medium transition-all text-primary hover:text-primary-light backdrop-blur-sm border border-primary/20 cursor-pointer"
                            >
                                <ArrowLeft size={14} />
                                <span>Back to Work</span>
                            </button>
                        )}

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs font-mono font-medium transition-all text-primary hover:text-primary-light backdrop-blur-sm border border-primary/20 cursor-pointer shadow-sm"
                        >
                            <MessageCircle size={14} />
                            <span>Contact Me</span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-dark-card text-text-muted hover:text-text transition-colors border border-transparent hover:border-dark cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Mobile Menu Trigger for Section Links */}
                        {activeTab === "work" && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="xl:hidden p-2 rounded-full hover:bg-dark-card text-text-muted hover:text-text transition-colors border border-transparent hover:border-dark cursor-pointer"
                                aria-label="Toggle Navigation Menu"
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu for Navigation Links */}
                {isMobileMenuOpen && activeTab === "work" && (
                    <div className="xl:hidden border-t border-dark bg-dark-card/95 backdrop-blur-md px-4 py-3 mt-2 rounded-xl shadow-xl space-y-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                    className="px-2.5 py-2 rounded-lg text-xs font-mono text-text-muted hover:text-text hover:bg-dark transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-dark flex justify-between items-center">
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                                className="w-full text-center py-2 text-xs font-mono font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                            >
                                Contact Manpreet Singh
                            </button>
                        </div>
                    </div>
                )}
            </motion.nav>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
};

export default Navbar;

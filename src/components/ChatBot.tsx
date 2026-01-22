
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { resumeData } from '../data/resume';

interface Message {
    id: string;
    type: 'user' | 'bot';
    text: string;
    isTyping?: boolean;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: "Hi! I'm Manpreet's digital assistant. Ask me anything about his skills, projects, or experience!" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const generateResponse = async (query: string) => {
        setIsTyping(true);

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1000));

        const q = query.toLowerCase();
        let response = "I'm not sure about that. Try asking about my skills, projects, or contact info!";

        if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
            response = `Manpreet is proficient in ${resumeData.skills.languages.slice(0, 3).join(', ')}, ${resumeData.skills.android.slice(0, 2).join(', ')}, and ${resumeData.skills.reactNative[0]}. He also knows ${resumeData.skills.backendAndTools.join(', ')}.`;
        } else if (q.includes('project') || q.includes('work') || q.includes('build')) {
            const projects = resumeData.projects.map(p => p.name).join(', ');
            response = `He has built several impressive projects including ${projects}. Check out the Projects section for details!`;
        } else if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
            response = `You can reach him at ${resumeData.basics.email} or connect on LinkedIn: ${resumeData.basics.profiles[0].url}`;
        } else if (q.includes('experience') || q.includes('job')) {
            response = `He is currently at ${resumeData.experience[0].company} as a ${resumeData.experience[0].position}. Previously he interned at ${resumeData.experience[1].company}.`;
        } else if (q.includes('hello') || q.includes('hi')) {
            response = "Hello! tailored to help you know more about Manpreet. What would you like to know?";
        } else if (q.includes('music') || q.includes('hobby')) {
            response = "Manpreet loves music! He plays guitar and piano. Check out his Interests section.";
        }

        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'bot', text: response }]);
        setIsTyping(false);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        generateResponse(inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary-light transition-all ${isOpen ? 'hidden' : 'block'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-48px)] h-[500px] z-50 glass-card flex flex-col overflow-hidden border border-white/10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/20 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Assistant</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-white/50" />
                                        <span className="text-xs text-white/50">Assistant is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask skills, projects..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-primary rounded-lg text-white hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;

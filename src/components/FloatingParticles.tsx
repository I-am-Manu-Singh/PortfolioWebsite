
import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 15 + 8,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-primary/30 rounded-full blur-xl"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;

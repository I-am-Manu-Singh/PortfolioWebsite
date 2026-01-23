
import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
    // Large gradient blobs for 'lava lamp' effect
    const blobs = [
        { id: 1, color: "bg-primary/20", size: "w-[500px] h-[500px]", initial: { x: "-20%", y: "-20%" }, animate: { x: ["-20%", "20%", "-20%"], y: ["-20%", "10%", "-20%"], scale: [1, 1.2, 1] } },
        { id: 2, color: "bg-secondary/10", size: "w-[400px] h-[400px]", initial: { x: "80%", y: "50%" }, animate: { x: ["80%", "60%", "80%"], y: ["50%", "20%", "50%"], scale: [1, 1.3, 1] } },
        { id: 3, color: "bg-purple-500/10", size: "w-[600px] h-[600px]", initial: { x: "20%", y: "80%" }, animate: { x: ["20%", "50%", "20%"], y: ["80%", "60%", "80%"], scale: [1, 1.1, 1] } },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden blur-3xl opacity-60">
            {blobs.map((blob) => (
                <motion.div
                    key={blob.id}
                    className={`absolute rounded-full mix-blend-screen ${blob.color} ${blob.size}`}
                    initial={blob.initial}
                    animate={blob.animate}
                    transition={{
                        duration: 15 + blob.id * 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;

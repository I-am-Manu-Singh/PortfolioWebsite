import React from 'react';
import { motion } from 'framer-motion';

const IndiaMap: React.FC<{ activeCity?: string }> = ({ activeCity }) => {
    // City coordinates (Simplified for SVG scaling)
    const cities = [
        { name: 'New Delhi', x: 145, y: 130 },
        { name: 'Mumbai', x: 80, y: 310 },
        { name: 'Bengaluru', x: 135, y: 440 },
        { name: 'Chennai', x: 175, y: 445 },
        { name: 'Kolkata', x: 300, y: 245 },
        { name: 'Hyderabad', x: 160, y: 345 },
        { name: 'Pune', x: 95, y: 325 },
        { name: 'Ahmedabad', x: 75, y: 225 },
        { name: 'Jaipur', x: 115, y: 175 },
        { name: 'Lucknow', x: 185, y: 175 },
    ];

    // SVG ViewBox: 0 0 400 550 roughly fits India's shape
    return (
        <div className="relative w-full max-w-lg mx-auto aspect-[4/5.5]">
            <svg
                viewBox="0 0 400 550"
                className="w-full h-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Simplified India Path - Robust representation */}
                <motion.path
                    d="M136 41C136 41 123 35 117 44C111 53 113 63 103 67C93 71 81 60 72 65C63 70 59 86 51 94C43 102 30 102 23 115C16 128 17 141 19 157C21 173 17 184 23 194C29 204 42 201 49 212C56 223 54 237 54 251C54 265 47 274 42 287C37 300 37 319 46 329C55 339 74 332 83 344C92 356 86 373 95 385C104 397 122 391 131 404C140 417 131 437 133 454C135 471 146 484 151 501C156 518 152 538 163 544C174 550 183 531 197 531C211 531 228 546 237 537C246 528 238 512 240 496C242 480 252 470 249 455C246 440 231 437 225 423C219 409 223 392 231 382C239 372 254 374 264 365C274 356 277 337 289 332C301 327 325 334 332 323C339 312 331 292 338 281C345 270 367 270 376 259C385 248 387 228 393 216C399 204 416 195 410 185C404 175 383 182 375 168C367 154 373 133 361 126C349 119 332 124 321 114C310 104 316 87 304 79C292 71 270 78 261 70C252 62 251 45 237 42C223 39 215 54 201 55C187 56 173 50 162 43C151 36 136 41 136 41Z"
                    fill="url(#indiagradient)"
                    stroke="rgba(0, 255, 0, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                <defs>
                    <linearGradient id="indiagradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.05)" />
                        <stop offset="50%" stopColor="rgba(34, 197, 94, 0.1)" />
                        <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
                    </linearGradient>
                </defs>

                {/* City Markers */}
                {cities.map((city) => {
                    const isActive = city.name === activeCity;
                    return (
                        <g key={city.name}>
                            <motion.circle
                                cx={city.x}
                                cy={city.y}
                                r={isActive ? 6 : 3}
                                className={isActive ? "fill-green-500" : "fill-green-500/40"}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + Math.random() * 1 }}
                            />
                            {isActive && (
                                <circle
                                    cx={city.x}
                                    cy={city.y}
                                    r="15"
                                    className="stroke-green-500/50 fill-transparent stroke-1 animate-ping"
                                />
                            )}
                            <motion.text
                                x={city.x + 8}
                                y={city.y + 4}
                                className={`text-[8px] font-mono ${isActive ? "fill-white font-bold" : "fill-white/40"}`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.5 }}
                            >
                                {city.name}
                            </motion.text>
                        </g>
                    );
                })}
            </svg>

            {/* Live Indicator Overlay */}
            <div className="absolute top-0 right-0 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-green-500 font-mono uppercase tracking-widest">Live Traffic Flow</span>
            </div>
        </div>
    );
};

export default IndiaMap;

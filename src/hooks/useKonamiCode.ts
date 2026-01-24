import { useEffect, useState } from 'react';

export const useKonamiCode = (callback: () => void) => {
    const [, setInput] = useState('');
    const sequence = 'dev';

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const char = e.key.toLowerCase();
            setInput(prev => {
                const next = prev + char;
                if (next === sequence) {
                    callback();
                    return '';
                }
                // Partial match check
                if (sequence.startsWith(next)) {
                    return next;
                }
                // Reset if typo, but check if last char starts new sequence
                return char === 'd' ? 'd' : '';
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callback]);
};

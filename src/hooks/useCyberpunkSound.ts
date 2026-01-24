import { useRef, useEffect, useCallback } from 'react';

export const useCyberpunkSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction (browser policy)
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('touchstart', initAudio, { once: true });

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playCharge = useCallback((progress: number) => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        // Create oscillator if not exists
        if (!oscillatorRef.current) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            // Start low pitch
            osc.frequency.setValueAtTime(100, ctx.currentTime);

            // Filter for "muffled" to "bright" effect
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, ctx.currentTime);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();

            oscillatorRef.current = osc;
            gainNodeRef.current = gain;
            (osc as any).filterNode = filter; // Attach for reference
        }

        // Modulate based on progress (0-100)
        if (oscillatorRef.current && gainNodeRef.current) {
            const osc = oscillatorRef.current;
            const filter = (osc as any).filterNode as BiquadFilterNode;

            // Pitch rises from 100Hz to 800Hz
            const targetFreq = 100 + (progress * 7);
            // Filter opens up
            const targetFilter = 200 + (progress * 50);

            osc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
            filter.frequency.setTargetAtTime(targetFilter, ctx.currentTime, 0.1);

            // Volume tremolo
            gainNodeRef.current.gain.setTargetAtTime(0.3, ctx.currentTime, 0.1);
        }
    }, []);

    const stopCharge = useCallback(() => {
        if (oscillatorRef.current) {
            // Fade out
            const ctx = audioContextRef.current!;
            gainNodeRef.current?.gain.setTargetAtTime(0, ctx.currentTime, 0.1);

            setTimeout(() => {
                oscillatorRef.current?.stop();
                oscillatorRef.current = null;
            }, 150);
        }
    }, []);

    const playUnlock = useCallback(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        // "Power Up" sound: Rapid arpeggio
        const now = ctx.currentTime;
        [440, 554, 659, 880].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.1, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.3);
        });

        stopCharge(); // Ensure charge sound kills
    }, [stopCharge]);

    const playScatter = useCallback(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        // "Glitch" noise
        const bufferSize = ctx.sampleRate * 0.2; // 200ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
    }, []);

    return { playCharge, stopCharge, playUnlock, playScatter };
};

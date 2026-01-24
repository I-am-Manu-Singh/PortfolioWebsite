import { useRef, useEffect, useCallback } from 'react';

export const useCyberpunkSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const scatterBufferRef = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        // Initialize AudioContext on any early interaction to ensure it's "ready"
        const initAudio = () => {
            if (!audioContextRef.current) {
                const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
                audioContextRef.current = new Ctx();

                // Pre-create the noise buffer once the context exists
                const bufferSize = audioContextRef.current.sampleRate * 0.2;
                const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
                scatterBufferRef.current = buffer;
            }
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
        };

        // Listen for ANY interaction to pre-warm
        const interactions = ['click', 'touchstart', 'mousedown', 'keydown'];
        interactions.forEach(event => window.addEventListener(event, initAudio, { once: true }));

        return () => {
            if (audioContextRef.current) audioContextRef.current.close();
            interactions.forEach(event => window.removeEventListener(event, initAudio));
        };
    }, []);

    const playCharge = useCallback((progress: number) => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        if (!oscillatorRef.current) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, ctx.currentTime);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start();

            oscillatorRef.current = osc;
            gainNodeRef.current = gain;
            (osc as any).filterNode = filter;
        }

        if (oscillatorRef.current && gainNodeRef.current) {
            const osc = oscillatorRef.current;
            const filter = (osc as any).filterNode as BiquadFilterNode;
            const targetFreq = 100 + (progress * 7);
            const targetFilter = 200 + (progress * 50);

            osc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.05);
            filter.frequency.setTargetAtTime(targetFilter, ctx.currentTime, 0.05);
            gainNodeRef.current.gain.setTargetAtTime(0.2, ctx.currentTime, 0.05);
        }
    }, []);

    const stopCharge = useCallback(() => {
        if (oscillatorRef.current && audioContextRef.current) {
            const ctx = audioContextRef.current;
            gainNodeRef.current?.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
            setTimeout(() => {
                oscillatorRef.current?.stop();
                oscillatorRef.current = null;
            }, 100);
        }
    }, []);

    const playUnlock = useCallback(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

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
        stopCharge();
    }, [stopCharge]);

    const playScatter = useCallback(() => {
        if (!audioContextRef.current || !scatterBufferRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const noise = ctx.createBufferSource();
        noise.buffer = scatterBufferRef.current;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
    }, []);

    return { playCharge, stopCharge, playUnlock, playScatter };
};

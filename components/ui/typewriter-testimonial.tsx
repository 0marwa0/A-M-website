'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Meteors } from '@/components/ui/meteors';

type Testimonial = {
    image?: string;
    icon?: React.ReactNode;
    audio: string;
    text: string;
    name: string;
    jobtitle: string;
};

type ComponentProps = {
    testimonials: Testimonial[];
};

export const Component: React.FC<ComponentProps> = ({ testimonials }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
    const [typedText, setTypedText] = useState('');
    const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTextRef = useRef('');

    const stopAudio = useCallback(() => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
            audioPlayerRef.current.src = '';
            audioPlayerRef.current.load();
            audioPlayerRef.current = null;
        }
    }, []);

    const startTypewriter = useCallback((text: string) => {
        if (typewriterTimeoutRef.current) {
            clearTimeout(typewriterTimeoutRef.current);
        }
        setTypedText('');
        currentTextRef.current = text;

        let i = 0;
        const type = () => {
            if (i <= text.length) {
                setTypedText(text.slice(0, i));
                i++;
                typewriterTimeoutRef.current = setTimeout(type, 40);
            }
        };
        type();
    }, []);

    const stopTypewriter = useCallback(() => {
        if (typewriterTimeoutRef.current) {
            clearTimeout(typewriterTimeoutRef.current);
            typewriterTimeoutRef.current = null;
        }
        setTypedText('');
        currentTextRef.current = '';
    }, []);

    const handleMouseEnter = useCallback((index: number) => {
        stopAudio();
        setHoveredIndex(index);

        if (testimonials[index].audio) {
            const newAudio = new Audio(`/audio/${testimonials[index].audio}`);
            audioPlayerRef.current = newAudio;
            newAudio.play().catch(e => {
                console.warn("Audio playback prevented or failed:", e);
            });
        }

        setHasBeenHovered(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
        startTypewriter(testimonials[index].text);
    }, [testimonials, stopAudio, startTypewriter]);

    const handleMouseLeave = useCallback(() => {
        stopAudio();
        setHoveredIndex(null);
        stopTypewriter();
    }, [stopAudio, stopTypewriter]);

    useEffect(() => {
        return () => {
            stopAudio();
            stopTypewriter();
        };
    }, [stopAudio, stopTypewriter]);

    return (
        <div className="flex justify-center items-center gap-0 flex-wrap">
            {testimonials.map((testimonial, index) => (
                <React.Fragment key={index}>
                    {/* Step node */}
                    <motion.div
                        className="relative flex flex-col items-center cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Circle icon */}
                        {testimonial.icon ? (
                            <motion.div
                                className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden border-2"
                                animate={{
                                    borderColor: (hoveredIndex === index || hasBeenHovered[index])
                                        ? '#ACA0FB'
                                        : 'rgba(255,255,255,0.08)',
                                    boxShadow: (hoveredIndex === index)
                                        ? '0 0 32px rgba(172,160,251,0.55)'
                                        : (hasBeenHovered[index]
                                            ? '0 0 16px rgba(172,160,251,0.2)'
                                            : '0 0 0px transparent'),
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {testimonial.icon}
                            </motion.div>
                        ) : (
                            <motion.img
                                src={testimonial.image}
                                alt={`Step ${index + 1}`}
                                className="w-28 h-28 rounded-full border-2"
                                animate={{
                                    borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#ACA0FB' : '#E5E7EB'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        {/* Step title label */}
                        <span className="mt-3 text-sm font-semibold tracking-wide text-white/70">
                            {testimonial.name}
                        </span>

                        {/* ── Meteor card popup ── */}
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, y: 10 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="absolute z-50 w-64"
                                    style={{ bottom: 'calc(100% + 20px)' }}
                                >
                                    {/* Outer glow layer — matches step color */}
                                    <div
                                        className="absolute inset-0 rounded-2xl blur-2xl opacity-60"
                                        style={{
                                            background: `linear-gradient(135deg, ${getStepColor(index)}88, #4EF0FF44)`,
                                            transform: 'scale(0.92)',
                                        }}
                                    />

                                    {/* Card */}
                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950/90 px-5 py-5 shadow-2xl backdrop-blur-sm flex flex-col">

                                        {/* Step icon badge */}
                                        <div
                                            className="h-7 w-7 rounded-full border border-white/20 flex items-center justify-center mb-3"
                                            style={{ background: `${getStepColor(index)}22` }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5" style={{ color: getStepColor(index) }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                                            </svg>
                                        </div>

                                        {/* Step title */}
                                        <h3
                                            className="font-bold text-base mb-2 relative z-10"
                                            style={{ color: getStepColor(index) }}
                                        >
                                            {testimonial.name}
                                        </h3>

                                        {/* Typewriter body */}
                                        <p className="text-sm text-slate-400 mb-3 relative z-10 min-h-[72px] leading-relaxed">
                                            {typedText}
                                            <span className="animate-blink text-slate-500">|</span>
                                        </p>

                                        {/* Footer label */}
                                        <p className="text-xs text-slate-500 relative z-10 border-t border-white/5 pt-2 mt-auto">
                                            {testimonial.jobtitle}
                                        </p>

                                        {/* Meteors */}
                                        <Meteors number={14} />
                                    </div>

                                    {/* Tail bubbles */}
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex flex-col items-center gap-[3px]">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-900/80 shadow-md border border-white/10" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900/70 shadow-md border border-white/10" />
                                        <div className="w-1 h-1 rounded-full bg-gray-900/60 shadow-md" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Arrow connector between steps */}
                    {index < testimonials.length - 1 && (
                        <div className="flex items-center px-1 pb-8">
                            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="opacity-50">
                                <defs>
                                    <linearGradient id={`arrowGrad${index}`} x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor={getStepColor(index)} />
                                        <stop offset="100%" stopColor={getStepColor(index + 1)} />
                                    </linearGradient>
                                </defs>
                                <line
                                    x1="0" y1="10" x2="30" y2="10"
                                    stroke={`url(#arrowGrad${index})`}
                                    strokeWidth="2"
                                    strokeDasharray="4 3"
                                />
                                <polygon
                                    points="28,5 40,10 28,15"
                                    fill={getStepColor(index + 1)}
                                />
                            </svg>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// Returns the color per step index to match the original process diagram palette
function getStepColor(index: number): string {
    const colors = ['#7B4CFF', '#8B56FF', '#5861F2', '#5BA8F7', '#4ECFFC', '#4EF0FF'];
    return colors[Math.min(index, colors.length - 1)];
}

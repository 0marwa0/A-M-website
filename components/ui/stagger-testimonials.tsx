"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const SQRT_5000 = Math.sqrt(5000);
const INTERVAL_MS = 3500;

export type ServiceItem = {
    title: string;
    description: string;
    features: string[];
    accentColor: string;
    accentColor2: string;
    // tempId kept for API compatibility even though we no longer use it internally
    tempId?: number | string;
};

// ─── Card component ──────────────────────────────────────────────────────────

interface ServiceCardProps {
    service: ServiceItem;
    /** signed offset from center: 0 = active, -1 = one to the left, etc. */
    offset: number;
    total: number;
    cardSize: number;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, offset, total, cardSize, onClick }) => {
    const isCenter = offset === 0;
    const dist = Math.abs(offset);
    const zIdx = isCenter ? 20 : Math.max(0, (total - dist) * 2);

    return (
        <div
            onClick={() => { if (!isCenter) onClick(); }}
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cardSize,
                height: cardSize,
                cursor: isCenter ? 'default' : 'pointer',
                border: `2px solid ${isCenter ? service.accentColor : 'rgba(88,97,242,0.2)'}`,
                padding: '2rem',
                transition: 'all 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isCenter
                    ? 'linear-gradient(135deg, rgba(123,76,255,0.28) 0%, rgba(78,240,255,0.18) 100%)'
                    : 'rgba(14, 17, 38, 0.80)',
                backdropFilter: 'blur(20px)',
                boxShadow: isCenter
                    ? `0px 8px 0px 4px rgba(88,97,242,0.30), 0 0 50px ${service.accentColor}44`
                    : '0px 0px 0px 0px transparent',
                clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
                transform: `
                    translate(-50%, -50%)
                    translateX(${(cardSize / 1.5) * offset}px)
                    translateY(${isCenter ? -65 : offset % 2 ? 15 : -15}px)
                    rotate(${isCenter ? 0 : offset % 2 ? 2.5 : -2.5}deg)
                    scale(${isCenter ? 1 : Math.max(0.72, 1 - dist * 0.08)})
                `,
                zIndex: zIdx,
                opacity: dist > 2 ? 0.4 : dist === 2 ? 0.65 : 1,
            }}
        >
            {/* Corner accent line */}
            <span style={{
                position: 'absolute', display: 'block',
                right: -2, top: 48,
                width: SQRT_5000, height: 2,
                transformOrigin: 'top right', transform: 'rotate(45deg)',
                background: isCenter ? service.accentColor : 'rgba(88,97,242,0.25)',
                transition: 'background 0.65s ease',
            }} />

            {/* Badge */}
            <div style={{
                marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: '50%',
                fontSize: '0.85rem', fontWeight: 700,
                background: `linear-gradient(135deg, ${service.accentColor}33, ${service.accentColor2}22)`,
                border: `1.5px solid ${service.accentColor}66`,
                color: service.accentColor, transition: 'all 0.65s ease',
            }}>
                ✦
            </div>

            {/* Title */}
            <h3 style={{
                marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 700, lineHeight: 1.3,
                background: `linear-gradient(90deg, ${service.accentColor}, ${service.accentColor2})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
                {service.title}
            </h3>

            {/* Description */}
            <p style={{
                fontSize: '0.8rem', color: 'rgba(156,163,175,1)', marginBottom: '1rem', lineHeight: 1.6,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
                {service.description}
            </p>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'rgba(209,213,219,1)' }}>
                        <Check style={{ width: 12, height: 12, flexShrink: 0, color: service.accentColor2 }} />
                        {f}
                    </li>
                ))}
            </ul>

            {!isCenter && (
                <div style={{
                    position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
                    fontSize: '0.65rem', color: 'rgba(172,160,251,0.5)',
                    textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                    click to focus
                </div>
            )}
        </div>
    );
};

// ─── Main carousel ────────────────────────────────────────────────────────────

interface StaggerServicesProps {
    services: ServiceItem[];
}

export const StaggerTestimonials: React.FC<StaggerServicesProps> = ({ services }) => {
    const total = services.length;

    // Index of the card currently in the center spotlight
    const [activeIndex, setActiveIndex] = useState(0);

    const [cardSize, setCardSize] = useState(365);

    // Refs so the interval callback always sees fresh values without re-creating
    const activeIndexRef = useRef(activeIndex);
    activeIndexRef.current = activeIndex;

    const isPausedRef = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Progress bar refs
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const startTimeRef = useRef(Date.now());
    const rafRef = useRef<number | null>(null);

    // ── Navigation helpers ───────────────────────────────────────────────────
    const advance = useCallback((delta: number) => {
        setActiveIndex(prev => {
            const next = ((prev + delta) % total + total) % total;
            return next;
        });
        startTimeRef.current = Date.now();
    }, [total]);

    // ── Progress bar RAF ─────────────────────────────────────────────────────
    useEffect(() => {
        const tick = () => {
            if (progressBarRef.current) {
                const elapsed = Date.now() - startTimeRef.current;
                const pct = Math.min((elapsed / INTERVAL_MS) * 100, 100);
                progressBarRef.current.style.width = `${pct}%`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // ── Auto-advance interval ────────────────────────────────────────────────
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (!isPausedRef.current) {
                setActiveIndex(prev => (prev + 1) % total);
                startTimeRef.current = Date.now();
            }
        }, INTERVAL_MS);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [total]); // only re-run if `total` changes

    // ── Responsive card size ─────────────────────────────────────────────────
    useEffect(() => {
        const updateSize = () => {
            setCardSize(window.matchMedia('(min-width: 640px)').matches ? 365 : 290);
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // ── Compute signed offset of each card from center ───────────────────────
    //
    // With N cards and activeIndex = A, card at original index I has offset:
    //   raw = I - A  (mod N), then shift so it's in the range [-(N/2), N/2]
    //
    const cards = services.map((service, i) => {
        let offset = (i - activeIndex + total) % total;
        // Wrap to range [-floor(N/2), ceil(N/2)]
        if (offset > Math.floor(total / 2)) offset -= total;
        return { service, offset, origIdx: i };
    });

    return (
        <div
            style={{ position: 'relative', width: '100%', height: 620, overflow: 'hidden' }}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => {
                isPausedRef.current = false;
                startTimeRef.current = Date.now();
            }}
        >
            {/* Background glow */}
            <div style={{
                pointerEvents: 'none', position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(88,97,242,0.08) 0%, transparent 80%)',
            }} />

            {/* Cards */}
            {cards.map(({ service, offset, origIdx }) => (
                <ServiceCard
                    key={origIdx}
                    service={service}
                    offset={offset}
                    total={total}
                    cardSize={cardSize}
                    onClick={() => advance(offset)}
                />
            ))}

            {/* Bottom bar: prev · dots · next */}
            <div style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', alignItems: 'center', gap: 14,
            }}>
                {/* Prev */}
                <NavButton direction="prev" onClick={() => advance(-1)} />

                {/* Dot indicators */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    {services.map((_, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={i}
                                onClick={() => advance(((i - activeIndex) % total + total) % total <= total / 2
                                    ? (i - activeIndex + total) % total
                                    : -((activeIndex - i + total) % total)
                                )}
                                aria-label={`Go to service ${i + 1}`}
                                style={{
                                    position: 'relative',
                                    width: isActive ? 32 : 8, height: 8,
                                    borderRadius: 4, border: 'none', padding: 0,
                                    cursor: 'pointer', overflow: 'hidden',
                                    background: isActive ? 'rgba(123,76,255,0.25)' : 'rgba(88,97,242,0.28)',
                                    boxShadow: isActive ? '0 0 10px rgba(123,76,255,0.5)' : 'none',
                                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                }}
                            >
                                {isActive && (
                                    <div
                                        ref={progressBarRef}
                                        style={{
                                            position: 'absolute', inset: 0, width: '0%',
                                            borderRadius: 4,
                                            background: 'linear-gradient(90deg, #7B4CFF, #4EF0FF)',
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Next */}
                <NavButton direction="next" onClick={() => advance(1)} />
            </div>
        </div>
    );
};

// ─── Shared nav button ────────────────────────────────────────────────────────

const NavButton: React.FC<{ direction: 'prev' | 'next'; onClick: () => void }> = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        aria-label={direction === 'prev' ? 'Previous service' : 'Next service'}
        style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, borderRadius: 8,
            border: '2px solid rgba(88,97,242,0.35)',
            background: 'rgba(16,19,42,0.85)',
            color: '#ACA0FB', cursor: 'pointer',
            transition: 'all 0.2s ease', flexShrink: 0,
        }}
        onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(88,97,242,0.3)';
            (e.currentTarget as HTMLElement).style.borderColor = '#7B4CFF';
        }}
        onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(16,19,42,0.85)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88,97,242,0.35)';
        }}
    >
        {direction === 'prev'
            ? <ChevronLeft style={{ width: 18, height: 18 }} />
            : <ChevronRight style={{ width: 18, height: 18 }} />
        }
    </button>
);

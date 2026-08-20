"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { SECTIONS } from '@/lib/data';
// Imports handled dynamically below
import EmailForm from '@/components/EmailForm';
import { useAppStore } from '@/lib/store';

const RetroErrorCards = dynamic(() => import('@/components/RetroErrorCards'), {
    loading: () => <div className="w-full h-full bg-transparent" />
});
const ProductDeck = dynamic(() => import('@/components/ProductDeck'), {
    loading: () => <div className="w-full h-[600px] bg-neutral-900/50 rounded-xl animate-pulse" />
});
const VideoEmbed = dynamic(() => import('@/components/VideoEmbed'), {
    loading: () => <div className="w-full aspect-video bg-neutral-900/50 rounded-xl animate-pulse" />
});
const ReleaseOverlay = dynamic(() => import('@/components/ReleaseOverlay'), {
    loading: () => null
});

export default function ContentPanel() {
    const activeIndex = useAppStore((state) => state.activeIndex);
    // setActiveIndex removed as it's unused (state accessed directly via useAppStore.getState())
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            // Shrink the observation window to a thin line in the middle of the viewport
            // This forces non-overlapping, exclusive triggers
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0 // Trigger as soon as 1 pixel crosses this center line
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-index'));
                    if (!isNaN(index) && index !== useAppStore.getState().activeIndex) {
                        useAppStore.getState().setActiveIndex(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (index: number) => {
        const targetIndex = (index + SECTIONS.length) % SECTIONS.length;
        sectionRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth' });
        // NOTE: We don't manually set index here, we let the observer catch it
        // However, setting it might make the UI update faster before the scroll finishes
        // But to avoid race conditions with the observer finding "intermediate" sections, stick to observer.
    };

    return (
        <div className="w-full min-h-full">
            {/* Scrollable Content Container */}
            <div className="flex flex-col w-full min-h-full">
                {SECTIONS.map((section, idx) => {
                    const isTopology = section.id === 'topology';
                    const isProduct = section.id === 'product'; // Replaces old 'usecase' (Index 2) - Shows Deck
                    const isOverview = section.id === 'overview';
                    const isUsecase = section.id === 'usecase'; // Replaces old 'materials' (Index 3) - Shows Video

                    return (
                        <div
                            key={section.id}
                            ref={(el) => { sectionRefs.current[idx] = el; }}
                            data-index={idx}
                            className={`w-full min-h-[100dvh] flex flex-col justify-center md:snap-start relative ${isUsecase ? 'px-4 md:pl-12 md:pr-24' : 'px-4 md:pl-12 md:pr-24'} pointer-events-none`}
                        >
                            {/* Content Wrapper */}
                            {section.title ? (
                                <div className={`transition-opacity duration-300 w-full ${(isTopology || isUsecase) ? 'flex flex-col md:flex-row items-center justify-between gap-32 md:gap-12' : ''}`}>

                                    {/* Retro Error Cards (Left side for Topology section) */}
                                    {isTopology && (
                                        <div className="w-full md:w-1/2 pointer-events-auto order-1 md:order-1 pt-20 md:pt-0">
                                            <RetroErrorCards />
                                        </div>
                                    )}

                                    {/* Video Embed (Right side for Usecase/Video section) */}
                                    {isUsecase && (
                                        <div className="w-full md:w-1/2 pointer-events-auto order-1 md:order-2 pt-12 md:pt-0">
                                            <VideoEmbed />
                                        </div>
                                    )}

                                    {/* Background Image for Product/Deck section ONLY */}
                                    {isProduct && (
                                        <div className="absolute inset-0 z-0 opacity-40">
                                            <Image
                                                src="/usecasebg.jpg"
                                                alt="Background"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                                        </div>
                                    )}

                                    {/* Product Panel (Deck) - Full Width (Product section - index 2) */}
                                    {isProduct ? (
                                        <>
                                            {/* Product Panel (Deck) - Full Width Container (Handles its own split layout) */}
                                            <div className="w-full flex-1 pointer-events-auto relative z-10 flex items-center justify-center">
                                                <ProductDeck />
                                            </div>
                                        </>
                                    ) : (
                                        <div className={`mix-blend-difference text-white pointer-events-auto ${isTopology ? 'md:w-1/2 w-full order-2 md:order-2 text-right' : 'md:w-1/2 w-full order-2 md:order-1'} ${isOverview ? 'translate-y-2' : ''} ${isProduct ? 'relative z-10' : ''}`}>
                                            {/* Header Meta */}
                                            <div className={`mb-4 md:mb-8 flex items-center gap-4 font-mono text-xs tracking-widest text-blue-400 ${isTopology ? 'justify-end' : ''}`}>
                                                <span>{section.number}</span>
                                                <div className="w-8 h-[1px] bg-white/50"></div>
                                                <span>{section.label}</span>
                                            </div>

                                            {/* Main Title */}
                                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.9] tracking-tighter mb-4 md:mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                                                {section.title}
                                            </h1>

                                            {/* Email Form for Hero Section */}
                                            {isOverview && (
                                                <div className="mb-8 md:mb-12">
                                                    <EmailForm />
                                                </div>
                                            )}

                                            {/* Description */}
                                            <div className={`${isTopology ? 'max-w-md md:max-w-lg ml-auto' : 'max-w-sm md:max-w-md'} mb-8 md:mb-12`}>
                                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                                    {isTopology && <span className="text-3xl md:text-4xl text-zinc-500 mr-2 align-middle leading-none">“</span>}
                                                    {section.description}
                                                    {isTopology && <span className="text-3xl md:text-4xl text-zinc-500 ml-2 align-middle leading-none">”</span>}
                                                </p>
                                                {isTopology && (
                                                    <a
                                                        href="https://a16z.com/unbundling-the-game-engine/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 mt-4 font-bold tracking-wide transition-opacity hover:opacity-80"
                                                        style={{ color: '#deff9a' }}
                                                    >
                                                        a16z Article
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : section.id === 'deployment' ? (
                                <div className="w-full h-full flex items-center justify-center relative z-50 pointer-events-auto">
                                    <ReleaseOverlay />
                                </div>
                            ) : (
                                <div className="w-full h-full"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer Nav Controls (Fixed) */}
            <div className="fixed inset-x-0 bottom-8 md:bottom-12 z-50 pointer-events-none px-6 md:px-24">
                {/* Centered Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 md:bottom-0 flex flex-col items-center gap-2 pointer-events-auto">
                    <button
                        onClick={() => scrollToSection(activeIndex + 1)}
                        className="group relative p-2.5 md:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        {/* Liquid Metal Effect Background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-300 via-white to-zinc-400 opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/50 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300"></div>
                        <div className="absolute inset-[2px] rounded-full bg-gradient-to-tl from-zinc-200 via-zinc-100 to-white opacity-80 backdrop-blur-sm"></div>

                        {/* Icon */}
                        <div className="relative z-10 text-black/80 drop-shadow-sm">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="md:w-6 md:h-6 transform group-hover:translate-y-0.5 transition-transform duration-300"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Progress Indicators (Pills) - Left Aligned */}
                <div className="absolute left-6 md:left-12 bottom-3 flex gap-4 md:gap-6 flex-wrap md:flex-nowrap items-center pointer-events-auto mix-blend-difference">
                    {SECTIONS.map((section, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(idx)}
                            style={{ '--hover-color': section.color } as React.CSSProperties}
                            className={`text-sm md:text-base font-bold tracking-tight transition-all duration-300 font-sans hover:text-[var(--hover-color)] ${idx === activeIndex ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-100 text-white'}`}
                        >
                            <span style={{ color: idx === activeIndex ? section.color : undefined }}>
                                {section.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div >
    );
}

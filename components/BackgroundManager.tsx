"use client";

import React, { lazy, Suspense } from 'react';
import { useAppStore } from '@/lib/store';
import VideoBackground from '@/components/VideoBackground';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy components
// Lazy load heavy components
const ReleaseScene = lazy(() => import('@/components/ReleaseScene'));

// Import the Hero video explicitly
import { SECTIONS } from '@/lib/data';

export default function BackgroundManager() {
    const activeIndex = useAppStore((state) => state.activeIndex);

    // Video loaded state for Hero
    const setVideoLoaded = useAppStore((state) => state.setHeroVideoReady);

    // Helper to determine visibility classes
    // We want the component to be fully visible when activeIndex matches
    // Otherwise hidden and ignoring pointer events
    const getVisibilityClass = (sectionIndex: number) => {
        return activeIndex === sectionIndex
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none';
    };

    return (
        <>
            {/* Section 0 (Hero) - Video Background */}
            {/* Persist the video for Section 0 so it doesn't unmount/remount */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${getVisibilityClass(0)}`}>
                <VideoBackground onLoaded={setVideoLoaded} src={SECTIONS[0].video} playbackRate={1.5} />
            </div>

            {/* Section 4 (Release) - 3D Scene */}
            {/* Persist the ReleaseScene but pause it when inactive (logic inside component) */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${getVisibilityClass(4)}`}>
                <ErrorBoundary>
                    <Suspense fallback={<div className="w-full h-full bg-black" />}>
                        <ReleaseScene active={activeIndex === 4} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
}

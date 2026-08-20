"use client";

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { SECTIONS } from '@/lib/data';

type VideoBackgroundProps = {
    onLoaded?: (loaded: boolean) => void;
};

export default function VideoBackground({ onLoaded, src, playbackRate = 1 }: VideoBackgroundProps & { src?: string; playbackRate?: number }) {
    const activeIndex = useAppStore((state) => state.activeIndex);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Use the explicit src if provided, otherwise fallback to the current video from store
    const currentVideo = src || SECTIONS[activeIndex]?.video;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Play video when it's ready
        video.playbackRate = playbackRate;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented, muted autoplay should work
                video.muted = true;
                video.play().catch(() => { /* Ignore errors */ });
            });
        }
    }, [currentVideo, playbackRate]);

    const handleVideoLoad = () => {
        if (onLoaded) {
            onLoaded(true);
        }
    };

    // Don't render if no video for this section
    if (!currentVideo) {
        return <div className="absolute inset-0 bg-black" />;
    }

    return (
        <div className="absolute inset-0 z-0">
            <video
                ref={videoRef}
                src={currentVideo}
                poster="/usecasebg.jpg"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={handleVideoLoad}
                onCanPlayThrough={handleVideoLoad}
                className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center"
            />
            {/* Overlay gradient/darken */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/20 pointer-events-none" />
        </div>
    );
}

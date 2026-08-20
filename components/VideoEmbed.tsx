"use client";

import React from 'react';

export default function VideoEmbed() {
    return (
        <div className="w-full flex items-center justify-center pointer-events-auto">
            <div className="w-full max-w-[90vw] md:max-w-3xl lg:max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
                <iframe
                    className="w-full h-full relative z-10"
                    src="https://www.youtube.com/embed/oGOkx7cuwvo?autoplay=0&mute=0&controls=1"
                    title="Vi3W Materials Showcase"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

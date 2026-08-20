"use client";

import React from 'react';
import Link from 'next/link';

export default function ReleaseOverlay() {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full h-full">
            <div className="relative z-50 flex flex-col items-center gap-8 pointer-events-auto">
                <h2 className="text-white text-4xl md:text-6xl font-sans tracking-tight font-medium max-w-4xl px-4 text-center leading-tight">
                    Ship Games 10X Faster
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                     {/* Button 1: Join Discord */}
                    <Link 
                        href="https://discord.com/invite/TTWcRfvM9z" 
                        target="_blank"
                        className="group relative cursor-pointer block"
                    >
                        <div className="relative flex items-center justify-center px-8 py-3 w-48 rounded-full border border-white/40 bg-black/20 backdrop-blur-md text-white font-medium tracking-wide transition-all duration-300 group-hover:bg-[#5865F2] group-hover:border-[#5865F2] group-hover:scale-105 active:scale-95">
                            Join Discord
                        </div>
                    </Link>

                    {/* Button 2: Try Beta */}
                     <Link 
                        href="https://app.vi3w.in" 
                        target="_self"
                         className="group relative cursor-pointer block"
                    >
                        <div className="relative flex items-center justify-center px-8 py-3 w-48 rounded-full border border-white/40 bg-black/20 backdrop-blur-md text-white font-medium tracking-wide transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black group-hover:scale-105 active:scale-95">
                            Try Beta
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

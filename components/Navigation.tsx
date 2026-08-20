"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Portal from './Portal';
import { site, links as siteLinks, nav } from '@/lib/site';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = nav.map((item) => ({
        name: item.name,
        url: item.href,
        newTab: item.external,
    }));

    return (
        <nav className={`fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-[100] pointer-events-none text-white bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none transition-colors duration-300`}>
            <div className="relative flex items-center gap-2 pointer-events-auto z-[110]">
                <div className="w-9 h-9 relative rounded-full overflow-hidden">
                    <Image
                        src="/logo.gif"
                        alt={`${site.name} logo`}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <span className="font-mono text-lg tracking-[0.35em] leading-none">
                    {site.name}
                </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-1 p-1 pointer-events-auto border border-white/20">
                {links.map((item) => (
                    <Link
                        key={item.name}
                        href={item.url}
                        target={item.newTab ? "_blank" : "_self"}
                        rel={item.newTab ? "noopener noreferrer" : undefined}
                        className="px-6 py-2 rounded-full text-xs font-medium hover:bg-white/10 transition-colors block"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="relative flex items-center gap-4 md:gap-6 pointer-events-auto z-[110]">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href={siteLinks.app} className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">LOG IN</Link>
                    <Link href={siteLinks.app} className="bg-white text-black px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 hover:bg-zinc-200 transition-colors">
                        Get Access <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5">
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu via Portal */}
            {mobileMenuOpen && (
                <Portal>
                    {/* Dimmed Background Overlay */}
                    <div 
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    {/* Menu Content Dropdown */}
                    <div className="fixed top-[72px] md:top-[112px] left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden z-[91] transition-all duration-300 animate-in fade-in slide-in-from-top-5">
                        {links.map((item) => (
                            <Link
                                key={item.name}
                                href={item.url}
                                target={item.newTab ? "_blank" : "_self"}
                                rel={item.newTab ? "noopener noreferrer" : undefined}
                                className="text-left text-2xl font-light tracking-tight text-white/90 hover:text-white transition-colors block"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Portal>
            )}
        </nav>
    );
}

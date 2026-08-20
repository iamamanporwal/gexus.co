"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Settings2, Code, Layout, LucideIcon } from 'lucide-react';
import Image from 'next/image';

// --- Data ---
type UsecaseCardData = {
    id: number;
    title: string;
    icon: LucideIcon;
    color: string;
    summary: string;
    description: string;
    image?: string; // Optional now, as we might only have video
    video?: string; // Optional video field
    tag: string;
};

const USECASES: UsecaseCardData[] = [
    {
        id: 1,
        title: "Think",
        icon: Code,
        color: "bg-purple-500",
        summary: "Ideas come from looking.",
        description: "Optimized mesh topology for deformation. Multiple LOD levels for performance. Clean UV maps for texturing.",
        // No image needed, video is primary
        video: "/usecases/think-asset.mp4",
        tag: "Think"
    },
    {
        id: 2,
        title: "Design",
        icon: Layout,
        color: "bg-blue-500",
        summary: "Design is an effort to impose-  meaningful order.",
        description: "Manufacturable geometry with exact tolerances. Technical drawings with annotations. Export to CAD formats.",
        video: "/usecases/design-asset.mp4",
        tag: "Design"
    },
    {
        id: 3,
        title: "Iterate",
        icon: Settings2,
        color: "bg-amber-500",
        summary: "Iterate until you get it right.",
        description: "Automatic scale and proportion correction. Material suggestions based on context. Structural integrity analysis.",
        video: "/usecases/iterate-asset.mp4",
        tag: "Iterate"
    }
];

// --- Card Component ---
const Card = ({ data, draggable, onDragEnd, onCardClick, index }: { data: UsecaseCardData; draggable: boolean; onDragEnd?: () => void; onCardClick: () => void; index: number }) => {
    // Motion values for drag effect
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 150], [-5, 5]);
    const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);

    const cardStyle = draggable ? { x, rotate, opacity } : {};

    // Dynamic stacking values based on screen size could be handled via media queries in CSS or simple conditional logic if needed.
    // For simplicity and performance, we'll use responsive variants in the animate prop or just conservative values.

    // We'll use a window width hook or simply rely on conservative values that work for both, 
    // or use conditional rendering values if we had access to window size. 
    // Since this is server-side compatible code, we'll stick to conservative logic or check window in useEffect.
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Stacking Configuration
    const yOffset = isMobile ? -index * 45 : -index * 40; // Increased spacing on mobile (was -index * 15)
    const xOffset = isMobile ? 0 : index * 40;           // LINEAR stacking on mobile (was index * 30)
    const scale = 1 - index * 0.05;


    return (
        <motion.div
            style={{
                ...cardStyle,
                zIndex: USECASES.length - index, // Reverse z-index for stacking
            }}
            animate={{
                scale: scale,
                y: yOffset,
                x: xOffset,
                rotate: 0
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${data.title} use case`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // Prevent page scroll
                    if (!draggable) onCardClick();
                }
            }}
            drag={draggable ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05}
            onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) {
                    if (onDragEnd) onDragEnd();
                }
            }}
            onClick={() => {
                if (!draggable) {
                    onCardClick();
                }
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className={`
                absolute bottom-0 right-0
                w-full max-w-[90vw] md:max-w-11xl lg:max-w-25xl
                aspect-video
                bg-[#09090b] 
                border border-white/20
                rounded-xl overflow-hidden
                shadow-2xl shadow-black/90
                ${index === 0 ? 'shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)]' : ''} 
                flex flex-col
                ${draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                focus:outline-none transition-shadow
            `}
        >
            {/* Window Header */}
            <div className="h-9 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between select-none shrink-0">
                <div className="flex gap-2 items-center">
                    <data.icon size={12} className="text-white/70" />
                    <span className="text-[12px] font-medium text-white/70">{data.title}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative flex-1 overflow-hidden group w-full h-full">
                {/* Media Background (Video or Image) */}
                {data.video ? (
                    <video
                        src={data.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    data.image && (
                        <div className="relative w-full h-full">
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 60vw"
                                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                                priority={index === 0}
                            />
                        </div>
                    )
                )}


                {/* Number/Tag Overlay - Moved to Left, Dark Transparent */}
                <div className="absolute bottom-2 left-4 pointer-events-none select-none">
                    <span className="text-[120px] md:text-[180px] font-bold leading-none text-white/5 tracking-tighter">
                        {data.id}
                    </span>
                </div>

                {/* Text Content - Centered, Simple Subtitle */}
                <div className="absolute bottom-6 left-0 right-0 mx-auto max-w-[80%] pointer-events-none text-center z-10">
                    <p className="text-white/90 font-medium text-base md:text-lg leading-relaxed drop-shadow-md">
                        {data.summary}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProductDeck() {
    // Current visible stack order
    const [cards, setCards] = useState(USECASES);
    const [isHovered, setIsHovered] = useState(false);

    const moveToEnd = () => {
        setCards((currentCards) => {
            const newCards = [...currentCards];
            const movedCard = newCards.shift();
            if (movedCard) newCards.push(movedCard);
            return newCards;
        });
    };

    const bringToFront = (index: number) => {
        setCards((currentCards) => {
            const newCards = [...currentCards];
            // Rotate the array until the clicked index becomes 0
            // Basically performing "moveToEnd" 'index' times
            for (let i = 0; i < index; i++) {
                const movedCard = newCards.shift();
                if (movedCard) newCards.push(movedCard);
            }
            return newCards;
        });
    };

    // Autoplay implementation (Delay: 7000ms)
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            moveToEnd();
        }, 7000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-24 md:gap-12 py-24 md:py-12 lg:py-0">
            {/* LEFT: Text Content */}
            <div className="w-full md:w-1/2 space-y-6 lg:space-y-8 z-10 text-left pl-4 mb-12 md:mb-0">
                <div className="mb-4 md:mb-8 flex items-center gap-4 font-mono text-xs tracking-widest text-blue-400">
                    <span>03</span>
                    <div className="w-8 h-[1px] bg-white/50"></div>
                    <span>Product</span>
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.9] tracking-tighter mb-2 lg:mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                    Create the things <br />
                    <span className="text-white/40">you wish existed.</span>
                </h2>
                <div className="flex items-center gap-4 text-lg md:text-xl font-medium">
                    {USECASES.map((usecase, index) => {
                        const isLast = index === USECASES.length - 1;
                        const isActive = cards[0].id === usecase.id;

                        // Define colors for each state
                        const activeColors: { [key: string]: string } = {
                            "Think": "text-yellow-400",
                            "Design": "text-blue-400",
                            "Iterate": "text-orange-400"
                        };

                        return (
                            <React.Fragment key={usecase.id}>
                                <button
                                    onClick={() => {
                                        const currentIndex = cards.findIndex(c => c.id === usecase.id);
                                        if (currentIndex !== -1) bringToFront(currentIndex);
                                    }}
                                    className={`
                                        transition-all duration-300
                                        ${isActive
                                            ? `${activeColors[usecase.title] || 'text-white'} scale-110`
                                            : 'text-zinc-600 hover:text-zinc-400'
                                        }
                                    `}
                                >
                                    {usecase.title}
                                </button>
                                {!isLast && (
                                    <span className="text-zinc-700">→</span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: Card Stack */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center perspective-[1000px]">
                <div
                    className="relative w-full max-w-[90vw] md:max-w-3xl lg:max-w-5xl aspect-video flex items-end justify-end"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence>
                        {cards.map((card, index) => {
                            // Render all 3 for the stack effect
                            if (index > 2) return null;
                            return (
                                <Card
                                    key={card.id}
                                    data={card}
                                    index={index}
                                    draggable={index === 0}
                                    onDragEnd={() => moveToEnd()}
                                    onCardClick={() => bringToFront(index)}
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

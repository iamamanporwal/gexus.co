import React, { useState } from 'react';
import { XCircle, Cpu, Wallet, X } from 'lucide-react';
import { motion } from 'framer-motion';

const RetroCard = ({
    title,
    icon: Icon,
    iconColor,
    message,
    buttons,
    className,
    isMobile,
    onClick,
    zIndex
}: {
    title: string;
    icon: React.ElementType;
    iconColor: string;
    message: string;
    buttons: string[];
    className?: string;
    isMobile?: boolean;
    onClick?: () => void;
    zIndex?: number;
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const runAway = () => {
        if (isMobile) return; // Disable easter egg on mobile
        // Constrain movement to a fixed range relative to origin (e.g., +/- 80px)
        // This prevents the card from wandering off-screen or covering text
        const randomX = Math.random() * 160 - 80;
        const randomY = Math.random() * 160 - 80;
        setPosition({ x: randomX, y: randomY });
    };

    return (
        <motion.div
            animate={position}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={onClick}
            style={{ zIndex }}
            className={`bg-[#c0c0c0] p-[4px] shadow-[inset_-2px_-2px_#0a0a0a,inset_2px_2px_#dfdfdf,inset_-4px_-4px_grey,inset_4px_4px_#fff] w-[90vw] max-w-[340px] md:max-w-none md:w-[400px] ${className}`}
        >
            {/* Title Bar */}
            <div className="bg-[#000080] px-2 py-1 flex items-center justify-between gradient-blue mb-4">
                <div className="text-white font-bold text-base tracking-wider pl-1 font-mono uppercase truncate">{title}</div>
                <div className="flex gap-[2px]">
                    <motion.button
                        onMouseEnter={runAway}
                        className="bg-[#c0c0c0] w-6 h-6 shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf] flex items-center justify-center active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_grey,inset_-2px_-2px_#dfdfdf]"
                    >
                        <X size={14} className="text-black font-bold" />
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 flex flex-col items-center gap-6">
                <div className="flex flex-row items-center gap-6 w-full">
                    <Icon size={48} className={iconColor} />
                    <p className="text-black text-sm md:text-base font-mono leading-snug font-bold">
                        {message}
                    </p>
                </div>

                <div className="flex gap-4 self-center mt-2">
                    {buttons.map((label, idx) => (
                        <motion.button
                            key={idx}
                            onMouseEnter={runAway}
                            className="bg-[#c0c0c0] px-6 py-2 text-black text-sm md:text-base border border-b-black border-r-black border-t-white border-l-white active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold font-mono shadow-sm hover:ring-1 ring-black/20"
                        >
                            {label}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function RetroErrorCards() {
    const [isMobile, setIsMobile] = React.useState(false);
    const [stackOrder, setStackOrder] = React.useState([0, 1, 2]); // Indices of cards

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const bringToFront = (index: number) => {
        setStackOrder(prev => {
            const newOrder = prev.filter(i => i !== index);
            return [...newOrder, index];
        });
    };

    const getZIndex = (index: number) => {
        const pos = stackOrder.indexOf(index);
        return pos + 10; // Base z-index is 10
    };

    return (
        <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-4 pt-64 pb-48 md:py-4 min-h-[500px]">

            {/* Card 1: 404 Error */}
            <div className={`
                ${isMobile ? 'absolute' : 'md:absolute text-right'} 
                ${isMobile ? 'translate-x-0 -translate-y-36 -rotate-3' : 'md:-translate-x-12 md:-translate-y-12 md:-rotate-2'} 
                hover:z-50 hover:rotate-0 transition-all duration-300
            `}>
                <RetroCard
                    title="Error_404.exe"
                    icon={XCircle}
                    iconColor="text-red-600"
                    message="Creativity.dll not found. Current tools are blocking user flow."
                    buttons={['OK']}
                    isMobile={isMobile}
                    onClick={() => isMobile && bringToFront(0)}
                    zIndex={isMobile ? getZIndex(0) : undefined}
                />
            </div>

            {/* Card 2: GPU Overload */}
            <div className={`
                ${isMobile ? 'absolute' : 'md:absolute'} 
                ${isMobile ? 'translate-x-0 translate-y-0 rotate-1' : 'md:translate-x-24 md:translate-y-24 md:rotate-1'} 
                hover:z-50 hover:rotate-0 transition-all duration-300
            `}>
                <RetroCard
                    title="GPU_Overload"
                    icon={Cpu}
                    iconColor="text-yellow-600"
                    message="Hardware insufficient. Your fan is spinning too fast."
                    buttons={['RETRY', 'ABORT']}
                    isMobile={isMobile}
                    onClick={() => isMobile && bringToFront(1)}
                    zIndex={isMobile ? getZIndex(1) : getZIndex(1) + 10} // Original z-20 for desktop
                />
            </div>

            {/* Card 3: Wallet Overflow */}
            <div className={`
                ${isMobile ? 'absolute' : 'md:absolute'} 
                ${isMobile ? 'translate-x-0 translate-y-36 -rotate-2' : 'md:-translate-x-32 md:translate-y-48 md:-rotate-3'} 
                hover:z-50 hover:rotate-0 transition-all duration-300
            `}>
                <RetroCard
                    title="Wallet_Overflow"
                    icon={Wallet}
                    iconColor="text-purple-700"
                    message="Subscription cost exceeds available resources."
                    buttons={['CANCEL']}
                    isMobile={isMobile}
                    onClick={() => isMobile && bringToFront(2)}
                    zIndex={isMobile ? getZIndex(2) : undefined}
                />
            </div>

        </div>
    );
}


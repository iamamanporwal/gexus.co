"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ReleaseScene({ active }: { active: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Canvas Wave Effect (Preserved)
    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const drawWave = (
            yOffset: number,
            amplitude: number,
            frequency: number,
            color: string,
            blur: number,
            phaseShift: number
        ) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 60; 
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalCompositeOperation = 'screen';

            for (let x = 0; x < canvas.width; x += 5) {
                const y =
                    canvas.height / 2 +
                    Math.sin(x * frequency + time + phaseShift) * amplitude +
                    Math.sin(x * frequency * 0.5 + time * 0.5) * (amplitude * 0.2);

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        };

        const onMouseMove = (e: MouseEvent) => {
            const speed = Math.hypot(e.movementX, e.movementY) * 0.005;
            time += speed;
        };
        window.addEventListener('mousemove', onMouseMove);

        const render = () => {
            ctx.filter = 'none';
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.filter = 'blur(60px)';

            // Draw Blue Wave
            drawWave(0, 150, 0.003, '#1D4ED8', 0, 0);

            // Draw Cyan/Lighter Wave
            drawWave(0, 150, 0.003, '#3B82F6', 0, Math.PI);

            // Draw Violet Wave
            drawWave(0, 180, 0.002, 'rgba(109, 40, 217, 0.8)', 0, time * 0.5);

            if (active) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [active]);

    return (
        <div className="absolute inset-0 z-40 transition-opacity duration-1000 opacity-100 bg-black">

            {/* 2D Canvas for The Wave Effect */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block w-full h-full opacity-80 pointer-events-none z-0"
            />

            {/* Dark Gaussian Blur Layer */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-3xl pointer-events-none z-10"
                style={{
                    maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
                }}
            ></div>

            {/* HTML Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30">
                {/* Background Number */}
                <div className="absolute text-[25vw] font-bold text-white/5 select-none pointer-events-none font-sans flex items-center justify-center tracking-tighter z-0">
                    3D
                </div>
            </div>
        </div>
    )
}

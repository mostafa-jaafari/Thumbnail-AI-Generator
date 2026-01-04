"use client";
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function TiltPreview() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Use spring to smooth out the movement values directly
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform position into rotation degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        // Calculate percentage (-0.5 to 0.5) to ensure consistent rotation regardless of size
        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true , amount: 0.5}}
            className="px-3 md:px-6 w-full flex justify-center items-center">
            <div
                className="relative w-full max-w-5xl aspect-video flex justify-center items-center cursor-pointer"
                style={{ perspective: 3000 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* The Moving Layer */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full h-full rounded-2xl shadow-2xl"
                >
                    <div className="absolute inset-0 rounded-2xl border-t-2 border-pink-900 shadowxl shadow-pink-700/20">
                        <Image
                            src="/Tilt-Preview.png"
                            alt="Dashboard Preview"
                            fill
                            quality={100}
                            className="object-cover rounded-2xl"
                            priority // Loads faster since it's near the top
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                        
                        {/* Optional: Add a glossy reflection effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none mix-blend-overlay" />
                    </div>
                    <div className='absolute rounded-b-2xl bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black to-transparent'/>
                </motion.div>
            </div>
        </motion.section>
    );
}
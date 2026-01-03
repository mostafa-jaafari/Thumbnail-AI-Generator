"use client";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/components/Testimonials"; // Ensure this path is correct
import { useEffect, useState } from "react";
import { BadgeCheck, Quote } from "lucide-react";
import Image from "next/image";

export default function AuthReviewsSection() {
    const [index, setIndex] = useState(0);
    
    // Use standard setInterval for timing (cleaner than requestAnimationFrame for this use case)
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // 5 seconds is usually better for reading speed than 7

        return () => clearInterval(timer);
    }, []);
    
    // Current data
    const active = testimonials[index];

    return (
        <div className='relative w-full max-w-lg mx-auto h-full p-6 flex flex-col justify-center items-center'>
            
            {/* Background Decor - Fixed z-index to stay behind */}
            <Quote className="absolute left-4 top-10 text-pink-600/10 rotate-180 w-24 h-24 -z-10" />

            <div className="relative w-full min-h-[180px]"> {/* Min-height prevents layout jumping */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index} // Key is crucial for AnimatePresence to detect change
                        
                        // Refined Animation: Slide Up + Blur + Fade
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                        
                        transition={{ 
                            duration: 0.5, 
                            ease: "easeOut" 
                        }}
                        
                        className="flex flex-col md:flex-row items-start gap-4"
                    >
                        {/* Profile Image with subtle pop animation */}
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                            className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md"
                        >
                            <Image
                                src={active.image}
                                alt={active.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Text Content */}
                        <div className="space-y-2">
                            <div>
                                <h3 className="font-semibold text-white flex items-center gap-1.5 text-base">
                                    {active.name} 
                                <BadgeCheck size={16} className="text-blue-500 fill-blue-500/10" />
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {active.handle}
                                </p>
                            </div>
                            
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {active.text}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Optional: Progress Dots */}
            <div className="flex gap-2 mt-6">
                {testimonials.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === index ? "w-6 bg-pink-700" : "w-1.5 bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
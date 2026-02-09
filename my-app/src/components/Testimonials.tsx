"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BiBadgeCheck } from "react-icons/bi";

export const testimonials = [
  {
    name: "Ethan Walker",
    handle: "@ethanwrites",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "We've tried several tools, but nothing comes close in terms of quality. The automation features alone have saved our team countless hours.",
  },
  {
    name: "Maya Patel",
    handle: "@mayapatel",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The automation features alone have saved our team countless hours. Setup was ridiculously easy and the results are stunning.",
  },
  {
    name: "Liam Brooks",
    handle: "@liambrooks",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    text: "Setup was ridiculously easy. Within 10 minutes, we were running live and seeing results. Highly recommended for creators.",
  },
  {
    name: "Sophia Carter",
    handle: "@sophiacodes",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "This SaaS app has completely streamlined our onboarding process. I can't imagine going back to the old way of doing things.",
  },
  {
    name: "James Wilson",
    handle: "@jwilson_dev",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "The best investment we made this year. The generated thumbnails are click-magnets!",
  },
];

export default function TestimonialMarquee() {
  return (
    <section 
      id="Reviews"
      className="scroll-mt-20 md:scroll-mt-26 w-full pb-20 md:pb-20 text-white relative">
    <div className="absolute left-1/3 rounded-full w-160 h-160 bg-pink-700 opacity-10 blur-3xl"/>
    {/* Background Glow */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className='flex flex-col items-center'
    >
        <span
        className='bg-pink-700/10 border border-pink-700 rounded-full px-8 py-2 text-pink-700'
        >
            Testimonials
        </span>
        <h1
            className='text-3xl font-bold mt-6 mb-3'
        >
            Loved by creators
        </h1>
        <p
            className='text-sm text-gray-500'
        >
            See how our AI thumbnails are helping channels explode their views.
        </p>
    </motion.div>

    {/* --- Marquee Wrapper --- */}
    <div className="space-y-3 mt-12">
        
        {/* ROW 1: Normal Direction (Right to Left) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative w-full overflow-hidden group">
                {/* Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
            
            <div className="flex">
                <div className="flex shrink-0 gap-3 animate-scroll-left min-w-full pr-3">
                    {testimonials.map((item, idx) => (
                        <TestimonialCard key={idx} {...item} />
                    ))}
                </div>
                <div className="flex shrink-0 gap-3 animate-scroll-left min-w-full pr-3" aria-hidden="true">
                    {testimonials.map((item, idx) => (
                        <TestimonialCard key={idx} {...item} />
                    ))}
                </div>
            </div>
        </motion.div>

        {/* ROW 2: Reverse Direction (Left to Right) */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative w-full overflow-hidden group">
                {/* Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

            <div className="flex">
                {/* Note the use of .animate-scroll-right here */}
                <div className="flex shrink-0 gap-3 animate-scroll-right min-w-full pr-3">
                    {testimonials.map((item, idx) => (
                        <TestimonialCard key={idx} {...item} />
                    ))}
                </div>
                <div className="flex shrink-0 gap-3 animate-scroll-right min-w-full pr-3" aria-hidden="true">
                    {testimonials.map((item, idx) => (
                        <TestimonialCard key={idx} {...item} />
                    ))}
                </div>
            </div>
        </motion.div>

    </div>
    </section>
  );
}

// --- Card Component (Unchanged Styles) ---
function TestimonialCard({ name, handle, image, text }: { name: string; handle: string; image: string; text: string }) {
  return (
    <div className="w-[300px] md:w-[350px] p-4 rounded-lg bg-pink-600/5 hover:bg-pink-600/10 border border-pink-700/20 hover:border-pink-500/50 transition-colors duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative border-2 border-pink-900 w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-900 shrink-0">
            <Image 
                src={image} 
                alt={name} 
                fill 
                className="object-cover" 
                sizes="48px"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-white text-sm md:text-base">{name}</h4>
              <BiBadgeCheck size={16} className="text-blue-500" />
            </div>
            <p className="text-xs md:text-sm text-gray-500">{handle}</p>
          </div>
        </div>
        <p className="text-gray-500 leading-relaxed text-sm">
          {text.length > 80 ? `${text.slice(0, 80)}...` : text}
        </p>
      </div>
    </div>
  );
}
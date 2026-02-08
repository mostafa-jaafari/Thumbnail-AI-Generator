"use client";
import { motion } from 'framer-motion';
import { BiCheck } from 'react-icons/bi';


const Pricing_Details = [
    {type: "starter", price: 29, credits: 500, planFeatured: ["50 AI Thumbnails", "Best for starters", "Access to all AI models", "No watermark on downloads", "High-quality", "Commercial usage allowed", "Credits never expire"]},
    {type: "pro", price: 49, credits: 2400, planFeatured: ["240 AI Thumbnails", "Best for intermediate", "Access to all AI models", "No watermark on downloads", "High-quality", "Commercial usage allowed", "Credits never expire"]},
    {type: "ultra", price: 99, credits: 8000, planFeatured: ["800 AI Thumbnails", "Best for professionals", "Access to all AI models", "No watermark on downloads", "High-quality", "Commercial usage allowed", "Credits never expire"]},
];

export default function PricingPlans() {
  return (
    <div
        id='Plans'
        className='scroll-mt-20 w-full lg:px-36 md:px-6 px-3 flex flex-col items-center'
    >
        <div
            className='flex flex-col items-center'
        >
            <span
            className='bg-pink-700/10 border border-pink-700 rounded-full px-8 py-2 text-pink-700'
            >
                Pricing
            </span>
            <h1
                className='text-3xl font-bold mt-6 mb-3'
            >
                Simple Pricing
            </h1>
            <p
                className='text-sm text-gray-500'
            >
                Choose the plan that fits your creation schedule. Cancel anytime.
            </p>
        </div>
        <div
            className='w-full flex md:flex-row flex-col items-center justify-between gap-3 md:gap-6 md:py-24 py-12'
        >
            {Pricing_Details.map((plan, idx) => {
                return (
                    <motion.div
                        initial={plan.type.toLowerCase() !== "pro" && { opacity: 0, y: 75 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                        key={idx}
                        className={`relative hover:-translate-y-2 max-w-80 w-full p-6 min-h-50
                            rounded-lg overflow-hidden border transition-transform duration-300
                            ${plan.type.toLowerCase() === "pro" ? 
                                "mt-6 md:mt-0 scale-105 -translate-y-3 bg-pink-700/40 border-pink-700/80"
                                :
                                "bg-pink-600/10 border-pink-700/20"}`}
                    >
                        {plan.type.toLowerCase() === "pro" && (
                            <div
                                className='absolute top-0 right-0 px-3 py-1.5 text-sm bg-pink-700 rounded-bl-lg w-max'
                            >
                                Popular
                            </div>
                        )}
                        <b className='capitalize'>{plan.type}</b>
                        <span
                            className='flex items-end gap-1.5'
                        >
                            <h1 className='font-bold text-3xl'>${plan.price}</h1>
                            <p className='text-xl text-gray-400'> / </p> <p className='text-gray-400 font-semibold'>{plan.credits} credits</p>
                        </span>

                        <ul
                            className='space-y-3 my-6'
                        >
                            {plan.planFeatured.map((feat, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className='flex items-center gap-3 text-gray-400 text-sm tracking-wide'
                                    >
                                        <BiCheck size={20} className='text-pink-700'/> {feat}
                                    </li>
                                )
                            })}
                        </ul>
                        <button
                            className={`w-full rounded-lg
                                px-6 py-2 text-center cursor-pointer
                                ${plan.type.toLowerCase() === "pro" ? 
                                    "bg-white hover:bg-white/90 text-pink-700 font-semibold"
                                    :
                                    "bg-pink-700 hover:bg-pink-700/90"}`}
                        >
                            Get Started
                        </button>
                    </motion.div>
                )
            })}
        </div>
    </div>
  )
}

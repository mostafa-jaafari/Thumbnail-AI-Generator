"use client";
import { useUserInfos } from '@/context/UserInfos';
import { Check, ChevronRight, Video } from 'lucide-react'
import { useRouter } from 'next/navigation';


const Featured = ["No design skills needed", "Fast generation", "High CTR templates"]

export default function HeroSection() {
    const { isLoggedIn, isLoading } = useUserInfos();
    const router = useRouter();
    return (
        <div
            className='px-3 md:px-6 w-full mb-12 flex flex-col items-center overflow-hidden'
        >
            <div
                className='absolute top-0 -z-1 w-260 h-160 blur-3xl rounded-full opacity-10 bg-gradient-to-r from-transparent via-pink-600 to-transparent'
            />
            <div
                className='relative z-2 max-w-3xl flex flex-col items-center gap-6 text-center'
            >
                <div
                    className='flex font-light items-center gap-2 tracking-wider text-sm bg-pink-400/20 p-1 pr-3 rounded-full'
                >
                    <span
                        className='bg-pink-700 px-3 py-0.5 rounded-full'
                    >New</span>
                    <h1>
                        Thumbnail AI Generator 
                    </h1>
                    <ChevronRight size={16}/>
                </div>

                <h1
                    className='text-6xl font-bold leading-tight tracking-wide'
                >
                    AI Thumbnail Generator for your 
                    <span 
                        className='ml-3 bg-gradient-to-r from-pink-600 via-pink-500 
                            to-pink-400 p-1.5 rounded-lg font-extrabold'>
                                Videos.
                    </span>
                </h1>

                <p
                    className='text-sm text-gray-500 max-w-lg mt-3'
                >
                    Stop wasting hours on design. Get high-converting 
                    thumbnails in seconds with our advanced AI.
                </p>

                <div
                    className='flex flex-col md:flex-row items-center gap-3'
                >
                    <button
                        disabled={isLoading}
                        onClick={() => router.push(isLoggedIn ? "/adm/generate" : "/auth/login")}
                        className='min-w-[200px] disabled:text-neutral-300 disabled:animate-pulse cursor-pointer hover:bg-pink-700/90 bg-pink-700 text-white rounded-full px-6 py-2'
                    >
                        {isLoading ? "Loading ..." : isLoggedIn ? "Generate Now" : "Get Started Now"}
                    </button>
                    <button
                        className='flex items-center gap-2 cursor-pointer border border-pink-700 hover:bg-pink-700/10 hover:border-pink-700/90 rounded-full py-2 px-6'
                    >
                        <Video size={16}/>
                        See how it Works ?
                    </button>
                </div>
                <ul
                    className='flex items-center gap-6 md:gap-12 flex-wrap justify-center mt-6'
                >
                    {Featured.map((feat, idx) => {
                        return (
                            <li
                                key={idx}
                                className='flex items-center gap-1.5 text-gray-500 text-sm'
                            >
                                <Check size={20} className='text-pink-700'/> {feat}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

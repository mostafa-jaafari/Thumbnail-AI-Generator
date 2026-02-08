"use client";
import { useUserInfos } from '@/context/UserInfos';
import { useRouter } from 'next/navigation';
import { BiCheck, BiChevronRight, BiVideo } from 'react-icons/bi';


const Featured = ["No design skills needed", "Fast generation", "High CTR templates"]

export default function HeroSection() {
    const { isLoggedIn } = useUserInfos();
    const router = useRouter();
    return (
        <div
            id='Home'
            className='scroll-mt-80 mp-8 md:mt-20 px-3 md:px-6 w-full mb-12 flex flex-col items-center overflow-hidden'
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
                    <BiChevronRight size={16}/>
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
                        onClick={() => router.push(isLoggedIn ? "/adm/generate" : "/auth/login")}
                        className='py-3 px-6 text-sm rounded bg-pink-700
                        flex items-center gap-1.5 hover:bg-pink-700/80 cursor-pointer
                        border border-pink-500/60'
                    >
                        {isLoggedIn ? "Generate Now" : "Get Started Now"}
                    </button>
                    <button
                        className='py-3 px-6 text-sm rounded bg-transparent
                        flex items-center gap-1.5 hover:bg-pink-700/10 cursor-pointer
                        border border-pink-500/60'
                    >
                        <BiVideo size={16}/>
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
                                className='flex items-center gap-1.5 text-neutral-300 text-sm'
                            >
                                <BiCheck size={24} className='text-pink-500'/> {feat}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

"use client";
import { LogIn, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from 'react';


const HeaderNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/' },
    { name: 'Pricing', href: '/' },
    { name: 'Contact', href: '/' }
]

const DropMenu = ({ HandleCloseMenu }: { HandleCloseMenu: () => void }) => {
    const MenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const HandleHideMenu = (e: MouseEvent) => {
            if(MenuRef.current && !MenuRef.current.contains(e.target as Node)){
                HandleCloseMenu();
            }
        }
        document.addEventListener("mousedown", HandleHideMenu);
        return () => document.removeEventListener("mousedown", HandleHideMenu);
    },[HandleCloseMenu])
    return (
        <div
            className='fixed right-0 top-0 z-50 flex justify-end bg-black/50 w-full h-screen'
        >
            <motion.div
                ref={MenuRef}
                initial={{ opacity: 1, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[300px] min-w-[200px] h-full border-l border-neutral-900 bg-gradient-to-tr from-black to-neutral-900 rounded-l-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className='w-full flex justify-start p-3'
                >
                    <button
                        onClick={HandleCloseMenu}
                        className='text-neutral-400 hover:text-white/80 cursor-pointer'
                    >
                        <FiX size={20}/>
                    </button>
                </div>
                <span className='flex h-px w-full bg-neutral-900'/>
                <div
                    className='w-full flex flex-col'
                >
                    {HeaderNavigation.map((nav, idx) => {
                        return (
                            <li
                                key={idx}
                                className='border-b border-neutral-800 w-full py-3 px-6 hover:text-white text-neutral-300 cursor-pointer hover:bg-neutral-900/90 flex justify-start font-extralight text-sm'
                            >
                                {nav.name}
                            </li>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}
export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const HandleCloseMenu = () => {
        setIsOpenMenu(false);
    }
    return (
        <div
            className='w-full z-50 backdrop-blur-sm py-4 lg:px-36 md:px-6 px-3 flex items-center justify-between sticky top-0'
        >
            <Image 
                src="https://thumbnailgo.com/logo.svg" 
                width={200} 
                height={60} 
                alt=''
            />

            <ul
                className='hidden md:flex items-center lg:gap-12 md:gap-6'
            >
                {HeaderNavigation.map((nav, idx) => {
                    return (
                        <Link
                            key={idx}
                            href={nav.href}
                            className='text-sm text-neutral-300 hover:text-white'
                        >
                            {nav.name}
                        </Link>
                    )
                })}
            </ul>

            <div
                className='flex items-center gap-3'
            >
                <Link
                    href="/auth/login"
                    className='px-6 py-2 flex items-center gap-1.5 rounded-full 
                        hover:bg-pink-700/90 cursor-pointer bg-pink-700 text-white 
                        font-semibold text-sm'
                >
                    Login <LogIn size={16}/>
                </Link>

                <button
                    onClick={() => setIsOpenMenu(true)}
                    className='block md:hidden cursor-pointer hover:text-neutral-400 transition-colors duration-200'
                >
                    <Menu size={24}/>
                </button>
            </div>
            {isOpenMenu && <DropMenu HandleCloseMenu={HandleCloseMenu} />}
        </div>
    )
}

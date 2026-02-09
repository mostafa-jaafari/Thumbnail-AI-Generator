"use client";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from 'react';
import { GiToken } from 'react-icons/gi';
import { GoHomeFill } from 'react-icons/go';
import { RiAiGenerate2, RiContactsFill } from 'react-icons/ri';
import { BiLogIn, BiMenu } from 'react-icons/bi';
import { useUserInfos } from '@/context/UserInfos';
import { SignOutButton } from '@/app/auth/login/Auth_Button';
import { useRouter } from 'next/navigation';


const HeaderNavigation = [
    { name: 'Home', href: '#HeroSection' },
    { name: 'Features', href: '#TiltPreview' },
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
            className='fixed right-0 top-0 md:hidden z-50 flex justify-end bg-black/50 w-full h-screen'
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

const DropDownProfile = ({ User_Credits } : { User_Credits: number | null; setIsLoggedIn: (login: boolean) => void}) => {
    return (
        <div
            className='absolute top-full mt-1 left-0 w-full min-h-40 
                bg-neutral-900 rounded-lg border border-neutral-800 p-1.5 z-1 
                overflow-hidden flex flex-col justify-between cursor-default'
        >
            <div
                className='text-sm text-pink-700 flex items-center gap-1.5 px-1.5 pb-1'
            >
                <GiToken size={20} />
                <span
                    className='flex items-center gap-1 text-sm'
                >
                    <h1>{User_Credits}</h1>
                    <p className='font-light text-xs text-neutral-500'>Credits</p>
                </span>

            </div>
            <span className='flex h-px w-full bg-neutral-800'/>
            <ul
                className='space-y-0.5 py-1.5'
            >
                {[{name: "Home", icon: GoHomeFill}, {name: "Generate", icon: RiAiGenerate2}, {name: "Contact", icon: RiContactsFill}].map((item, idx) => {
                    return (
                        <button
                            onClick={(e) => e.stopPropagation()}
                            key={idx}
                            className='text-start text-sm flex items-center gap-1.5 px-1.5 py-1 cursor-pointer hover:bg-neutral-800/80 rounded-lg w-full'
                        >
                            <item.icon size={18} /> {item.name}
                        </button>
                    )
                })}
            </ul>

            <SignOutButton />
        </div>
    )
}


export default function Header() {
    const DropDownProfileRef = useRef<HTMLDivElement | null>(null);
    const { isLoggedIn, setIsLoggedIn } = useUserInfos();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isDropDownProfilOpen, setIsDropDownProfilOpen] = useState(false);

    useEffect(() => {
        const hideDropDownProfile = (e: MouseEvent) => {
            if(DropDownProfileRef.current && !DropDownProfileRef.current.contains(e.target as Node)){
                setIsDropDownProfilOpen(false);
            }
        }

        document.addEventListener("mousedown", hideDropDownProfile);
        return () => document.removeEventListener("mousedown", hideDropDownProfile);
    },[])
    const HandleCloseMenu = () => {
        setIsOpenMenu(false);
    }

    const router = useRouter();
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
                        <button
                            key={idx}
                            onClick={() => router.push(nav.href)}
                            className='text-sm text-neutral-300 hover:text-white'
                        >
                            {nav.name}
                        </button>
                    )
                })}
            </ul>

            <div
                className='flex items-center gap-3'
                ref={DropDownProfileRef}
            >
                {isLoggedIn ? (
                    <button
                        onClick={() => setIsDropDownProfilOpen(!isDropDownProfilOpen)}
                        className={`relative cursor-pointer border
                            rounded-lg py-0.5 px-1 transition-all duration-200
                            ${isDropDownProfilOpen ? "bg-neutral-900/20 border-neutral-900" : "border-neutral-900 bg-black/40 hover:border-neutral-900 hover:bg-neutral-900/20"}`}
                    >
                        <div
                            className='flex items-center gap-1.5'
                        >
                            <div
                                className='relative text-wrap w-10 h-10 rounded-full overflow-hidden border border-pink-700'
                            >
                                <Image
                                    src="/Default-Avatar.jpg"
                                    alt='User Profile'
                                    fill
                                    className='object-cover'
                                    priority
                                />
                            </div>
                            <span
                                className='text-start'
                            >
                                <h1
                                    className='truncate max-w-[140px] text-sm text-pink-700'
                                >
                                    Mostafa Jaafari
                                </h1>
                                <p
                                    className='truncate max-w-[140px] text-gray-500 text-xs'
                                >
                                    user.email@test.com
                                </p>
                            </span>
                        </div>
                        {isDropDownProfilOpen && (
                            <DropDownProfile User_Credits={15} setIsLoggedIn={setIsLoggedIn} />
                        )}
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        className='py-1.5 px-3 text-sm rounded bg-pink-700
                        flex items-center gap-1.5 hover:bg-pink-700/80 cursor-pointer
                        border border-pink-500/60'
                    >
                        Login <BiLogIn size={16}/>
                    </Link>
                )}

                <button
                    onClick={() => setIsOpenMenu(true)}
                    className='block md:hidden cursor-pointer hover:text-neutral-400 transition-colors duration-200'
                >
                    <BiMenu size={24}/>
                </button>
            </div>
            {isOpenMenu && <DropMenu HandleCloseMenu={HandleCloseMenu} />}
        </div>
    )
}

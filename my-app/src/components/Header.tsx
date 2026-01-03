import { LogIn, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' }
]
export default function Header() {
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
                className='block md:hidden cursor-pointer hover:text-neutral-400 transition-colors duration-200'
            >
                <Menu size={24}/>
            </button>
        </div>
    </div>
  )
}

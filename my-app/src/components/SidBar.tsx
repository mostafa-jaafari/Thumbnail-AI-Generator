import Image from 'next/image'
import React from 'react'
import { GoSidebarExpand } from 'react-icons/go'

export default function SidBar() {
  return (
    <div
        className='sticky top-0 flex flex-col items-center bg-black max-w-16 md:max-w-[220px] w-full h-screen border-r border-neutral-900'
    >
        <div
            className='flex items-center justify-between gap-3 p-3'
        >
            <Image
                src="https://thumbnailgo.com/logo.svg"
                alt='https://thumbnailgo.com/logo.svg'
                width={120}
                height={20}
                priority
                className='hidden md:block'
            />

            <button
                className='cursor-pointer p-1 rounded-lg border border-transparent hover:border-neutral-900 hover:bg-neutral-900/20 hover:text-neutral-400 text-neutral-500'
            >
                <GoSidebarExpand size={24} />
            </button>
        </div>
        SidBar
    </div>
  )
}

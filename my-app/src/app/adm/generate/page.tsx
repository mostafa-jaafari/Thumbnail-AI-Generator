import SidBar from '@/components/SidBar'
import React from 'react'
import { CreateThumbForm } from './CreateThumbForm'

export default function page() {
  return (
    <main
        className='flex '
    >
        <SidBar />
        <section
            className='w-full h-screen overflow-auto'
        >
            <div className='absolute inset-0 -z-1 translate-y-1/6 translate-x-3/6 w-120 h-80 bg-pink-700 rounded-full opacity-10 blur-3xl'/>
            
            <div
                className='w-full py-3 px-6 bg-black border-b border-neutral-900'
            >
                hello wworld
            </div>
            <div
                className='py-3 px-6 flex items-start gap-3 justify-between'
            >
                <div
                    className='w-2/5 min-h-160 p-6 flex-shrink-0 border border-neutral-800 rounded-lg bg-white/5 backdrop-blur-sm'
                >
                    <span
                        className='space-y-1.5'
                    >
                        <h1
                            className='text-2xl font-bold capitalize'
                        >
                            Create Your Thumbnail
                        </h1>
                        <p
                            className='text-gray-500 text-sm '
                        >
                            Describe your vision and let AI bring it to life
                        </p>
                    </span>
                    <CreateThumbForm />
                </div>

                <div
                    className='w-full h-90 border border-neutral-800 rounded-lg bg-white/5 backdrop-blur-sm'
                >
                    hello world
                </div>
            </div>
        </section>
    </main>
  )
}

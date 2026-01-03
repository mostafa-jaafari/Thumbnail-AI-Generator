import React from 'react'

export default function LastCTA() {
  return (
    <div
        className='mt-24 w-full p-6 lg:px-36 md:px-6 px-3'
    >
        <div
            className='rounded-lg md:rounded-2xl py-6 md:py-12 pl-3 md:pl-36 pr-3 md:pr-12 w-full border border-pink-700
                flex md:flex-row flex-col text-center md:text-start items-center justify-between bg-gradient-to-b from-pink-600 via-pink-900 to-pink-900/80'
        >
            <span
                className='space-y-3 pb-6 md:pb-0'
            >
                <h1
                    className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text'
                >
                    Ready to go viral?
                </h1>
                <p
                    className='text-sm md:text-lg bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text'
                >
                    Join thousands of creators using AI to boost their CTR.
                </p>
            </span>
            <button
                className='bg-white text-sm cursor-pointer hover:bg-white/90 px-6 py-2 rounded-full text-black'
            >
                Generate Free Thumbnail
            </button>
        </div>
    </div>
  )
}

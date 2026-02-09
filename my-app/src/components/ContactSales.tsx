"use client";
import React, { useState, ChangeEvent } from 'react'
import { motion } from "framer-motion"


export default function ContactSales() {
    const [inputs, setInputs] = useState({
        fullname: "",
        email: "",
        message: ""
    });

    const HandleInputsChannge = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

  return (
    <div
        id='Sales'
        className='scroll-mt-20 md:scroll-mt-30 relative w-full flex flex-col items-center lg:px-36 md:px-6 px-3'
    >
        <div className='absolute left-1/3 top-15 bg-pink-700/80 -z-1 blur-3xl w-120 h-120 opacity-10'/>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className='flex flex-col items-center'
        >
            <span
            className='bg-pink-700/10 border border-pink-700 rounded-full px-8 py-2 text-pink-700'
            >
                Contact us
            </span>
            <h1
                className='text-3xl font-bold mt-6 mb-3'
            >
                Grow your channel
            </h1>
            <p
                className='text-sm text-gray-500'
            >
                Have questions about our AI? Ready to scale your views? Let&apos;s talk.
            </p>
        </motion.div>

        <div
            className='w-full md:max-w-xl mt-12'
        >
            <motion.div
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1 , y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className='grid grid-cols-1 md:grid-cols-2 gap-3'
            >
                {/* --- FullName Input --- */}
                <div
                    className="flex flex-col gap-0.5"
                >
                    <label htmlFor="fullname" className='cursor-pointer hover:text-neutral-300 w-max text-sm text-gray-400'>Full Name</label>
                    <input 
                        type="text" 
                        id='fullname'
                        placeholder='Enter your name' 
                        name='fullname' 
                        required
                        value={inputs.fullname}
                        onChange={HandleInputsChannge}
                        className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200'
                    />
                </div>
                {/* --- Email Input --- */}
                <div
                    className="flex flex-col gap-0.5"
                >
                    <label htmlFor="email" className='cursor-pointer hover:text-neutral-300 w-max text-sm text-gray-400'>Email</label>
                    <input 
                        type="email" 
                        id='email'
                        placeholder='Enter your email' 
                        name='email' 
                        required
                        value={inputs.email}
                        onChange={HandleInputsChannge}
                        className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200'
                    />
                </div>
            </motion.div>
                {/* --- Message TextArea --- */}
                <div
                    className="w-full flex flex-col gap-0.5 mt-3"
                >
                    <label htmlFor="message" className='cursor-pointer hover:text-neutral-300 w-max text-sm text-gray-400'>Message</label>
                    <textarea 
                        id='message'
                        placeholder='Enter your message here...' 
                        name='message' 
                        required
                        value={inputs.message}
                        onChange={HandleInputsChannge}
                        className='resize-none min-h-30 border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200'
                    />
                </div>
                {/* --- Send Message Button --- */}
                <button
                    disabled
                    className='disabled:cursor-not-allowed disabled:bg-gray-600/20 disabled:text-gray-500 w-full p-3 mt-3 text-sm bg-pink-700 hover:bg-pink-700/90 cursor-pointer rounded-lg text-white'
                >
                    Send Message
                </button>
        </div>
    </div>
  )
}

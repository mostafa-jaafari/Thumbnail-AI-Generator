"use client";
import Link from 'next/link';
import { ChangeEvent, useState } from 'react'

export default function LoginForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const HandleLoginSubmit = () => {
        alert("hello world");
    }

    const HnandleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setInputs({...inputs, [name]: value});
    }
  return (
    <form 
        onSubmit={HandleLoginSubmit}
        className='space-y-3'
    >
        {/* --- Login Form --- */}
        {/* --- Email --- */}
        <div
            className='flex flex-col'
        >
            <label htmlFor="Email" className='cursor-pointer hover:text-gray-400 w-max text-gray-500'>Email</label>
            <input 
                type="email"
                name='email'
                id='Email'
                value={inputs.email}
                onChange={HnandleInputsChange}
                placeholder='Email'
                className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200'
                required
            />
        </div>

        {/* --- Password --- */}
        <div
            className='flex flex-col'
        >
            <label htmlFor="Password" className='cursor-pointer hover:text-gray-400 w-max text-gray-500'>Password</label>
            <input 
                type="password"
                name='password'
                id='Password'
                value={inputs.password}
                onChange={HnandleInputsChange}
                placeholder='Password'
                className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200'
                required
            />
        </div>

        {/* --- Submit Login Button --- */}

        <button
            className='bg-pink-700 hover:bg-pink-700/90 cursor-pointer
                w-full flex justify-center py-2 rounded-lg'
        >
            Login
        </button>

        {/* --- Upgrade Plan --- */}
        <span
            className='flex items-center gap-1 font-light text-sm'
        >
            <p>Don&apos;t have an account ? </p>
            <Link
                href="/auth/upgrade-plan"
                className='text-pink-700 font-semibold underline'
            >Upgrade Plan</Link>
        </span>
    </form>
  )
}

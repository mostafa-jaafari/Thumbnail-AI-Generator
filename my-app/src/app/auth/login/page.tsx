import Image from 'next/image'
import AuthForm from './AuthForm'
import AuthReviewsSection from './AuthReviewsSection'
import Link from 'next/link'
import { Auth_Button } from './Auth_Button'

export default function page() {
    
    return (
        <div
            className='relative w-full flex h-screen overflow-hidden'
        >
            <div className='absolute left-0 bottom-0 w-120 h-80 bg-pink-700 rounded-full opacity-10 blur-3xl -z-1'/>
            <div className='absolute right-0 top-0 w-120 h-80 bg-pink-700 rounded-full opacity-10 blur-3xl -z-1'/>
            
            <div
                className='lg:mx-0 mx-auto flex-shrink-0 max-w-[550px] w-full z-2 md:p-6 p-3 lg:bg-pink-700/5 lg:border-r border-pink-700/40 w-full h-full'
            >
                <Link
                    href="/"
                    className='py-3 flex w-max'
                >
                    <Image
                        src="https://thumbnailgo.com/logo.svg" 
                        width={200} 
                        height={60} 
                        alt=''
                    />
                </Link>
                <div
                    className='py-6 px-9'
                >
                    <div
                        className='w-full h-full'
                    >
                        <h1
                            className='fon-bold text-2xl'
                        >
                            Welcome back
                        </h1>
                        <p
                            className='text-sm text-gray-500 mt-1.5'
                        >Sing in to your account</p>

                        {/* --- Auth with Providers --- */}
                        <div
                            className='mt-6 space-y-1.5'
                        >
                            <Auth_Button Provider='Google' />
                            <Auth_Button Provider='Facebook' />
                        </div>

                        {/* --- Divider --- */}
                        <div
                            className='flex items-center gap-3 text-sm text-gray-500'
                        >
                            <span className='flex h-px w-full my-6 bg-neutral-800'/>
                            or
                            <span className='flex h-px w-full my-6 bg-neutral-800'/>
                        </div>
                        {/* --- Login Form --- */}
                        <AuthForm />
                    </div>
                </div>
            </div>
            <div
                className='w-full hidden lg:flex items-center justify-center'
            >
                <AuthReviewsSection />
            </div>
        </div>
    )
}

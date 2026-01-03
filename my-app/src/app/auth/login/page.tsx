import Image from 'next/image'
import LoginForm from './LoginForm'
import AuthReviewsSection from './AuthReviewsSection'

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
                <div
                    className='py-3'
                >
                    <Image
                        src="https://thumbnailgo.com/logo.svg" 
                        width={200} 
                        height={60} 
                        alt=''
                    />
                </div>
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
                            className='mt-6 space-y-3'
                        >
                            <button
                                className='flex items-center justify-center gap-3 text-white
                                    bg-pink-700/60 w-full py-2 rounded-lg border border-pink-700
                                    cursor-pointer hover:bg-pink-700/50'
                            >
                                <Image
                                    src="/GoogleIcon.png"
                                    alt='Google Icon'
                                    width={20}
                                    height={20}
                                    loading='lazy'
                                />
                                Continue with Google
                            </button>
                            <button
                                className='flex items-center justify-center gap-3 text-white
                                    bg-pink-700/60 w-full py-2 rounded-lg border border-pink-700
                                    cursor-pointer hover:bg-pink-700/50'
                            >
                                <Image
                                    src="/FacebookIcon.png"
                                    alt='Google Icon'
                                    width={20}
                                    height={20}
                                    loading='lazy'
                                />
                                Continue with Facebook
                            </button>
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
                        <LoginForm />
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

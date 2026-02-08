"use client";
import { ChangeEvent, startTransition, useState } from 'react'
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { MdMarkEmailUnread } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useUserInfos } from '@/context/UserInfos';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';

const Confirm_Email_Modal = ({ setIsOpenConfirmModal }: { setIsOpenConfirmModal: (isOpen: boolean) => void; }) => {
    return (
        <div
            className='absolute left-0 top-0 w-full h-screen overflow-hidden 
                bg-black/20 backdrop-blur-[1px] flex justify-center items-center'
        >
            <div
                className='relative z-1 w-full max-w-[600px] min-w-[250px] 
                    bg-neutral-800 h-[400px] 
                    rounded-lg p-4 md:p-6 border border-neutral-700 shadow-lg 
                    text-white flex flex-col justify-center items-center overflow-hidden'
            >
                {/* <div className='absolute inset-0 translate-x-5/6 translate-y-1/3 w-50 h-60 bg-white/30 opacity-40 blur-3xl -z-1'/> */}
                <MdMarkEmailUnread size={80} />
                <h3
                    className='font-bold text-3xl capitalize mt-3'
                >
                    Verify your email
                </h3>
                <p
                    className='text-gray-400 text-center text-sm font-light mt-3 mb-1.5'
                >
                    We’ve sent a verification link to your email address.
                    <br />
                    Please check your inbox and confirm to continue.
                </p>
                <span
                    className='flex items-center gap-2 w-full text-sm py-1.5 px-3 mt-3 rounded text-yellow-500 bg-yellow-800/20 border border-yellow-700/60'
                >
                    <FiAlertTriangle size={18}/> It&apos;s just mock Notification, you can Login directly Now.
                </span>
                <button
                    onClick={() => setIsOpenConfirmModal(false)}
                    className='bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded
                        cursor-pointer py-1.5 px-3 font-semibold text-sm mt-3
                        flex items-center gap-1.5'
                >
                    <IoChevronBack size={18}/> Back to Login
                </button>
            </div>
        </div>
    )
}
export default function AuthForm() {
    const { isLoggedIn, setIsLoggedIn } = useUserInfos();

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [currentForm, setCurrentForm] = useState<'login' | 'signup'>('login');
    const [inputs, setInputs] = useState({
        email: "mostafajaafari@test.com",
        password: "123456789",
        confirmpassword: "123456789",
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const HandleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(isLoggedIn){
            toast.info("Already logged in!");
            return;
        }
        if(currentForm === "signup"){
            if(inputs.password.trim().length < 6){
                toast.error("Password must be at least 6 characters long.");
                return;
            }
            if(inputs.password.trim() !== inputs.confirmpassword.trim()){
                toast.error("Password and Confirm Password do not match.");
                return;
            }
            if(inputs.password.trim().includes(" ")){
                toast.error("Password cannot contain spaces.");
                return;
            }
            try{
                setIsLoading(true);
                const loadingToast = toast.loading(`Sign up...`);
                startTransition(async () => {
                    await new Promise(resolve => setTimeout(resolve, 2500));
                    toast.dismiss(loadingToast);
                    setIsLoading(false)
                    toast.success("Account created successfully. Please log in.");
                    setIsOpenConfirmModal(true);
                    setCurrentForm("login");
                })
            }catch (err){
                toast.error((err as { message: string }).message);
            }
        }else if (currentForm === "login"){
            if(inputs.password.trim().length < 6){
                toast.error("Password must be at least 6 characters long.")
                return;
            }
            if(inputs.email.trim() === "" || inputs.password.trim() === ""){
                toast.error("Email and Password cannot be empty.");
                return;
            }
            try{
                setIsLoading(true)
                const loadingToast = toast.loading(`Logging in...`);
                startTransition(async () => {
                    await new Promise(resolve => setTimeout(resolve, 2500));
                    setIsLoggedIn(true);
                    toast.dismiss(loadingToast);
                    setIsLoading(false)
                    toast.success(`Logged in successfully.`);
                    router.push('/');
                })
            }catch (err){
                toast.error((err as { message: string }).message)
            }
        }
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
            <label htmlFor="Email" className='cursor-pointer hover:text-gray-400 w-max text-gray-500 text-sm'>Email</label>
            <input 
                type="email"
                name='email'
                id='Email'
                value={inputs.email}
                onChange={HnandleInputsChange}
                placeholder='Email'
                className='border border-neutral-700/60 hover:border-neutral-700 
                    focus:border-pink-600 px-3 py-2.5 rounded outline-none 
                    translate-all duration-200 placeholder:text-neutral-500 
                    placeholder:font-extralight'
                required
            />
        </div>

        {/* --- Password --- */}
        <div
            className='flex flex-col'
        >
            <label htmlFor="Password" className='cursor-pointer hover:text-gray-400 w-max text-gray-500 text-sm'>Password</label>
            <input 
                type="password"
                name='password'
                id='Password'
                value={inputs.password}
                onChange={HnandleInputsChange}
                placeholder='Password'
                className='border border-neutral-700/60 hover:border-neutral-700 
                    focus:border-pink-600 px-3 py-2.5 rounded outline-none 
                    translate-all duration-200 placeholder:text-neutral-500 
                    placeholder:font-extralight'
                required
            />
        </div>

        {currentForm === 'signup' && (
            <motion.div
                className='flex flex-col'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
            >
                <label htmlFor="ConfirmPassword" className='cursor-pointer hover:text-gray-400 w-max text-gray-500 text-sm'>Confirm Password</label>
                <input 
                    type="password"
                    name='confirmpassword'
                    id='ConfirmPassword'
                    value={inputs.confirmpassword}
                    onChange={HnandleInputsChange}
                    placeholder='Confirm Password'
                    className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded outline-none translate-all duration-200 placeholder:text-neutral-500 placeholder:font-extralight'
                    required
                />
            </motion.div>
        )}
        {/* --- Error Message --- */}
        {/* {isLoggedIn && (
            <p
                className='bg-red-600/10 py-2 px-3 rounded border border-red-600/50'
            >
                <span className='text-sm text-red-500 flex items-center gap-1.5'><MdErrorOutline size={18} /> Already logged in!</span>
            </p>
        )} */}

        {/* --- Submit Login Button --- */}

        <button
            disabled={isLoggedIn || isLoading}
            className='bg-pink-600 hover:bg-pink-600/80 cursor-pointer
                w-full flex justify-center py-2 rounded
                disabled:opacity-50 disabled:cursor-not-allowed 
                disabled:text-neutral-300 min-h-[40px]
                border border-pink-500
                flex items-center justify-center gap-1.5'
        >
            {isLoggedIn ? "Already logged in!" : isLoading ? "Loading..." : currentForm === 'login' ? 'Log In' : 'Sign Up'}
        </button>

        {/* --- Upgrade Plan --- */}
        <span
            className='flex items-center gap-1 font-light text-sm text-neutral-300'
        >
            <p>{currentForm === 'login' ? "Don't have an account ? " : "Already have an account ? "}</p>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentForm(currentForm !== 'signup' ? 'signup' : 'login');
                }}
                className='text-pink-700 font-semibold underline cursor-pointer hover:text-pink-800'
            >{currentForm === 'login' ? 'Sign Up' : 'Sign In'}</button>
        </span>
        {isOpenConfirmModal && (
            <Confirm_Email_Modal setIsOpenConfirmModal={setIsOpenConfirmModal} />
        )}
    </form>
  )
}

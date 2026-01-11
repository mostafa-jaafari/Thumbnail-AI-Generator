"use client";
import { createClient } from '@/utils/supabase/client';
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { MdErrorOutline, MdMarkEmailUnread } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Confirm_Email_Modal = ({ setIsOpenConfirmModal }: { setIsOpenConfirmModal: (isOpen: boolean) => void; }) => {
    return (
        <div
            className='absolute left-0 top-0 w-full h-screen overflow-hidden 
                bg-black/20 backdrop-blur-[2px] flex justify-center items-center'
        >
            <div
                className='relative z-1 w-full max-w-[600px] min-w-[250px] 
                    bg-gradient-to-tr from-black to-neutral-900 h-[400px] 
                    rounded-lg p-4 md:p-6 border border-neutral-700/50 shadow-lg 
                    text-white flex flex-col justify-center items-center overflow-hidden'
            >
                <div className='absolute inset-0 translate-x-5/6 translate-y-1/3 w-50 h-60 bg-white/30 opacity-40 blur-3xl -z-1'/>
                <MdMarkEmailUnread size={80} />
                <h3
                    className='font-bold text-3xl capitalize mt-3'
                >
                    Verify your email
                </h3>
                <p
                    className='text-neutral-400 font-light mt-3 mb-1.5'
                >
                    We’ve sent a verification link to your email address.
                </p>
                <p
                    className='text-neutral-400 text-sm font-light'
                >
                    Please check your inbox and confirm to continue.
                </p>
                <button
                    onClick={() => setIsOpenConfirmModal(false)}
                    className='bg-pink-700 rounded-lg hover:bg-pink-700/80 cursor-pointer py-2 px-6 text-sm mt-3'
                >
                    Back to Login
                </button>
            </div>
        </div>
    )
}
export default function AuthForm() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [currentForm, setCurrentForm] = useState<'login' | 'signup'>('login');
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    })
    const [authError, setAuthError] = useState<string>("");
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
    
    const router = useRouter();

    const HandleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoadingAuth(true);
        if(currentForm === "signup"){
            if(inputs.password.trim().length < 6){
                toast.error("Password must be at least 6 characters long.");
                setIsLoadingAuth(false);
                return;
            }
            if(inputs.password.trim() !== inputs.confirmpassword.trim()){
                toast.error("Password and Confirm Password do not match.");
                setIsLoadingAuth(false);
                return;
            }
            if(inputs.password.trim().includes(" ")){
                toast.error("Password cannot contain spaces.");
                setIsLoadingAuth(false);
                return;
            }
            try{
                supabase.auth.signUp({
                    email: inputs.email,
                    password: inputs.password,
                }).then(({ error }) => {
                    if(error){
                        setAuthError(error.message);
                        setIsLoadingAuth(false);
                        return;
                    }
                    setIsOpenConfirmModal(true);
                    setCurrentForm("login");
                    toast.success("Account created successfully. Please log in.");
                })
            }catch (err){
                setAuthError((err as { message: string }).message);
            }finally{
                setIsLoadingAuth(false);
            }
        }else if (currentForm === "login"){
            if(inputs.password.trim().length < 6){
                setAuthError("Password must be at least 6 characters long.")
                return;
            }else{
                setAuthError("")
            }
            if(inputs.email.trim() === "" || inputs.password.trim() === ""){
                setAuthError("Email and Password cannot be empty.");
                return;
            }
            try{
                supabase.auth.signInWithPassword({
                    email: inputs.email,
                    password: inputs.password,
                }).then(({ error }) => {
                    if (error) {
                        setAuthError(error.message);
                    } else {
                        toast.success("Logged in successfully.");
                        router.refresh();
                        router.push('/');
                    }
                })
            }catch (err){
                setAuthError((err as { message: string }).message)
            }finally{
                setIsLoadingAuth(false);
            }
        }
    }

    const HnandleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthError("");
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
                className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200 placeholder:text-neutral-500 placeholder:font-extralight'
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
                className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200 placeholder:text-neutral-500 placeholder:font-extralight'
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
                    className='border border-neutral-800 hover:border-neutral-700 focus:border-pink-700 px-3 py-2 rounded-lg outline-none translate-all duration-200 placeholder:text-neutral-500 placeholder:font-extralight'
                    required
                />
            </motion.div>
        )}
        {/* --- Error Message --- */}
        {authError !== "" && (
            <p
                className='bg-red-600/10 py-2 px-3 rounded-lg border border-red-600/50'
            >
                <span className='text-sm text-red-500 flex items-center gap-1.5'><MdErrorOutline size={18} /> {authError}</span>
            </p>
        )}

        {/* --- Submit Login Button --- */}

        <button
            disabled={authError !== "" || isLoadingAuth}
            className='bg-pink-700 hover:bg-pink-700/90 cursor-pointer
                w-full flex justify-center py-2 rounded-lg
                disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px]
                flex items-center justify-center gap-1.5'
        >
            {isLoadingAuth ? (<AiOutlineLoading3Quarters size={18} className="animate-spin" />) : currentForm === 'login' ? 'Log In' : 'Sign Up'}
        </button>

        {/* --- Upgrade Plan --- */}
        <span
            className='flex items-center gap-1 font-light text-sm'
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

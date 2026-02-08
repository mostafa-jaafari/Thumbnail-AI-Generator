"use client";
import { useUserInfos } from '@/context/UserInfos';
import Image from 'next/image';
import { startTransition, useState } from 'react'
import { toast } from 'sonner';

export const Auth_Button = ({ Provider }: { Provider: "Google" | "Facebook" }) => {
  const { isLoggedIn, setIsLoggedIn } = useUserInfos();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = () => {
    if(isLoggedIn){
      toast.info("You are Already Logged in !")
      return;
    }
    setIsLoading(true)
    const loadingToast = toast.loading(`Logging in with ${Provider}...`);
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsLoggedIn(true);
      toast.dismiss(loadingToast);
      setIsLoading(false)
      toast.success(`Logged in with ${Provider}!`);
    });
    setIsLoggedIn(false);
  }
  
  return (
    <button
      disabled={isLoading || isLoggedIn}
      onClick={handleLogin}
      className="flex items-center justify-center gap-3
        w-full py-2 rounded border cursor-pointer
        disabled:text-neutral-500 disabled:bg-neutral-800
        disabled:cursor-not-allowed disabled:border-neutral-700/60
        border-neutral-700/60 bg-neutral-700/60 hover:bg-neutral-800 text-neutral-300"
    >
      <Image
          src={Provider === "Google" ? "/GoogleIcon.png" : "/FacebookIcon.png"}
          alt={Provider === "Google" ? "Google Icon" : "Facebook Icon"}
          width={20}
          className={`${isLoading ? "opacity-50" : "opacity-100"}`}
          height={20}
          loading='lazy'
      />
      {isLoggedIn ? "Already logged In" : isLoading ? "Login..." : "Continue with Google"}
    </button>
  )
}


export function SignOutButton({ className }: { className?: string; }){  
  const { isLoggedIn, setIsLoggedIn } = useUserInfos();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    if(!isLoggedIn){
      return;
    }
    setIsLoading(true);
    const loadingToast = toast.loading(`Sign Out...`);
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsLoggedIn(false)
      toast.dismiss(loadingToast);
      setIsLoading(false)
      toast.success(`Sign out successfully!`);
    });
  }
  return (
    <button
      disabled={isLoading || !isLoggedIn}
      className={className}
      onClick={handleSignOut}
    >
      SignOut
    </button>
  )
}
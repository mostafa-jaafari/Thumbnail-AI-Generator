"use client";
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useTransition } from 'react'

export function Google_SignIn_Button() {

    const [isPending, startTransition] = useTransition();

    const handleLogin = () => {
    startTransition(async () => {
      const { data, error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `/`,
        },
      });

      if (error) return console.error(error.message);
      if (data.url) window.location.href = data.url;
    });
  };

    return (
        <button
            disabled={isPending}
            onClick={handleLogin}
            className='flex items-center justify-center gap-3 text-white
                bg-pink-700/60 w-full py-2 rounded-lg border border-pink-700
                cursor-pointer hover:bg-pink-700/50
                disabled:text-neutral-400 disabled:bg-neutral-800 disabled:cursor-not-allowed'
        >
            <Image
                src="/GoogleIcon.png"
                alt='Google Icon'
                width={20}
                height={20}
                loading='lazy'
            />
            {isPending ? "login..." : "Continue with Google"}
        </button>
    )
}

export function Facebook_SingIn_Button() {

    const [isPending, startTransition] = useTransition();

    const handleLogin = () => {
    startTransition(async () => {
      const { data, error } = await createClient().auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `/`,
        },
      });

      if (error) return console.error(error.message);
      if (data.url) window.location.href = data.url;
    });
  };

    return (
        <button
            disabled={isPending}
            onClick={handleLogin}
            className='flex items-center justify-center gap-3 text-white
                bg-pink-700/60 w-full py-2 rounded-lg border border-pink-700
                cursor-pointer hover:bg-pink-700/50
                disabled:text-neutral-400 disabled:bg-neutral-800 disabled:cursor-not-allowed'
        >
            <Image
                src="/FacebookIcon.png"
                alt='Facebook Icon'
                width={20}
                height={20}
                loading='lazy'
            />
            {isPending ? "login..." : "Continue with Facebook"}
        </button>
    )
}


export function SignOutButton({ className }: { className?: string; }){
  const supabase = createClient();
  
  const handleSignOut = () => {
    supabase.auth.signOut();
  }

  return (
    <button
      className={className}
      onClick={handleSignOut}
    >
      SignOut
    </button>
  )
}
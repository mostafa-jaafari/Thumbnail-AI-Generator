"use client";

import Image from "next/image";
import Link from "next/link";



export const GlobalLogo = () => {
    return (
        <Link
            href="/"
            className="w-max text-3xl font-extrabold flex items-center gap-2"
        >
            <Image
                src="/LOGO.png" 
                width={32} 
                height={32} 
                alt=''
            />
            <h1 className="flex items-end gap-[1px]">
                Next<span className="text-pink-600">gen</span>
            </h1>
        </Link>
    )
}
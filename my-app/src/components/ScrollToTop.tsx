"use client";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";


export function ScrollToTop(){
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    useEffect(() => {
        const showButton = () => {
            setShowScrollBtn(window.scrollY > 300);
        }
        window.addEventListener('scroll', showButton)
        return () => window.removeEventListener('scroll', showButton);
    },[])

    const HandleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return showScrollBtn && (
        <button
            onClick={HandleScrollToTop}
            className="fixed right-6 bottom-6 bg-pink-700 p-3 rounded-full hover:bg-pink-700/80 cursor-pointer"
        >
            <FaChevronUp size={16}/>
        </button>
    )
}
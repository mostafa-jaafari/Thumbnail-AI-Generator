import Image from "next/image";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";




export default function loading(){
    return (
        <div className="w-full h-screen text-neutral-500 flex gap-1.5 justify-center items-center">
            {/* <AiOutlineLoading3Quarters size={20} className="animate-spin"/> loading... */}
            <Image
                src="/LOGO.png"
                alt="LOGO.png"
                width={50}
                height={50}
                className="animate-pulse"
            />
        </div>
    )
}
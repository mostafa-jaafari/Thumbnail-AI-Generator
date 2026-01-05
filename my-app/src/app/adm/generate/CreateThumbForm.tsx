"use client";
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons';
import { FaChevronDown, FaImage, FaPenFancy, FaRegSquare, FaWandMagicSparkles } from 'react-icons/fa6';
import { HiOutlineCpuChip } from 'react-icons/hi2';
import { ImBold } from 'react-icons/im';
import { LuRectangleHorizontal, LuRectangleVertical } from 'react-icons/lu';


const Thumbnail_Styles = [
    {
        icon: ImBold,
        title: "Bold & Graphic",
        description: "High contrast, bold typography, striking visuals"
    },
    {
        icon: FaRegSquare,
        title: "Minimalist",
        description: "Clean, simple, lots of hite space"
    },
    {
        icon: FaImage,
        title: "Photorealistic",
        description: "Photo-based, natural looking"
    },
    {
        icon: FaPenFancy,
        title: "Illustrated",
        description: "Hand-drawn, artistic, creative"
    },
    {
        icon: HiOutlineCpuChip,
        title: "Tech/Futuristic",
        description: "Modern, sleek, tech-inspired"
    }
];

const colorSchemes = [
  {
    name: "Dark Neon",
    colors: ["#7C3AED", "#22D3EE", "#0F172A"],
  },
  {
    name: "Warm Sunset",
    colors: ["#F97316", "#EF4444", "#7C2D12"],
  },
  {
    name: "Minimal Gray",
    colors: ["#111827", "#6B7280", "#E5E7EB"],
  },
  {
    name: "Cyber Blue",
    colors: ["#0EA5E9", "#22D3EE", "#020617"],
  },
  {
    name: "Forest Nature",
    colors: ["#166534", "#4D7C0F", "#ECFDF5"],
  },
  {
    name: "Royal Luxury",
    colors: ["#4C1D95", "#C084FC", "#1F2933"],
  },
  {
    name: "Ocean Breeze",
    colors: ["#0F766E", "#38BDF8", "#ECFEFF"],
  },
  {
    name: "Soft Pastel",
    colors: ["#FBCFE8", "#A5B4FC", "#F8FAFC"],
  },
];



const DropDownStyles = ({ closeDropDown }: { closeDropDown: (description: string, title: string, icon: IconType) => void; }) => {
    return (
        <div
            className='absolute left-0 bottom-full w-full rounded-lg 
                min-h-40 bg-neutral-900 border border-neutral-800 
                overflow-hidden
                '
        >
            {Thumbnail_Styles.map((style, idx) => {
                return (
                    <div
                        role='button'
                        key={idx}
                        onClick={() => {
                            closeDropDown(style.description, style.title, style.icon);
                        }}
                        className={`relative group w-full space-y-1.5 text-sm 
                            bg-black/30 backdrop-blur-md text-start
                            border-neutral-700 px-3 py-2 cursor-pointer 
                            hover:bg-neutral-900/40
                            ${Thumbnail_Styles.length - 1 !== idx ? "border-b" : ""}
                        `}
                    >
                        <span
                            className='flex items-center gap-3'
                        >
                            <style.icon size={18}/>
                            <h1
                                className='max-w-[200px] truncate'
                            >
                                {style.title}
                            </h1>
                        </span>
                        <p
                            className='text-gray-500 text-xs'
                        >
                            {style.description}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
export function CreateThumbForm() {
    const [inputs, setInputs] = useState({
        topic: "",
        aspectRatio: "16:9",
        thumbnailStyle: {
            icon: ImBold,
            title: "Bold & Graphic",
            description: "High contrast, bold typography, striking visuals"
        },
        colorScheme: {
            name: "Dark Neon",
            colors: ["#7C3AED", "#22D3EE", "#0F172A"],
        },
        additionalPrompts: "",
    });

    const ThumbnailStyleRef = useRef<HTMLDivElement | null>(null)
    const [isThumbnailStyleOpen, setIsThumbnailStyleOpen] = useState(false);

    const HandleChangeInputs = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        })
    }

    const HandleSelectAspectRatio = (e: React.MouseEvent<HTMLButtonElement>, rat: string) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            aspectRatio: rat
        })
    }
    const HandleAddColorScheme = (schemeColors: string[], schemeName: string) => {
        setInputs({
            ...inputs,
            colorScheme: {
                colors: schemeColors,
                name: schemeName
            }
        })
    }
    
    const HandleSubmitForm = () => {
        // 
    }

    const HandleCloseDropDownMenu = (description: string, title: string, icon: IconType) => {
        setInputs({
            ...inputs,
            thumbnailStyle: {
                description,
                icon,
                title
            }
        })
    }

    useEffect(() => {
        const hideDropDonMenu = (e: MouseEvent) => {
            if(ThumbnailStyleRef.current && !ThumbnailStyleRef.current.contains(e.target as Node)){
                setIsThumbnailStyleOpen(false);
            }
        }
        document.addEventListener("mousedown", hideDropDonMenu)
        return () => document.removeEventListener("mousedown", hideDropDonMenu)
    },[])
    const Max_Topic_Length = 100;
    const Max_Additional_Prompts_Length = 115;
    return (
        <form
            onSubmit={HandleSubmitForm}
            className='mt-6'
        >

            {/* --- TOPIC or TITLE --- */}
            <div
                className='w-full flex flex-col items-start'
            >
                <label 
                    htmlFor="TitleOrTopic"
                    className='mb-1 cursor-pointer'
                >
                    Title or Topic
                </label>
                <input
                    id='TitleOrTopic'
                    type="text"
                    value={inputs.topic}
                    name='topic'
                    onChange={HandleChangeInputs}
                    placeholder='Enter Type or Topic here...'
                    maxLength={Max_Topic_Length}
                    className='w-full text-sm px-3 py-2.5 placeholder:text-neutral-600 
                        rounded-lg outline-none bg-neutral-900/30 backdrop-blur-md 
                        border border-neutral-700 hover:bg-neutral-900/40 
                        focus:bg-neutral-900/40 font-light'
                />
                <span
                    className='w-full flex justify-end text-xs font-extralight mt-1'
                >
                    {inputs.topic.length}/{Max_Topic_Length}
                </span>
            </div>

            {/* --- ASPECT RATIO --- */}
            <h1
                className='my-2'
            >
                Aspect Ratio
            </h1>
            <div
                className='w-full grid grid-cols-3 gap-1.5'
            >
                {[{size: "16:9", icon: LuRectangleHorizontal}, {size: "1:1", icon: FaRegSquare}, {size: "9:16", icon: LuRectangleVertical}].map((rat, idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => HandleSelectAspectRatio(e, rat.size as string)}
                            className={`w-full py-2.5 flex items-center 
                                gap-1.5 justify-center text-sm
                                border backdrop-blur-md rounded-lg
                                ${inputs.aspectRatio === rat.size ? "border-2 border-pink-700 bg-pink-900/20 text-pink-600" : "font-light text-neutral-300 cursor-pointer bg-neutral-900/30 border-neutral-700 "}`}
                        >
                           <rat.icon size={24}/> {rat.size}
                        </button>
                    )
                })}
            </div>

            {/* --- THUMBNAIL STYLE --- */}
            <div
                ref={ThumbnailStyleRef}
                className='w-full mb-2 mt-6'
            >
                <h1>
                    Thumbnail Style
                </h1>
                <div
                    role='button'
                    onClick={(e) => {
                        e.preventDefault();
                        setIsThumbnailStyleOpen(!isThumbnailStyleOpen)
                    }}
                    className='relative group w-full space-y-1.5 mt-3 text-sm 
                        text-start bg-neutral-900/30 backdrop-blur-md border 
                        border-neutral-700 px-3 py-2 rounded-lg cursor-pointer 
                        hover:bg-neutral-900/40'
                >
                    <div
                        className='flex items-center justify-between gap-2'
                    >
                        <span
                            className='flex items-center gap-3'
                        >
                            <inputs.thumbnailStyle.icon size={18}/>
                            <h1
                                className='max-w-[200px] truncate'
                            >
                                {inputs.thumbnailStyle.title}
                            </h1>
                        </span>
                        <FaChevronDown className='group-hover:text-neutral-300 text-neutral-500 transition-colors duration-200' size={14}/>
                    </div>
                    <p
                        className='text-gray-500 text-xs'
                    >
                        {inputs.thumbnailStyle.description}
                    </p>

                    {isThumbnailStyleOpen && (
                        <DropDownStyles closeDropDown={HandleCloseDropDownMenu} />
                    )}
                </div>
            </div>

            {/* --- COLOR SCHEME --- */}
            <h1
                className='mt-6 mb-3'
            >
                Color Scheme
            </h1>

            <div
                className='flex flex-wrap justify-between items-center gap-1'
            >
                {colorSchemes.map((scheme) => (
                    <div 
                        key={scheme.name}
                        role='button'
                        onClick={() => HandleAddColorScheme(scheme.colors, scheme.name)}
                        className={`flex rounded-lg overflow-hidden border-2
                        ${inputs.colorScheme.name === scheme.name ? "border-pink-700" : "hover:border-pink-700/20 cursor-pointer border-transparent" }`}>
                        {scheme.colors.map((color, i) => (
                        <div
                            key={i}
                            style={{ backgroundColor: color }}
                            className="w-7 h-10"
                        />
                        ))}
                    </div>
                ))}
            </div>

            {/* --- ADDITIONAL PROMPT INPUT --- */}
            <div
                className='mt-6 flex flex-col space-y-1.5'
            >
                <label 
                    htmlFor="AdditionalPrompts"
                    className=''
                >
                    Additional Prompts <span className='text-sm text-gray-500'>(optional)</span>
                </label>
                <textarea
                    id='AdditionalPrompts'
                    name='additionalPrompts'
                    value={inputs.additionalPrompts}
                    onChange={HandleChangeInputs}
                    placeholder='Ex: dark background, neon pink text, ...'
                    maxLength={Max_Additional_Prompts_Length}
                    className='w-full h-20 flex items-start text-sm px-3 py-2.5 placeholder:text-neutral-600 
                        rounded-lg outline-none bg-neutral-900/30 backdrop-blur-md 
                        border border-neutral-700 hover:bg-neutral-900/40 
                        focus:bg-neutral-900/40 font-light resize-none'
                />
            </div>

            <button
                className='w-full flex items-center gap-1.5 justify-center 
                    bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-700 
                    rounded-lg py-3 text-center mt-6 cursor-pointer text-sm'
            >
               <FaWandMagicSparkles size={16}/> Generate Thumbnail
            </button>
        </form>
    )
}

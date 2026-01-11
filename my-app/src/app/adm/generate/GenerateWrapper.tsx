"use client";
import { FaImage } from "react-icons/fa6";
import { CreateThumbForm } from "./CreateThumbForm";
import { useState } from "react";
import { toast } from "sonner";
import { generateThumbnailAction } from "@/app/actions/generateThumbnailAction";
import Image from "next/image";
import { ImBold } from "react-icons/im";


export function GenerateWrapper({ User_Credits }: { User_Credits: number; Topic: string; Aspect_Ratio: string; ThumbnailStyle_Title: string; ThumbnailStyle_Description: string; ColorScheme_Name: string; ColorScheme_Colors: string[]; AdditionalPrompt?: string }) {
    const [thumbnailSize, setThumbnailSize] = useState("");

    const [inputs, setInputs] = useState({
        topic: "",
        aspectRatio: {
            size: "16:9",
            w: 1280,
            h: 720
        },
        thumbnailStyle: {
            icon: ImBold,
            title: "Bold & Graphic",
            description: "High contrast, bold typography, striking visuals"
        },
        colorScheme: {
            name: "Dark Neon",
            colors: ["#7C3AED", "#22D3EE", "#0F172A"],
        },
        additionalPrompt: "",
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const HandleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation
        if (!inputs.topic.trim()) {
            toast.error("Please enter a topic.");
            return;
        }

        if (User_Credits <= 0) {
            toast.error("You don't have enough credits to generate a thumbnail.");
            return;
        }

        setIsGenerating(true);
        setGeneratedImage(null); // Clear previous image

        try {
            // 2. Call the Server Action
            const response = await generateThumbnailAction(
                inputs.topic,
                inputs.aspectRatio.size,
                {
                    title: inputs.thumbnailStyle.title,
                    description: inputs.thumbnailStyle.description,
                },
                {
                    name: inputs.colorScheme.name,
                    colors: inputs.colorScheme.colors,
                },
                inputs.additionalPrompt || '',
            )

            // 3. Set the image (Response is a Base64 string from our previous fix)
            setGeneratedImage(response);
            
            // 4. TODO: Deduct Credits here!
            // await deductCreditAction(); 
            // toast.success("Thumbnail generated! 1 Credit used.");

        } catch (err) {
            console.error(err);
            toast.error((err as { message: string; }).message || "Something went wrong")
        } finally {
            setIsGenerating(false);
        }
    }
    return (
        <section
            className='w-full h-screen lg:px-36 md:px-6 px-3'
        >
            <div className='absolute inset-0 -z-1 translate-y-1/6 translate-x-3/6 w-120 h-80 bg-pink-700 rounded-full opacity-10 blur-3xl'/>
            
            <div
                className='flex lg:flex-row lg:items-start lg:justify-between justify-center items-center flex-col gap-3'
            >
                <div
                    className='relative overflow-hidden lg:w-3/8 max-w-[450px] w-full min-h-160 p-6 flex-shrink-0 border border-neutral-800 rounded-2xl bg-white/5 backdrop-blur-sm'
                >
                    {generatedImage ? (
                        <div
                            className='absolute left-0 top-0 z-50 flex 
                                justify-center items-center bg-neutral-900/90 
                                w-full h-full'
                        >
                            <button
                                disabled={!generatedImage}
                                onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                    setGeneratedImage(null);
                                    setInputs({
                                        topic: "",
                                        aspectRatio: {
                                            size: "16:9",
                                            w: 1280,
                                            h: 720
                                        },
                                        thumbnailStyle: {
                                            icon: ImBold,
                                            title: "Bold & Graphic",
                                            description: "High contrast, bold typography, striking visuals"
                                        },
                                        colorScheme: {
                                            name: "Dark Neon",
                                            colors: ["#7C3AED", "#22D3EE", "#0F172A"],
                                        },
                                        additionalPrompt: "",
                                    })
                                }}
                                className="text-sm px-6 py-2 rounded-full bg-white hover:bg-white/80 text-neutral-800 cursor-pointer"
                            >
                                Generate new Thumbnail
                            </button>
                        </div>
                    ) : ""}
                    <span
                        className='space-y-1.5'
                    >
                        <h1
                            className='text-2xl font-bold capitalize'
                        >
                            Create Your Thumbnail
                        </h1>
                        <p
                            className='text-gray-500 text-sm '
                        >
                            Describe your vision and let AI bring it to life
                        </p>
                    </span>
                    <CreateThumbForm setInputs={setInputs} inputs={inputs} isGenerating={isGenerating} HandleSubmitForm={HandleSubmitForm} setThumbnailSize={setThumbnailSize} />
                </div>

                <div
                    className='w-full p-6 h-max border border-neutral-800 rounded-2xl bg-white/5 backdrop-blur-sm'
                >
                    <h2
                    className='text-xl font-semibold'
                    >
                    Preview
                    </h2>

                    <div
                    style={{
                        height: `${thumbnailSize === "16:9" ? 320 : thumbnailSize === "1:1" ? 500 : thumbnailSize === "9:16" ? 700 : 320}px`
                    }}
                    className='w-full overflow-hidden mt-1.5 flex flex-col 
                        justify-center items-center rounded-2xl border 
                        border-dashed border-neutral-500 bg-neutral-900/30 backdrop-blur-sm'
                    >
                        {isGenerating ? "Loading..." : generatedImage !== null ? (
                            <Image
                                src={generatedImage}
                                alt="Generated Thumbnail"
                                fill
                                className="object-cover"
                                quality={100}
                                loading="eager"
                            />
                        ) : (
                            <div
                                className="flex flex-col items-center"
                            >
                                <span
                                    className='bg-white/15 text-neutral-300 p-3 flex rounded-full w-max'
                                >
                                    <FaImage size={30} />
                                </span>
                                <h1
                                    className='font-semibold mt-3'
                                >
                                    Generate your first thumbnail
                                </h1>
                                <p
                                    className='text-neutral-500 text-sm mt-1.5'
                                >
                                    Create a thumbnail to see a preview here
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
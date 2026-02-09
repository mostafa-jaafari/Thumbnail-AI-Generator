import Link from 'next/link';
import React from 'react'
import { GlobalLogo } from './GlobaleLogo';



const FooterSections = [
    {title: "product", routes: [{name: "home", href: "home"}, {name: "support", href: "support"}, {name: "pricing", href: "pricing"}, {name: "affiliate", href: "affiliate"}]},
    {title: "ressources", routes: [{name: "company", href: "company"}, {name: "blogs", href: "blogs"}, {name: "community", href: "community"}, {name: "careers", href: "careers"}, {name: "about", href: "about"}]},
    {title: "legal", routes: [{name: "privacy", href: "privacy"}, {name: "legal", href: "legal"}]}
];
export default function Footer() {
  return (
    <div
        className='min-h-60 w-full grid grid-cols-1 items-center md:grid-cols-5 border-t border-neutral-900'
    >
        <div
            className='w-full h-full py-12 col-span-1 flex justify-center items-start'
        >
        <GlobalLogo />
        </div>
        <div
            className='w-full col-span-3 flex mb-6 md:mb-0'
        >
            {FooterSections.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        className='w-full flex flex-col items-center gap-1.5 text-sm'
                    >
                        <b className='capitalize text-md'>
                            {item.title}
                        </b>
                        <ul
                            className='flex flex-col gap-1.5'
                        >
                            {item.routes.map((route, id) => {
                                return (
                                    <Link
                                        key={id}
                                        className='w-max hover:text-gray-400 text-gray-500'
                                        href={route.href}
                                    >
                                        {route.name}
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
        <div
            className='col-span-1 text-center p-3'
        >
            <p
                className='text-gray-500 text-sm mb-6'
            >
                Making every customer feel valued no matter 
                the size of your audience.
            </p>
            <span
                className='text-xs text-gray-200'
            >
                &copy; {new Date().getFullYear()} NextGen
            </span>
        </div>
    </div>
  )
}

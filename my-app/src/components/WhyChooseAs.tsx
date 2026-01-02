import { LucideIcon, Zap } from 'lucide-react'


const FeaturedCardItems = [
    {Icon: Zap, title: "Smart Analysis", description: "Our AI analyzes video content to suggest the most clickable concepts."},
    {Icon: Zap, title: "Fully Editable", description: "Get fully layered designs you can tweak to perfection if needed."},
    {Icon: Zap, title: "Eye-Catching Designs", description: "Generate vibrant, high-contrast thumbnails that stand out in the feed."}

];

const FeaturedCard = ({ Icon, Title, Description }: { Icon: LucideIcon; Title: string; Description: string;  }) => {
    return (
        <div
            className='p-6 space-y-3 bg-pink-700/10 ring ring-pink-700 border-b border-pink-600 w-full min-h-50 rounded-2xl'
        >
            <Icon size={36} className='text-pink-200'/>
            <h1
                className='font-bold text-xl text-pink-700'
            >
                {Title}
            </h1>
            <p
                className='text-gray-500 text-sm'
            >
                {Description}
            </p>
        </div>
    )
}

export default function WhyChooseAs() {
  return (
    <div className='w-full lg:px-36 md:px-6 px-3 mt-12 flex flex-col items-center gap-24'>
        <div
            className='flex flex-col items-center'
        >
            <span
            className='bg-pink-700/10 border border-pink-700 rounded-full px-8 py-2 text-pink-700'
            >
                Featured
            </span>
            <h1
                className='text-3xl font-bold mt-6 mb-3'
            >
                Why use our generator?
            </h1>
            <p
                className='text-sm text-gray-500'
            >
                Create stunning thumbnails that get clicks, without the hassle.
            </p>
        </div>
        
        <div
            className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6'
        >
            {FeaturedCardItems.map((item, idx) => {
                return (
                    <FeaturedCard 
                        key={idx}
                        Icon={Zap}
                        Title={item.title}
                        Description={item.description}
                    />
                )
            })}
        </div>
    </div>
  )
}

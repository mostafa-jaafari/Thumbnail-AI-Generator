import Link from "next/link";
import { FaFaceFrown } from "react-icons/fa6";



export default function NotFoundPage() {
  return (
    <div className="w-full h-screen space-y-3 flex flex-col justify-center items-center">
      <FaFaceFrown size={60}/>
      <h1 className="text-2xl font-semibold">Oops! Page not found</h1>
      <p className="text-neutral-500">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="underline">Go back home</Link>
    </div>
  );
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white text-black">
            <div className="relative">
                <h1 className="text-[180px] md:text-[220px] font-black tracking-tighter leading-none text-black opacity-5">
                    404
                </h1>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <div className="w-16 h-[1px] bg-black mb-8"></div>
                    <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase">Page Not Found</h2>
                    <div className="w-16 h-[1px] bg-black mt-8"></div>
                </div>
            </div>

            <p className="mt-6 text-sm text-gray-600 max-w-md text-center px-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                href="/"
                className="mt-12 group flex items-center border border-black py-2 px-6 text-sm hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                RETURN HOME
            </Link>
        </div>
    )
}

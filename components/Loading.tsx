/* eslint-disable @next/next/no-img-element */

export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white text-black dark:bg-gray-900 dark:text-white">
            <img src="/loading.gif" alt="Loading..." className="w-12 h-12" />
        </div>
    )
}


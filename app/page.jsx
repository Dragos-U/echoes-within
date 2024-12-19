import {auth} from "@clerk/nextjs/server";
import {greatVibes, outfit} from "@/fonts/fonts";
import Link from "next/link";

export default async function LandingPage() {
    const {userId} = await auth();

    let href = userId ? '/journal' : '/new-user';

    return (
        <div className={`
              w-screen
              h-screen
              bg-gradient-to-br from-black via-gray-900 to-blue-900
              flex
              justify-center
             items-center
             text-white
             ${outfit.className}`}>
            <div className={`
                w-full 
                max-w-md
                mx-auto
                text-center`}>
                <h1 className={` 
                    text-4xl
                    md:text-5xl
                    mb-6
                    py-2
                    text-transparent 
                    bg-clip-text 
                    bg-gradient-to-r from-blue-400 to-purple-400 
                    ${greatVibes.className}`}>
                    Echoes-within Journal
                </h1>
                <p className={`
                    mb-8
                    px-4
                    text-lg
                    text-gray-300
                    max-w-sm
                    mx-auto
                    leading-relaxed`}>
                    Discover patterns in your emotional well-being with AI-powered journaling. Track your moods, gain insights, and understand yourself better with each entry.
                </p>
                <Link href={href}>
                    <button className={`
                        bg-blue-500 
                        px-6 
                        py-3 
                        rounded-xl
                        shadow-md
                        hover:bg-blue-600
                        transition-transform
                        hover:scale-105`}>
                        Get Started
                    </button>
                </Link>
                <p className={`
                    text-l 
                    text-gray-400
                    mt-8
                    px-3`}>
                    Start your journey of self-discovery today
                </p>
            </div>
        </div>);
}
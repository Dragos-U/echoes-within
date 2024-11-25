import Link from "next/link";

export default function Home() {
    return (
        <div className={'w-screen h-screen bg-black flex justify-center items-center text-white'}>
            <div className={'w-full max-w-[300px] mx-auto'}>
                <h1 className={' text-2xl mb-4'}>
                    The Emotional Journal
                </h1>
                <p className={'mb-4'}>Write your thoughts and let AI help you estimate and track the mood changes you are going through.</p>
                <Link href='/journal'>
                    <button className={'bg-blue-500 px-4 py-2 rounded-xl'}>Get Started</button>
                </Link>
            </div>
        </div>
    );
}

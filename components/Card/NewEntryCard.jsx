'use client'

import {createNewEntry} from '@/services/apiService';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function NewEntryCard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleOnClick() {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const data = await createNewEntry();
            if (data?.id) {
                router.push(`/journal/${data.id}`);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className={`
                cursor-pointer
                overflow-hidden
                rounded-lg
                bg-white
                shadow-md
                hover:shadow-lg
                border border-gray-100
                transition-all
                duration-200
                hover:scale-[1.02]
                group
                relative
            `}
            onClick={handleOnClick}>
            <div className='px-4 py-10 flex items-center justify-center'>
                {isLoading ? (
                    <div className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center space-y-2'>
                        <span className='text-4xl group-hover:scale-110 transition-transform duration-200'>
                            ✏️
                        </span>
                        <span className='text-2xl text-gray-700 font-medium group-hover:text-gray-900'>
                            New Entry
                        </span>
                    </div>
                )}
            </div>
            {!isLoading && (
                <div
                    className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'/>
            )}
        </div>
    );
}
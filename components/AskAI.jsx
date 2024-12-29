'use client'

import {useState} from 'react';
import {askQuestion} from '@/services/apiService';

export default function AskAI() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    function onChange(e) {
        setValue(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const answer = await askQuestion(value);
        setResponse(answer);
        setValue('')
        setLoading(false);
    }

    return (
        <div className="space-y-4">
            <form
                onSubmit={handleSubmit}
                className='flex gap-3'>
                <input
                    disabled={loading}
                    value={value}
                    onChange={onChange}
                    type='text'
                    placeholder='Ask your journal...'
                    className={`
                        flex-1 
                        px-4 
                        py-2 
                        rounded-lg
                        border 
                        border-gray-200
                        bg-white 
                        shadow-sm
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        focus:border-transparent
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    `}
                />
                <button
                    disabled={loading}
                    type='submit'
                    className={`
                        px-6
                        py-2 
                        bg-blue-500 
                        hover:bg-blue-600 
                        text-white 
                        rounded-lg
                        shadow-sm
                        transition-colors
                        duration-200
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    `}>
                    Ask
                </button>
            </form>

            {loading && (
                <div className={`
                    animate-[fadeIn_0.6s_ease-in-out]
                    p-4
                    rounded-lg
                    bg-white
                    shadow-sm
                    border
                    border-gray-200
                `}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                    </div>
                </div>
            )}

            {response && (
                <div className={`
                    animate-[fadeIn_0.6s_ease-in-out]
                    divide-y
                    divide-gray-200
                    overflow-hidden
                    rounded-lg
                    bg-white
                    shadow-sm
                    border
                    border-gray-200
                `}>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm text-gray-500">AI Response</p>
                                <p className="text-gray-700">{response}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
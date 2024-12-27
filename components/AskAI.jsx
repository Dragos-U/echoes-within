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
        <div>
            <form
                onSubmit={handleSubmit}
                className='flex gap-3'>
                <input
                    disabled={loading}
                    value={value}
                    onChange={onChange}
                    type='text'
                    placeholder='Ask your journal...'
                className='flex-1 border border-black/20 px-4 py-2 rounded-lg'
                />
                <button
                    disabled={loading}
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg '>
                    Ask
                </button>
            </form>
            {loading && <div>...loading</div>}
            {response && <div>{response}</div>}
        </div>
    )
}
'use client'

import {useState} from "react";
import {askQuestion} from "@/services/apiService";

export default function Question() {
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
                    placeholder='Ask a question'
                className='border border-black/20 px-4 py-2 rounded-lg'
                />
                <button
                    disabled={loading}
                    type='submit'
                    className='bg-blue-400 px-4 py-2 rounded-lg '>
                    Ask
                </button>
            </form>
            {loading && <div>...loading</div>}
            {response && <div>{response}</div>}
        </div>
    )
}
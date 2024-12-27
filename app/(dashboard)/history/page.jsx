import SentimentChart from '@/components/SentimentChart';
import {getData} from '@/services/journalService';

export default async function History() {
    const {analyses, avg} = await getData();

    return (
        <div className={`
            min-h-screen 
            p-4
            sm:p-6 
            bg-indigo-50`}>
            <div className='max-w-7xl mx-auto space-y-8'>
                <div className={`
                    bg-white 
                    rounded-xl 
                    shadow-sm 
                    p-3
                    sm:p-6
                    border 
                    border-gray-200`}>
                    <div className='flex items-center space-x-4'>
                        <div className='p-3 bg-blue-50 rounded-lg'>
                            <span className='text-blue-600 text-lg'>
                                📊
                            </span>
                        </div>
                        <div>
                            <p className='text-m text-gray-500'>
                                Average Sentiment
                            </p>
                            <p className='text-xl font-semibold text-gray-800'>
                                {avg}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`
                    bg-white 
                    rounded-xl 
                    shadow-sm 
                    border 
                    border-gray-200 
                    p-0
                    sm:p-6`}>
                    <div className='h-[400px]'>
                        <SentimentChart data={analyses}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
import SentimentChart from "@/components/SentimentChart";
import {getData} from "@/services/journalService";

export default async function History() {
    const {analyses, avg} = await getData();

    return (
        <div className='w-full h-full'>
            <div>{`Average sentiment: ${avg}`}</div>
            <div className='w-full h-full'>
                <SentimentChart data={analyses}/>
            </div>
        </div>
    )
}

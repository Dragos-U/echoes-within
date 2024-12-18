import Link from "next/link";
import {Great_Vibes} from "next/font/google";
import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import Question from "@/components/Question";
import {getEntries} from "@/services/journalService"

const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: ['400']
})

export default async function JournalPage() {
    const entries = await getEntries();

    return (
        <div className='p-4 bg-zinc-400/20'>
            <h1 className={`text-4xl ${greatVibes.className}`}>
                Echoes-within Journal
            </h1>
            <div className='my-4'>
                <Question/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4'>
                <NewEntryCard/>
                {entries.map(entry =>
                    <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <EntryCard entry={entry}/>
                    </Link>
                )}
            </div>
        </div>
    )
}
import Link from 'next/link';
import {greatVibes} from '@/fonts/fonts';
import NewEntryCard from '@/components/Card/NewEntryCard';
import EntryCard from '@/components/Card/EntryCard';
import AskAI from '@/components/AskAI';
import {getEntries} from '@/services/journalService'

export const dynamic = 'force-dynamic';
export default async function JournalPage() {
    const entries = await getEntries();

    return (
        <div className={`
            min-h-screen
            w-full
            p-4
            bg-indigo-50`}>
            <h1 className={`
                text-4xl
                ${greatVibes.className}`}>
                Echoes-within Journal
            </h1>
            <div className='my-4 '>
                <AskAI/>
            </div>
            <div className={`
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-4
                gap-4`}>
                <NewEntryCard/>
                {entries.map(
                    entry =>
                        <Link
                            href={`/journal/${entry.id}`}         key={entry.id}>
                            <EntryCard entry={entry}/>
                        </Link>)}
            </div>
        </div>)
}
import Editor from '@/components/Editor'
import {getEntry} from "@/services/journalService"

export default async function EntryPage({params}) {
    const {id} = await params;
    const entry = await getEntry(id);

    return (
        <div className='h-full w-full'>
                <Editor entry={entry}/>
        </div>
    )
}
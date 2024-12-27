import Editor from '@/components/Editor'
import {getEntry} from '@/services/journalService'

export default async function EntryPage({params}) {
    const {id} = await params;
    const entry = await getEntry(id);

    return (
        <div className='min-h-screen bg-white'>
            <Editor entry={entry}/>
        </div>
    )
}
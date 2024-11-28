import Editor from '@/components/Editor'
import getUserByClerkId from "@/utils/auth";
import {prisma} from "@/utils/db";

async function getEntry(id) {
    const user = await getUserByClerkId();
    return await prisma.JournalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }
        }
    })
}

export default async function EntryPage({params}) {
    const {id} = await params;
    const entry = await getEntry(id)
    const analysisData =[
        {name: 'Subject', value:''},
        {name: 'Summary', value:''},
        {name: 'Mood', value:''},
        {name: 'Negative', value: 'False'},
    ]

    return (
        <div className='h-full w-full grid grid-cols-3'>
            <div className='col-span-2 '>
                <Editor entry={entry}/>
            </div>
            <div className='border-l border-b/3 '>
                <div className='bg-blue-200 px-6 py-10'>
                <h2>Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map(item => (
                            <li key={item.name}
                                className='flex items-center justify-between px-2 py-2 border-b border-t border-b/10'>
                                <span className='text- l font-semibold'>{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
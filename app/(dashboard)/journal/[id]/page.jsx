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
        },
        include: {
            analysis: true
        }
    })
}

export default async function EntryPage({params}) {
    const {id} = await params;
    const entry = await getEntry(id);

    return (
        <div className='h-full w-full'>
                <Editor entry={entry}/>
        </div>
    )
}
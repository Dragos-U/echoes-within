import getUserByClerkId from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
import {analyzeEntry} from "@/services/ai";

export async function POST(){
    const user = await getUserByClerkId();
    const entry = await prisma.journalEntry.create({
         data: {
             userId: user.id,
             content: 'Write about your day '
         }
    })
    const analysis = await analyzeEntry(entry.content)

    if (analysis) {
        analysis.negative = analysis.negative.toLowerCase() === 'yes';
    }

    await prisma.analysis.create({
        data:{
            userId: user.id,
            entryId: entry.id,
            ...analysis//(analysis || {})
        }
    })

    revalidatePath('/journal')
    return NextResponse.json({data:entry});
 }

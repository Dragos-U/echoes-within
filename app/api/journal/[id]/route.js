import getUserByClerkId from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import {analyzeEntry} from "@/services/ai";

export async function PATCH(request, {params}) {
    const {id} = await params;
    const {content} = await request.json();
    const user = await getUserByClerkId();
    const updatedEntry = await prisma.JournalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: id
            }
        },
        data: {
            content
        }
    })

    const analysis = await analyzeEntry(content)
    if (analysis) {
        analysis.negative = analysis.negative.toLowerCase() === 'yes';
    }
    const savedAnalysis = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        update: {...analysis},
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
    })

    return NextResponse.json({data: {... updatedEntry, analysis: savedAnalysis}})
}
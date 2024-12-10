import getUserByClerkId from "@/utils/auth";
import {questionAnalysis} from "@/services/ai";
import {NextResponse} from "next/server";

export async function POST(request) {
    const {question} = await request.json();
    const user = await getUserByClerkId();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true
        }
    })

    const answer = await questionAnalysis(question, entries);

    return NextResponse.json({data: answer});
}
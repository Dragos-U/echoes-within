import getUserByClerkId from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";

export async function PATCH(request, {params}){
    const {id} = await params;
    const {content} = await request.json();
    const user = await getUserByClerkId();
    try {
        const updatedEntry = await prisma.JournalEntry.update({
            where:{
                userId_id:{
                    userId: user.id,
                    id: id
                }
            },
            data:{
                content
            }
        })
        return NextResponse.json({data: updatedEntry})
    } catch (error) {
        console.log(`Error updating entry: ${error}`);
        return NextResponse.json({error: 'Failed to update entry', status: 500});
    }

}
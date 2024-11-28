import {prisma} from "@/utils/db";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

async function createNewUser() {
    let existingUser = await currentUser();

    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: existingUser.id,
        }
    })

    if (!dbUser) {
        await prisma.user.create({
            data: {
                clerkId: existingUser.id,
                email: existingUser?.emailAddresses[0].emailAddress,
            }
        })
    }
    redirect('/journal');
}

export default async function NewUser() {
    await createNewUser();
    return <h1>...Loading </h1>
}
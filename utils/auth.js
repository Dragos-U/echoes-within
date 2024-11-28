import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/utils/db";

export default async function getUserByClerkId(options = {}) {
    const {userId} = await auth();

    return await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId,
        },
        select : options.select || undefined,
        includes : options.includes || undefined
    });
}
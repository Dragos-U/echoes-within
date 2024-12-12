import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/utils/db";

/**
 * Fetches a user from the database using their Clerk ID.
 * @param {Object} options - Options for selecting specific fields or including related data.
 * @param {Object} options.select - Fields to select from the user record.
 * @param {Object} options.include - Related data to include with the user record.
 * @returns {Promise<Object>} The user object from the database.
 * @throws Will throw an error if the user is not found or if authentication fails.
 */
export default async function getUserByClerkId(options = {}) {
    try {
        const {userId} = await auth();

        return await prisma.user.findUniqueOrThrow({
            where: {
                clerkId: userId,
            },
            select: options.select || undefined,
            includes: options.includes || undefined
        });
    } catch (error) {
        console.error('Error fetching user by Clerk ID:', error);
        throw error;
    }
}
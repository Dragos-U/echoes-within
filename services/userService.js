import {prisma} from "@/utils/db";
import {currentUser} from "@clerk/nextjs/server";

/**
 * Creates a new user in the database if they don't already exist.
 * Uses Clerk's currentUser to get authentication details and creates
 * a corresponding user record in the local database.
 *
 * @async
 * @function createNewUserIfNotExists
 *
 * @throws {Error} If Clerk user data cannot be retrieved
 * @throws {Error} If database operations fail
 * @throws {Error} If user has no email address
 *
 * @example
 * try {
 *   await createNewUserIfNotExists();
 *   // User is now in database
 * } catch (error) {
 *   console.error('Failed to create user:', error);
 * }
 *
 * @returns {Promise<void>}
 *
 * @flow
 * 1. Gets current user from Clerk
 * 2. Checks if user exists in local database
 * 3. If not found, creates new user record
 *
 * @database Creates a user with:
 * - clerkId: string (from Clerk authentication)
 * - email: string (first email from Clerk user)
 */
export async function createNewUserIfNotExists() {
    const existingUser = await currentUser();
    console.log(existingUser);
    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: existingUser.id,
        }
    })
    console.log(dbUser);
    if (!dbUser) {
        await prisma.user.create({
                data: {
                    clerkId: existingUser.id,
                    email: existingUser.emailAddresses[0].emailAddress,
                }
            }
        )
    }
}
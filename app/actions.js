'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/utils/db'
import getUserByClerkId from '@/services/authService'

export async function deleteEntry(id) {
    try {
        const user = await getUserByClerkId()

        await prisma.analysis.deleteMany({
            where: {
                entryId: id,
                userId: user.id
            }
        })

        await prisma.JournalEntry.delete({
            where: {
                userId_id: {
                    userId: user.id,
                    id: id
                }
            }
        })

        revalidatePath('/journal')
        return { success: true }
    } catch (error) {
        console.error('Delete error:', error)
        throw new Error('Failed to delete entry')
    }
}
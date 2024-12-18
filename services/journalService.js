import {prisma} from "@/utils/db";
import getUserByClerkId from "@/services/authService";

/**
 * Creates a new journal entry in the database.
 *
 * @async
 * @param {string} userId - The ID of the user creating the entry
 * @param {string} content - The content of the journal entry
 * @returns {Promise<Object>} The created journal entry
 * @throws {Error} If database operation fails
 *
 * @example
 * const entry = await createJournalEntry('user123', 'Today was amazing...');
 */
export async function createJournalEntry(userId, content) {
    return prisma.journalEntry.create({
        data: {userId, content}
    });
}

/**
 * Creates an analysis record for a journal entry.
 *
 * @async
 * @param {string} userId - The ID of the user who owns the entry
 * @param {string} entryId - The ID of the journal entry being analyzed
 * @param {Object} analysis - The analysis data
 * @returns {Promise<Object>} The created analysis record
 * @throws {Error} If database operation fails
 *
 * @example
 * const analysis = await createAnalysis('user123', 'entry456', {
 *   mood: 'happy',
 *   sentiment: 0.8
 * });
 */
export async function createAnalysis(userId, entryId, analysis) {
    return prisma.analysis.create({
        data: {userId, entryId, ...analysis}
    });
}

/**
 * Retrieves a specific journal entry with its analysis.
 *
 * @async
 * @param {string} id - The ID of the journal entry to retrieve
 * @returns {Promise<Object>} The journal entry with its analysis
 * @throws {Error} If entry not found or user not authorized
 *
 * @example
 * const entry = await getEntry('entry123');
 * // Returns: { id, content, analysis: { ... } }
 */
export async function getEntry(id) {
    const user = await getUserByClerkId();
    return prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }
        },
        include: {
            analysis: true
        }
    });
}

/**
 * Retrieves all journal entries for the current user.
 * Orders entries by creation date in descending order (newest first).
 *
 * @async
 * @returns {Promise<Array>} Array of journal entries
 * @throws {Error} If user not authenticated or database query fails
 *
 * @example
 * const entries = await getEntries();
 * // Returns: [{ id, content, createdAt }, ...]
 */
export async function getEntries() {
    const user = await getUserByClerkId();
    return await prisma.JournalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include:{
            analysis: true
        }
    })
}

/**
 * Retrieves analysis data and calculates average sentiment score.
 * Gets all analyses for the current user and computes statistics.
 *
 * @async
 * @returns {Promise<Object>} Object containing:
 *   @property {Array} analyses - All analysis records
 *   @property {number} avg - Average sentiment score (rounded)
 * @throws {Error} If user not authenticated or database query fails
 *
 * @example
 * const { analyses, avg } = await getData();
 * console.log('Average sentiment:', avg);
 * console.log('All analyses:', analyses);
 */
export async function getData() {
    const user = await getUserByClerkId();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy:{
            createdAt: 'asc'
        }
    })

    const sum = analyses.reduce((acc, crt) => acc + crt.sentimentScore, 0);
    const avg = Math.round(sum / analyses.length);
    return {analyses, avg};
}
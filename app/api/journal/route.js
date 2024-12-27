import getUserByClerkId from '@/services/authService';

import {NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';
import {analyzeEntry} from '@/services/aiService';
import {API_STATUS} from '@/constants/responseTypes';
import * as journalService from '@/services/journalService'

export async function POST() {
    try {
        const user = await getUserByClerkId();
        const entry = await journalService.createJournalEntry(user.id,'Write about your day')
        const analysis = await analyzeEntry(entry.content)

        if (analysis) {
            analysis.negative = analysis.negative.toLowerCase() === 'yes';
        }

        await journalService.createAnalysis(user.id, entry.id, analysis);

        revalidatePath('/journal')

        return NextResponse.json({
            status: API_STATUS.SUCCESS,
            data: entry
        });
    } catch (error) {
        console.error(`Error creating entry: ${error}`);
        return NextResponse.json({
            status: API_STATUS.ERROR,
            error: 'Failed to create entry'
        });
    }
}

import { StructuredOutputParser } from "langchain/output_parsers";
import z from 'zod';

export const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string()
            .min(1, 'mood cannot be empty')
            .describe('the mood of the person who wrote the journal entry.'),
        sentimentScore: z.number()
            .min(-10, 'Score must be at least -10')
            .max(10,'Score must be at most 10')
            .describe('sentiment of the text and rated from -10 to 10'),
        subject: z.string()
            .min(1, 'Subject cannot be empty')
            .describe('the subject of the journal entry.'),
        negative: z.string()
            .describe('is the journal entry negative? i.e. does it contain negative emotions?'),
        summary: z.string()
            .min(10, "Summary must be at least 10 characters")
            .max(200, "Summary must not exceed 200 characters")
            .describe('short summary of the entire entry.'),
        color: z.string()
            .regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color code")
            .describe('a hexadecimal color code that represents the mood')
    })
);
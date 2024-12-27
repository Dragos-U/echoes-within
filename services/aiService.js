import {PromptTemplate} from "@langchain/core/prompts";
import {Document} from 'langchain/document'
import {loadQARefineChain} from "langchain/chains";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {llm} from "@/config/LLMConfig";
import {parser} from "@/utils/parser";
import {OpenAIEmbeddings} from "@langchain/openai";

/**
 * Generates a formatted prompt for AI analysis of journal entries.
 * Uses LangChain's PromptTemplate to create a structured prompt that guides
 * the AI in analyzing emotional content and sentiment of journal entries.
 *
 * @private
 * @param {string} content - The journal entry content to be analyzed
 * @returns {Promise<string>} Formatted prompt string containing:
 *   - Analysis instructions
 *   - Format requirements
 *   - The journal entry content
 *
 * @example
 * const prompt = await getPrompt("Today was a challenging day...");
 * // Returns formatted string:
 * // "Analyze the following journal entry carefully...
 * //  Consider:
 * //  - The specific words and phrases used
 * //  - The overall tone...
 * //  [format instructions]
 * //  [entry content]"
 *
 * @technical
 * Uses:
 * - LangChain PromptTemplate for structured prompt generation
 * - Parser format instructions for ensuring consistent JSON output
 * - Template variables:
 *   - {format_instructions}: JSON structure requirements
 *   - {entry}: The actual journal content
 *
 * @internal This is a helper function for analyzeEntry
 */
async function getPrompt(content) {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template: `Analyze the following journal entry carefully. Pay special attention to the emotional content and sentiment.
    Consider:
    - The specific words and phrases used
    - The overall tone of the text
    - Any emotional indicators
    - The context of the entry
    
    Be sure to provide a precise sentiment score that accurately reflects the emotional intensity and valence of the entry.
    
    You must always return valid JSON fenced by a markdown code block. Do not return any additional text.
    Follow the instructions and format your response to match the format instructions exactly!
    \n{format_instructions}\n{entry}`,
        inputVariables: ['entry'],
        partialVariables: {format_instructions},
    })

    const input = await prompt.format({
        entry: content,
    })
    console.log(input);
    return input;
}

/**
 * Analyzes a journal entry using AI to extract mood, sentiment, and other metrics.
 * Uses LangChain and OpenAI to process the content and generate analysis.
 *
 * @param {string} content - The journal entry text to analyze
 * @returns {Promise<Object>} An object containing:
 *   @property {string} mood - The detected mood of the entry (e.g., "happy", "sad", "neutral")
 *   @property {number} sentimentScore - Numerical score of the sentiment
 *   @property {string} subject - Main subject or topic of the entry
 *   @property {string} negative - Whether the content is negative ("yes" or "no")
 *   @property {string} summary - Brief summary of the entry content
 *   @property {string} color - Hex color code representing the entry's mood
 *
 * @example
 * const analysis = await analyzeEntry("Today was a great day!");
 * // Returns:
 * // {
 * //   mood: "happy",
 * //   sentimentScore: 0.8,
 * //   subject: "positive day",
 * //   negative: "no",
 * //   summary: "Expression of having a great day",
 * //   color: "#7CBA3B"
 * // }
 *
 * @throws {Error} If content is invalid
 * @returns {Object} Default neutral analysis object if analysis fails:
 * // {
 * //   mood: "neutral",
 * //   sentimentScore: 0,
 * //   subject: "unable to analyze",
 * //   negative: "no",
 * //   summary: "Analysis could not be completed",
 * //   color: "#808080"
 * // }
 */
export async function analyzeEntry(content) {
    try {
        const input = await getPrompt(content);
        const result = await llm.invoke(input);

        // Extract just the JSON content from the markdown code block
        const jsonString = result.content
            .replace(/```json\n/, '')  // Remove opening ```json
            .replace(/\n```$/, '')     // Remove closing ```
            .trim();

        console.log('Parsed JSON string:', jsonString); // Debug log

        return parser.parse(jsonString);
    } catch (e) {
        console.error(`Error analyzing entry:`, e);
        // Return a default analysis object in case of error
        return {
            mood: "neutral",
            sentimentScore: 0,
            subject: "unable to analyze",
            negative: "no",
            summary: "Analysis could not be completed",
            color: "#808080"
        };
    }
}

/**
 * Analyzes a question against a collection of journal entries using AI to find relevant answers.
 * Uses LangChain's QA system with vector similarity search to process and answer questions about journal entries.
 *
 * @param {string} question - The question to analyze against the journal entries
 * @param {Array<Object>} entries - Array of journal entries to search through
 * @param {string} entries[].id - Unique identifier of the entry
 * @param {string} entries[].content - Content of the journal entry
 * @param {Date} entries[].createdAt - Creation date of the entry
 *
 * @returns {Promise<string>} The AI-generated answer based on relevant journal entries
 *
 * @example
 * const entries = [
 *   {
 *     id: "1",
 *     content: "Today I felt happy because...",
 *     createdAt: "2024-01-20"
 *   }
 * ];
 * const answer = await questionAnalysis(
 *   "How was I feeling last week?",
 *   entries
 * );
 * // Returns: "Based on your journal entry from January 20th, you were feeling happy..."
 *
 * @throws {Error} If question processing fails, if entries are invalid,
 *                 or if AI analysis encounters an error
 *
 * @technical
 * Uses:
 * - LangChain's QA Refine Chain for processing
 * - OpenAI Embeddings for vector similarity
 * - MemoryVectorStore for document storage and search
 * - Document similarity search to find relevant entries
 */
export async function questionAnalysis(question, entries) {
    const docs = entries.map(entry => {
        return new Document({
            pageContent: entry.content,
            metadata: {
                id: entry.id,
                createdAt: entry.createdAt
            }
        })
    })

    try {
        const chain = loadQARefineChain(llm);
        const embeddings = new OpenAIEmbeddings();
        const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
        const relevantDocs = await store.similaritySearch(question);

        const results = await chain.invoke({
            input_documents: relevantDocs, question,
        })

        return results.output_text;
    }catch (error){
        console.error('Error in question analysis:', error);
        throw error;
    }
}
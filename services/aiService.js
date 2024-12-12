import {PromptTemplate} from "@langchain/core/prompts";
import {Document} from 'langchain/document'
import {loadQARefineChain} from "langchain/chains";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {llm} from "@/config/config";
import {parser} from "@/utils/parser";
import {OpenAIEmbeddings} from "@langchain/openai";

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
    
    Return ONLY the JSON object without any markdown formatting or code blocks.
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
 * Analyzes a journal entry using AI to extract mood, sentiment, and other metrics
 * @param {string} content - The journal entry text to analyze
 * @returns {Promise<Object>} The analyzed results
 * @throws {Error} If content is invalid or analysis fails
 */
// export async function analyzeEntry(content) {
//
//     try {
//         const input = await getPrompt(content);
//         const result = await llm.invoke(input);
//         return parser.parse(result.content);
//     } catch (e) {
//         console.error(`Error analyzing entry: ${e}`);
//         throw e;
//     }
// }

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
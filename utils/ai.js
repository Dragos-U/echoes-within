import {ChatOpenAI, OpenAIEmbeddings} from '@langchain/openai'
import {StructuredOutputParser} from "langchain/output_parsers";
import {PromptTemplate} from "@langchain/core/prompts";
import {Document} from 'langchain/document'
import z from 'zod'
import {loadQARefineChain} from "langchain/chains";
import {MemoryVectorStore} from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('the mood of teh person who wrote the journal entry.'),
        subject: z.string().describe('the subject of the journal entry.'),
        negative: z.string().describe('is the journal entry negative? i.e. does it contain negative emotions?'),
        summary: z.string().describe('short summary of the entire entry.'),
        color: z.string().describe('a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing sadness.')
    })
)

async function getPrompt(content) {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: {format_instructions},
    })

    const input = await prompt.format({
        entry: content,
    })
    console.log(input);
    return input;
}

export async function analyzeEntry(content) {
    const input = await getPrompt(content);
    const llm = new ChatOpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
        apiKey: process.env.OPENAI_API_KEY
    })

    const result = await llm.invoke(input);

    try {
        return parser.parse(result.content);
    } catch (e) {
        console.error(e);
    }
}

export async function questionAnalysis(question, entries){
    const docs = entries.map( entry => {
        return new Document({
            pageContent: entry.constructor,
            metadata: {id: entry.id, createdAt: entry.createdAt}
        })
    })

    const llm = new ChatOpenAI({
        temperature:0,
        modelName: 'gpt-3.5-turbo',
        apiKey: process.env.OPENAI_API_KEY
    })
    const chain = loadQARefineChain(llm);
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);

    const results = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })

    return results.output_text
}


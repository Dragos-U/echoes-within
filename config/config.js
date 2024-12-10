import { ChatOpenAI } from '@langchain/openai';

export const CONFIG = {
    MODEL_NAME: 'gpt-4o-mini',
    TEMPERATURE: 0,
    API_KEY: process.env.OPENAI_API_KEY
};

export const llm = new ChatOpenAI({
    temperature: CONFIG.TEMPERATURE,
    modelName: CONFIG.MODEL_NAME,
    apiKey: CONFIG.API_KEY
});
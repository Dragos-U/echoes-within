import { ChatOpenAI } from '@langchain/openai';

export const LLMConfig = {
    MODEL_NAME: 'gpt-4o-mini',
    TEMPERATURE: 0,
    API_KEY: process.env.OPENAI_API_KEY
};

export const llm = new ChatOpenAI({
    temperature: LLMConfig.TEMPERATURE,
    modelName: LLMConfig.MODEL_NAME,
    apiKey: LLMConfig.API_KEY
});
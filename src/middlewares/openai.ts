import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.CHAT_ORGANIZATION,
  apiKey: process.env.CHAT_API_KEY,
});

export const openai = new OpenAIApi(configuration);

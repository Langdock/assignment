import { OpenAI } from 'openai';

let openai: OpenAI | undefined;

export async function generateStream(prompt: string) {
  try {
    // Defer credentials until a request so builds do not need an API key.
    openai ??= new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    return response;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

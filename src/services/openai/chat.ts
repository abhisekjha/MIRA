import { OpenAIClient } from './client';
import { OpenAIError } from './errors';
import { SYSTEM_PROMPT } from './prompts';
import { validateMessages } from './validation';
import type { ChatMessage, ChatResponse } from './types';

export async function generateResponse(prompt: string): Promise<ChatResponse> {
  try {
    const client = OpenAIClient.getInstance().getClient();
    const config = OpenAIClient.getInstance().getConfig();

    const messages = validateMessages([
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ]);

    const completion = await client.chat.completions.create({
      model: config.model,
      messages,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      presence_penalty: config.presencePenalty,
      frequency_penalty: config.frequencyPenalty
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new OpenAIError('No response generated', 'unknown', 500);
    }

    return { message: content };
  } catch (error) {
    console.error('Error generating response:', error);
    const openAIError = OpenAIError.fromError(error);
    
    return {
      message: '',
      error: openAIError.message
    };
  }
}
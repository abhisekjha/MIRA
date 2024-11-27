import { z } from 'zod';

export const openAIConfigSchema = z.object({
  apiKey: z.string().min(32, 'OpenAI API key must be at least 32 characters'),
});

export interface OpenAIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
}

export const DEFAULT_CONFIG: OpenAIConfig = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 500,
  presencePenalty: 0.6,
  frequencyPenalty: 0.5,
};

export function validateOpenAIConfig(config: Partial<OpenAIConfig> = {}): OpenAIConfig {
  const { apiKey } = openAIConfigSchema.parse({ apiKey: config.apiKey ?? DEFAULT_CONFIG.apiKey });
  return { ...DEFAULT_CONFIG, ...config, apiKey };
}
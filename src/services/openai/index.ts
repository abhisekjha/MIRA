export { generateResponse } from './chat';
export { OpenAIClient } from './client';
export { OpenAIError } from './errors';
export type { ChatResponse, ChatMessage } from './types';
export type { OpenAIConfig } from './config';

// Initialize OpenAI client with environment variables
OpenAIClient.getInstance();
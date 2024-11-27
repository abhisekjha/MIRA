import { z } from 'zod';
import type { ChatMessage } from './types';

export const messageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().min(1, 'Message content cannot be empty')
});

export const chatResponseSchema = z.object({
  message: z.string(),
  error: z.string().optional()
});

export function validateMessage(message: ChatMessage): ChatMessage {
  return messageSchema.parse(message);
}

export function validateMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.map(validateMessage);
}
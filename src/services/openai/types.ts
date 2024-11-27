export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface OpenAIErrorResponse {
  error: {
    message: string;
    type: string;
    code: string;
    param?: unknown;
  };
  status?: number;
}

export type ChatRole = 'system' | 'user' | 'assistant';
export type ChatModel = 'gpt-3.5-turbo' | 'gpt-4';
export type ErrorCode = 'rate_limit' | 'invalid_key' | 'server_error' | 'timeout' | 'unknown';
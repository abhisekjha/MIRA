import type { ChatMessage } from '../openai/types';

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  language: string;
  goal?: string;
  bookmarks: ChatBookmark[];
  metadata: ChatMetadata;
}

export interface ChatBookmark {
  id: string;
  messageIndex: number;
  note: string;
  createdAt: string;
}

export interface ChatMetadata {
  duration: number;
  messageCount: number;
  topicFrequency: Record<string, number>;
  sentiment: 'positive' | 'neutral' | 'negative';
  language: string;
}

export interface ChatExportOptions {
  format: 'pdf' | 'json' | 'txt';
  includeMetadata: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ChatSearchQuery {
  text?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  language?: string;
}
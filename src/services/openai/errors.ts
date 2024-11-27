import type { OpenAIErrorResponse, ErrorCode } from './types';

export class OpenAIError extends Error {
  constructor(
    message: string,
    public code: ErrorCode = 'unknown',
    public status: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'OpenAIError';
  }

  static fromResponse(error: OpenAIErrorResponse): OpenAIError {
    const message = error.error.message;
    const status = error.status || 500;
    let code: ErrorCode = 'unknown';

    if (message.includes('rate limit')) {
      code = 'rate_limit';
    } else if (message.includes('invalid api key')) {
      code = 'invalid_key';
    } else if (message.includes('timeout')) {
      code = 'timeout';
    } else if (status >= 500) {
      code = 'server_error';
    }

    return new OpenAIError(message, code, status, error.error);
  }

  static fromError(error: unknown): OpenAIError {
    if (error instanceof OpenAIError) {
      return error;
    }

    if (error instanceof Error) {
      return new OpenAIError(error.message);
    }

    return new OpenAIError('An unexpected error occurred');
  }
}
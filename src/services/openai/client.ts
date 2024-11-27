import OpenAI from 'openai';
import { validateOpenAIConfig, type OpenAIConfig } from './config';
import { OpenAIError } from './errors';

export class OpenAIClient {
  private static instance: OpenAIClient | null = null;
  private client: OpenAI | null = null;
  private config: OpenAIConfig;

  private constructor(config: Partial<OpenAIConfig> = {}) {
    this.config = validateOpenAIConfig(config);
    this.initializeClient();
  }

  private initializeClient(): void {
    if (!this.config.apiKey) {
      throw new OpenAIError(
        'OpenAI API key is not configured. Please check your environment settings.',
        'missing_api_key',
        401
      );
    }

    try {
      this.client = new OpenAI({
        apiKey: this.config.apiKey,
        dangerouslyAllowBrowser: true,
        maxRetries: 3,
        timeout: 30000,
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      throw new OpenAIError(
        'Failed to initialize OpenAI client. Please check your configuration.',
        'initialization_failed',
        500
      );
    }
  }

  public static getInstance(config?: Partial<OpenAIConfig>): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient(config);
    } else if (config) {
      // Update config if provided
      OpenAIClient.instance.config = validateOpenAIConfig(config);
      OpenAIClient.instance.initializeClient();
    }
    return OpenAIClient.instance;
  }

  public getClient(): OpenAI {
    if (!this.client) {
      this.initializeClient();
    }
    if (!this.client) {
      throw new OpenAIError(
        'OpenAI client is not properly configured. Please check your API key.',
        'client_not_initialized',
        500
      );
    }
    return this.client;
  }

  public getConfig(): OpenAIConfig {
    return { ...this.config };
  }

  public static resetInstance(): void {
    OpenAIClient.instance = null;
  }
}
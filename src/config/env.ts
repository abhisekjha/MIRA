import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(32, 'OpenAI API key must be at least 32 characters'),
  VITE_GOOGLE_CLIENT_ID: z.string().min(1, 'Google Client ID is required'),
  VITE_GOOGLE_CLIENT_SECRET: z.string().min(1, 'Google Client Secret is required'),
  VITE_JWT_SECRET: z.string().min(32, 'JWT Secret must be at least 32 characters'),
  VITE_API_URL: z.string().url('API URL must be a valid URL'),
});

export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  auth: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    },
    jwt: {
      secret: import.meta.env.VITE_JWT_SECRET,
    },
  },
  api: {
    url: import.meta.env.VITE_API_URL,
  },
} as const;

export function validateConfig() {
  try {
    envSchema.parse({
      VITE_OPENAI_API_KEY: config.openai.apiKey,
      VITE_GOOGLE_CLIENT_ID: config.auth.google.clientId,
      VITE_GOOGLE_CLIENT_SECRET: config.auth.google.clientSecret,
      VITE_JWT_SECRET: config.auth.jwt.secret,
      VITE_API_URL: config.api.url,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(issue => 
        `${issue.path.join('.')}: ${issue.message}`
      ).join('\n');
      throw new Error(
        `Environment validation failed:\n${missingVars}\n\n` +
        `Please check your .env file and ensure all required variables are set correctly.`
      );
    }
    throw error;
  }
}

// Validate config immediately
validateConfig();
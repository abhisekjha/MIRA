export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'email' | 'google';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthError {
  code: string;
  message: string;
}
import { 
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  resetPassword,
  confirmPasswordResetCode,
  logoutUser,
  verifyEmailToken
} from './firebase';
import { 
  checkRateLimit, 
  generateToken, 
  validateCSRFToken,
  validateSession,
  securityHeaders 
} from './security';
import type { LoginCredentials, RegisterCredentials, Session } from './types';

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}

export async function login(credentials: LoginCredentials): Promise<Session> {
  await checkRateLimit(credentials.email);

  const csrfToken = localStorage.getItem('csrfToken');
  if (!csrfToken || !validateCSRFToken(csrfToken)) {
    throw new Error('Invalid security token');
  }

  const user = await loginWithEmail(credentials);
  const accessToken = await generateToken(user);
  const refreshToken = await generateToken(user);

  return {
    user,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 3600000 // 1 hour
  };
}

export async function register(credentials: RegisterCredentials): Promise<Session> {
  const user = await registerWithEmail(credentials);
  const accessToken = await generateToken(user);
  const refreshToken = await generateToken(user);

  return {
    user,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 3600000
  };
}

export async function loginWithGoogleProvider(): Promise<Session> {
  const user = await loginWithGoogle();
  const accessToken = await generateToken(user);
  const refreshToken = await generateToken(user);

  return {
    user,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 3600000
  };
}

export async function requestPasswordReset(email: string): Promise<void> {
  await resetPassword(email);
}

export async function verifyPasswordReset(token: string, newPassword: string): Promise<void> {
  await confirmPasswordResetCode(token, newPassword);
}

export async function verifyEmail(token: string): Promise<void> {
  await verifyEmailToken(token);
}

export async function refreshSession(): Promise<Session> {
  const token = localStorage.getItem('token');
  if (!token || !(await validateSession(token))) {
    throw new Error('Invalid session');
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...securityHeaders,
    },
    credentials: 'include',
  });

  return handleResponse<Session>(response);
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem('token');
  if (token) {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...securityHeaders,
      },
      credentials: 'include',
    });
    
    localStorage.removeItem('token');
    localStorage.removeItem('csrfToken');
  }
  
  await logoutUser();
}
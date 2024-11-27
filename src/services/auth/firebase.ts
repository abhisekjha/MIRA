import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  sendEmailVerification,
  applyActionCode,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import type { User, LoginCredentials, RegisterCredentials } from './types';

const googleProvider = new GoogleAuthProvider();

function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
    picture: firebaseUser.photoURL || undefined,
    provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
    emailVerified: firebaseUser.emailVerified,
    createdAt: firebaseUser.metadata.creationTime!,
    updatedAt: firebaseUser.metadata.lastSignInTime!,
  };
}

export async function loginWithEmail({ email, password }: LoginCredentials): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(result.user);
}

export async function registerWithEmail({ email, password, name }: RegisterCredentials): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(result.user);
  return mapFirebaseUser(result.user);
}

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return mapFirebaseUser(result.user);
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function confirmPasswordResetCode(code: string, newPassword: string): Promise<void> {
  await confirmPasswordReset(auth, code, newPassword);
}

export async function verifyEmailToken(code: string): Promise<void> {
  await applyActionCode(auth, code);
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}
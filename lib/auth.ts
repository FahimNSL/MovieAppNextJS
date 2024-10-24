'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(credentials: z.infer<typeof credentialsSchema>) {
  const validated = credentialsSchema.parse(credentials);
  
  // In a real app, validate credentials against a database
  // This is just a demo implementation
  if (validated.email === 'demo@example.com' && validated.password === 'password123') {
    const user: User = {
      id: '1',
      email: validated.email,
      name: 'Demo User',
    };

    // Set session cookie
    cookies().set('session', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true, user };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  cookies().delete('session');
}

export async function getUser(): Promise<User | null> {
  const session = cookies().get('session');
  if (!session) return null;

  try {
    return userSchema.parse(JSON.parse(session.value));
  } catch {
    return null;
  }
}
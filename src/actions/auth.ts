'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { signIn, signOut } from '@/auth';
import { AuthErrorType } from '@/lib/message';
import { LoginSchema, RegisterSchema } from '@/lib/schemas';
import { createUser, getUserByEmail } from '@/prisma/user';

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<{ type: AuthErrorType } | null> => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { type: 'INVALID_FIELDS' };
  }

  const { name, email, password } = validateFields.data;
  const isEmailExist = await getUserByEmail(email);
  if (isEmailExist) {
    return { type: 'EMAIL_ALREADY_EXIST' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(name, email, hashedPassword);

  return null;
};

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ type: AuthErrorType } | null> => {
  try {
    await signIn('credentials', values);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { type: 'INVALID_CREDENTIALS' };
        default:
          return { type: 'UNKNOWN' };
      }
    }
  }

  return null;
};

export const logout = async () => {
  await signOut();
  redirect('/auth/signin');
};

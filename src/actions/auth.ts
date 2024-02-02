'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import { AuthErrorType } from '@/lib/message';
import { RegisterSchema } from '@/lib/schemas';
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

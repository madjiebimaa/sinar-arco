import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/prisma/user';

export const authConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

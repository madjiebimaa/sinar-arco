import { authConfig } from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { prisma } from '@/lib/prisma-client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});

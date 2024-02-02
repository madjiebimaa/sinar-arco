import { USERS_PER_PAGE } from '@/lib/constants';
import { prisma } from '@/lib/prisma-client';
import { User } from '@prisma/client';

export const getUsers = async (query: string, page: number) => {
  return (await prisma.user.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    take: USERS_PER_PAGE,
    skip: (page - 1) * USERS_PER_PAGE,
  })) as User[];
};

export const getTotalUsers = async (query: string) => {
  return (await prisma.user.count({
    where: {
      name: {
        contains: query,
      },
    },
  })) as number;
};

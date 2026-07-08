import { PrismaClient } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

export const TagService = {
  getAll: catchServiceAsync(async () =>
    prisma.foodTag.findMany({ orderBy: { name: 'asc' } }),
  ),
};

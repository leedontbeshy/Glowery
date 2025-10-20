import { PrismaClient } from "../../generated/prisma";

export const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Prisma connected to Supabase PostgreSQL'))
  .catch((err: unknown) => console.error('Prisma connection error:', err));

import { prisma } from "@/common/db/prisma";
import { pool } from "@/config/database";


export class AdminRepository {
    static async getAllUser(limit: number = 50, offset: number = 0) {

        const users = await prisma.users.findMany({
            select:{
                id: true,
                email: true,
                username:true,
                full_name: true,
                phone: true,
                role: true,
                status: true,
                email_verified: true,
                created_at: true,
                address: true,
                last_login_at: true
            },
            take: limit,
            skip: offset
        });
        return users;
    };

    static async getTotalUsersCount(): Promise<number> {
        const count = await prisma.users.count();
        return count
    };

    static async searchUser(keyword: string, limit: number, offset: number) {
  const users = await prisma.users.findMany({
    where: {
      OR: [
        { email: { contains: keyword, mode: 'insensitive' } },
        { username: { contains: keyword, mode: 'insensitive' } },
        { full_name: { contains: keyword, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
      full_name: true,
      role: true,
      status: true,
      created_at: true,
    },
    orderBy: { created_at: 'desc' },
    take: limit,
    skip: offset,
  });

  const total = await prisma.users.count({
    where: {
      OR: [
        { email: { contains: keyword, mode: 'insensitive' } },
        { username: { contains: keyword, mode: 'insensitive' } },
        { full_name: { contains: keyword, mode: 'insensitive' } },
      ],
    },
  });

  return {
    users,
    total,
  };
}




}
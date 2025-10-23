import { pool } from "@/config/database";
import { prisma } from "@/common/db/prisma";
import { UserBasic } from "@/features/users/user.type";

import { CreateUserDTO } from "../auth/auth.dto";

import { User } from "./user.model";
import { UpdateUserDTO } from "./user.dto";



export class UserRepository {
    static async findUserByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: {email},
            select:{
                id: true,
                address: true,
                phone:true,
                email: true,
                full_name: true,
                role: true,
                password: true,
                status: true,
                username: true
            }
        });
        return user;
    }

    static async create(data: CreateUserDTO): Promise<User> {
        const user = await prisma.users.create({
            data: {
                email: data.email,
                username: data.email,
                password: data.password,
                full_name: data.full_name,
                address: data.address,
                phone: data.phone,
            }     
        });
        return user;
    }

    static async updateLastLogin(userId: number): Promise<void> {
        await prisma.users.update({
            where:{
                id: userId,
            },
            data:{
                last_login_at: new Date(),
            }
        })
    }

    //User feat
    static async findUserById(userId: number): Promise<UserBasic | null> {
        const userFound = await prisma.users.findUnique({
            where:{
                id: userId
            },
            select:{
                id: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                created_at: true,
                status: true,
                full_name: true,
                last_login_at: true,
                role: true
            }
        });
        return userFound;
    }

    static async updateUser(userId: number, userData: UpdateUserDTO) {
        const { full_name, address, phone } = userData;
        const result = await pool.query(
            `
      UPDATE users SET full_name = $1, address = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4
      RETURNING id, email, username, full_name, phone, address, role, status, updated_at;
      `,
            [full_name, address, phone, userId]
        );
        return result.rows[0] || null;
    }

    static async updatePasswordById(userId: number, password: string) {
        const result = await pool.query(
            `UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2
          RETURNING id, email, username, full_name`,
            [password, userId]
        );
        return result.rows[0] || null;
    }

    static async getPasswordById(userId: number): Promise<string | null> {
        const result = await pool.query(
            `SELECT password FROM users WHERE id = $1`,
            [userId]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0]?.password || null;
    }
}

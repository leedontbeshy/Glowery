import { pool } from '@/config/database';
import { hashPassword } from '@/common/utils/hash';
import { UpdateUserData, UserBasic } from '@/common/types/user.type';

import { User } from './user.model';
import { ChangePasswordInput, CreateUserInput } from './user.schema';

export class UserRepository {
    static async findUserByEmail(email: string) {
        const result = await pool.query(
            'SELECT id, email,username, password, full_name, phone, created_at FROM users WHERE email = $1',
            [email],
        );
        return result.rows[0] || null;
    }

    static async create(data: CreateUserInput): Promise<User> {
        const result = await pool.query(
            `INSERT INTO users (email,username, password, full_name, phone, address)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email,username, full_name, phone,address, created_at`,
            [
                data.email,
                data.username,
                data.password,
                data.full_name,
                data.phone,
                data.address || null,
            ],
        );
        return result.rows[0];
    }

    static async updateLastLogin(userId: number): Promise<void> {
        await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [userId]);
    }


    //User feat
    static async findUserById(userId: number): Promise<UserBasic | null> {
        const result = await pool.query(
            `SELECT id, email,username, phone,address, 
    created_at, status, full_name, last_login_at, role  FROM users WHERE id = $1`,
            [userId],
        );
        return result.rows[0] || null;
    }

    static async updateUser(userId: number, userData: UpdateUserData) {
        try {
            const { full_name, address, phone } = userData;
            const result = await pool.query(
                `
      UPDATE users SET full_name = $1, address = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4
      RETURNING id, email, username, full_name, phone, address, role, status, updated_at;
      `,
                [full_name, address, phone, userId],
            );

            return result.rows[0] || null;
        } catch (error: any) {
            throw error;
        }
    }

    static async updatePasswordById(userId: number, password: string){
      try {
        const result = await pool.query(`UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2
          RETURNING id, email, username, full_name`, [password, userId]);
          return result.rows[0] || null;
      } catch (error: any) {
        throw error;
      }
    }

    static async getPasswordById(userId: number): Promise<string | null>{
      try {
        const result = await pool.query(`SELECT password FROM users WHERE id = $1`, [userId]);
      if (result.rows.length === 0) return null;
      return result.rows[0]?.password || null;
    } catch (error) {
      throw error;
    }
  }
}

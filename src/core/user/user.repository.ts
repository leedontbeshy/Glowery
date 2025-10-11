import { pool } from '@/config/database';
import { hashPassword } from '@/common/utils/hash';

import { User } from './user.model';
import { CreateUserInput } from './user.schema';
import { UserBasic } from '@/common/types/user.type';

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
      [data.email,data.username, data.password, data.full_name, data.phone, data.address || null],
    );
    return result.rows[0];
  }

  static async updateLastLogin(userId: number): Promise<void> {
    await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [userId]);
  }

  static async updatePasswordByEmail(email: number, password: string): Promise<void> {
    const hashedPassword = await hashPassword(password);
    await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [hashedPassword, email]);
  }

  //User feat
  static async findUserById(userId: number): Promise<UserBasic | null>{
    const result = await pool.query(
    `SELECT id, email,username, phone,address, 
    created_at, status, full_name, last_login_at, role  FROM users WHERE id = $1`, [userId]);
    return result.rows[0] || null;
  }
}


import {pool} from "@/config/database";
import { User } from "./user.model";
import { registerInput } from "./user.schema";

export class UserRepository {
  static async findUserByEmail(email: string) {
    const result = await pool.query("SELECT id, email, full_name, phone, created_at FROM users WHERE email = $1",
      [email],
    );
    return result.rows[0] || null;
  }

  static async create(data: registerInput): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password, full_name, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, full_name, phone, created_at`,
      [data.email, data.password, data.full_name, data.phone || null]
    );
    return result.rows[0];
  }

  static async updateLastLogin(userId: string): Promise<void> {
    await pool.query("UPDATE users SET last_login_at = NOW() WHERE id = $1", 
      [userId]
    );
  }
}
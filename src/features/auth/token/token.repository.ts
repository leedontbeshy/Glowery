import { pool } from "@/config/database";

export class TokenRepository{
    static async addToBlackList(token: string, user_id: number, created_at:Date){
        await pool.query(
            `INSERT INTO blacklisted_tokens (token, user_id, created_at)
            VALUES ($1, $2, $3)`,
            [token, user_id, created_at]
        )
    };
    
    static async isBlacklisted(token: string): Promise<boolean> {
    const result = await pool.query(
      "SELECT 1 FROM blacklisted_tokens WHERE token = $1",
      [token]
    );
    return (result.rowCount ?? 0) > 0;
  }

  static async cleanupExpired() {
    await pool.query("DELETE FROM blacklisted_tokens WHERE expired_at < NOW()");
  }
}

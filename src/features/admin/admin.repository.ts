import { pool } from "@/config/database";


export class AdminRepository{
    static async getAllUser(limit: number = 50,offset: number = 0){
        try {
            const result = await pool.query(`SELECT id,email, username, full_name, 
                phone, role, status, email_verified, created_at, last_login_at, address
                FROM users
                ORDER BY created_at
                DESC LIMIT $1 OFFSET $2`, [limit, offset]);
            
                return result.rows;
        } catch (error: any) {
            throw error;
        }


    }
}
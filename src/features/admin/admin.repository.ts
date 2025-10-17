import { pool } from "@/config/database";
import { handleDatabaseError } from '@/common/errors/databaseErrorHandler';


export class AdminRepository{
    static async getAllUser(limit: number = 50,offset: number = 0){
        try {
            const result = await pool.query(`SELECT id,email, username, full_name,
                phone, role, status, email_verified, created_at, last_login_at, address
                FROM users
                ORDER BY created_at
                DESC LIMIT $1 OFFSET $2`, [limit, offset]);
                return result.rows;
        } catch (error) {
            handleDatabaseError(error, 'getAllUser');
        }
    };

    static async getTotalUsersCount(): Promise<number>{
        try {
            const result = await pool.query(`SELECT COUNT(*) as total FROM users `);
            return parseInt(result.rows[0].total, 10);
        } catch (error) {
            handleDatabaseError(error, 'getTotalUsersCount');
        }
    };

    static async searchUser(keyword: string, limit: number, offset: number){
        try {
            const usersQuery = await pool.query(
                `
                SELECT id, email, username, full_name, role, status, created_at
                FROM users
                WHERE email ILIKE $1 OR username ILIKE $1 OR full_name ILIKE $1
                ORDER BY created_at DESC
                LIMIT $2 OFFSET $3
                `, [`%${keyword}%`, limit, offset]
            );

            const countQuery = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM users
            WHERE email ILIKE $1 OR username ILIKE $1 OR full_name ILIKE $1
            `,
            [`%${keyword}%`]
        );

        return {
            users: usersQuery.rows,
            total: parseInt(countQuery.rows[0].total, 10)
        }
        } catch (error) {
            handleDatabaseError(error, 'searchUser');
        }
    };



}
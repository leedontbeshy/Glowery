import dayjs from 'dayjs';

import { pool } from '@/config/database';
import { BadRequestError } from '@/common/errors/ApiError';
import { getTokenExpiration } from '@/common/utils/jwt';



export class TokenRepository {
    //login
    static async addRefreshTokenToDB(refreshToken:string, userId: number):Promise<void>{
        const expiresAt = dayjs().add(14, 'day').toDate();
        await pool.query(`
            INSERT INTO refresh_tokens (user_id, token, expires_at, is_revoked, created_at)
            VALUES($1, $2,$3,$4, CURRENT_TIMESTAMP)
            `,[userId, refreshToken,expiresAt,false]);
    }

    static async addToBlackList(accessToken: string, refreshToken: string, user_id: number): Promise<boolean> {
        let insertedCount = 0;

        const accessExp = getTokenExpiration(accessToken) ?? new Date();
        const result1 = await pool.query(
            `INSERT INTO blacklisted_tokens (access_token, user_id, reason, expires_at)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (access_token) DO NOTHING`,
            [accessToken, user_id, 'logout', accessExp],
        );
        insertedCount += (result1.rowCount ?? 0);


        const refreshExp = getTokenExpiration(refreshToken) ?? new Date();
        const result2 = await pool.query(
            `INSERT INTO blacklisted_tokens (refresh_token, user_id, reason, expires_at)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (refresh_token) DO NOTHING`,
            [refreshToken, user_id, 'logout', refreshExp],
        );
        insertedCount += (result2.rowCount ?? 0);
        return insertedCount > 0;
    }

    static async isBlacklisted(token: string): Promise<boolean> {
        const result = await pool.query(
            'SELECT 1 FROM blacklisted_tokens WHERE access_token = $1 OR refresh_token = $1',
            [token],
        );
        return (result.rowCount ?? 0) > 0;
    }

    static async cleanupExpired() {
        await pool.query('DELETE FROM blacklisted_tokens WHERE expires_at < NOW()');
    }

    //Reset Token
    static async deleteExistedToken(email: string, userId?: number): Promise<void> {
        if (userId) {
            await pool.query(`DELETE FROM reset_tokens WHERE user_id = $1`, [userId]);
        }
        else {
            await pool.query(`DELETE FROM reset_tokens WHERE email = $1`, [email]);
        }
    }

    static async createResetToken(email: string, token: string, expiresAt: Date): Promise<void> {
        await pool.query(
            `INSERT INTO reset_tokens (email, token, expires_at, created_at)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
            [email, token, expiresAt],
        );
    }

    static async checkResetToken(email: string): Promise<boolean> {
        const result = await pool.query(`SELECT token FROM reset_tokens WHERE email = $1`, [
            email,
        ]);
        return (result?.rowCount ?? 0) > 0;
    }

    static async findValidToken(token: string): Promise<any> {
        const result = await pool.query(
            `SELECT rt.email, rt.expires_at, u.id as user_id
                 FROM reset_tokens rt
                 JOIN users u ON rt.email = u.email
                 WHERE rt.token = $1`,
            [token],
        );
        if (result.rowCount === 0) return null;

        const record = result.rows[0];
        const now = new Date();

        if (new Date(record.expires_at) < now) {
            await pool.query(`DELETE FROM reset_tokens WHERE token = $1`, [token]);
            throw new BadRequestError('Reset token has expired');
        }
        return {
            id: record.user_id,
            email: record.email,
        };
    }
}

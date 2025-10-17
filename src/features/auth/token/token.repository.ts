import { pool } from '@/config/database';
import { handleDatabaseError } from '@/common/errors/databaseErrorHandler';
import { BadRequestError } from '@/common/errors/ApiError';

export class TokenRepository {
    static async addToBlackList(token: string, user_id: number, expires_at: Date) {
        try {
            await pool.query(
                `INSERT INTO blacklisted_tokens (token, user_id, expires_at)
                VALUES ($1, $2, $3)`,
                [token, user_id, expires_at],
            );
        } catch (error) {
            handleDatabaseError(error, 'addToBlackList');
        }
    }

    static async isBlacklisted(token: string): Promise<boolean> {
        try {
            const result = await pool.query('SELECT 1 FROM blacklisted_tokens WHERE token = $1', [
                token,
            ]);
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            handleDatabaseError(error, 'isBlacklisted');
        }
    }

    static async cleanupExpired() {
        try {
            await pool.query('DELETE FROM blacklisted_tokens WHERE expired_at < NOW()');
        } catch (error) {
            handleDatabaseError(error, 'cleanupExpired');
        }
    }

    //Reset Token
    static async deleteExistedToken(email: string, userId ?: number): Promise<void> {
        try {
            if(userId){
                await pool.query(`DELETE FROM reset_tokens WHERE user_id = $1`, [userId]);
            }
            else{
                await pool.query(`DELETE FROM reset_tokens WHERE email = $1`, [email]);
            }
        } catch (error) {
            handleDatabaseError(error, 'deleteExistedToken');
        }
    }

    static async createResetToken(email: string, token: string, expiresAt: Date): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO reset_tokens (email, token, expires_at, created_at)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
                [email, token, expiresAt],
            );
        } catch (error) {
            handleDatabaseError(error, 'createResetToken');
        }
    }

    static async checkResetToken(email: string): Promise<boolean> {
        try {
            const result = await pool.query(`SELECT token FROM reset_tokens WHERE email = $1`, [
                email,
            ]);
            return (result?.rowCount ?? 0) > 0;
        } catch (error) {
            handleDatabaseError(error, 'checkResetToken');
        }
    }

    static async findValidToken(token: string): Promise<any> {
        try {
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
        } catch (error) {
            // Re-throw if it's already an ApiError (like BadRequestError)
            if (error instanceof BadRequestError) {
                throw error;
            }
            handleDatabaseError(error, 'findValidToken');
        }
    }
}

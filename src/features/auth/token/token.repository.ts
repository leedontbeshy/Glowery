import dayjs from 'dayjs';
import { prisma } from '@/common/db/prisma';
import { pool } from '@/config/database';
import { BadRequestError } from '@/common/errors/ApiError';
import { getTokenExpiration } from '@/common/utils/jwt';



export class TokenRepository {
    //login
    static async addRefreshTokenToDB(refreshToken: string, userId: number): Promise<void> {
        const expiresAt = dayjs().add(14, 'day').toDate();
        await prisma.refresh_tokens.create({
            data: {
                user_id: userId,
                token: refreshToken,
                expires_at: expiresAt,
                is_revoked: false,
                created_at: new Date(),
            },
        });
    }

    static async addToBlackList(
        accessToken: string,
        refreshToken: string,
        user_id: number
    ): Promise<boolean> {
        
        const accessExp = getTokenExpiration(accessToken) ?? new Date();
        const refreshExp = getTokenExpiration(refreshToken) ?? new Date();

        const existing = await prisma.blacklisted_tokens.findMany({
            where: { token: { in: [accessToken, refreshToken] } },
        });
        if (existing.length > 0) {
            throw new BadRequestError("Token Existed");
        }

        await prisma.$transaction(async (tx) => {
            await tx.blacklisted_tokens.create({
                data: {
                    token: accessToken,
                    type: "access",
                    user_id,
                    reason: "logout",
                    expires_at: accessExp,
                },
            });

            await tx.blacklisted_tokens.create({
                data: {
                    token: refreshToken,
                    type: "refresh",
                    user_id,
                    reason: "logout",
                    expires_at: refreshExp,
                },
            });
        });

        return true;
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

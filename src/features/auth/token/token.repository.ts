import dayjs from "dayjs";

import { prisma } from "@/common/db/prisma";
import { BadRequestError } from "@/common/errors/ApiError";
import { getTokenExpiration } from "@/common/utils/jwt";

export class TokenRepository {
  //login
  static async addRefreshTokenToDB(
    refreshToken: string,
    userId: number
  ): Promise<void> {
    const expiresAt = dayjs().add(14, "day").toDate();
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
    const result = await prisma.blacklisted_tokens.findUnique({
      where: { token },
    });
    return !!result;
  }

  static async cleanupExpired(): Promise<void> {
    await prisma.blacklisted_tokens.deleteMany({
      where: {
        expires_at: { lt: new Date() },
      },
    });
  }

  







  //Reset Token
  static async deleteExistedResetToken(email: string): Promise<void> {
    await prisma.reset_tokens.deleteMany({
      where: { email },
    });
  }
  static async createResetToken(
    email: string,
    token: string,
    expiresAt: Date,
    userId: number
  ): Promise<void> {
    await prisma.reset_tokens.create({
      data: {
        email,
        token,
        expires_at: expiresAt,
        created_at: new Date(),
        user_id: userId,
      },
    });
  }

  static async checkResetToken(email: string): Promise<boolean> {
    const result = await prisma.reset_tokens.findFirst({
      where: { email },
    });
    return !!result;
  }

  static async findValidResetToken(
    token: string
  ): Promise<{ id: number; email: string } | null> {
    // JOIN logic <=> JOIN reset_tokens rt ON users.email = rt.email
    const record = await prisma.reset_tokens.findFirst({
      where: { token },
      include: {
        users: {
          select: { id: true, email: true },
        },
      },
    });

    if (!record) return null;

    const now = new Date();
    if (record.expires_at < now) {
      await prisma.reset_tokens.delete({
        where: { token },
      });
      throw new BadRequestError("Reset token has expired");
    }

    return {
      id: record.users?.id ?? 0,
      email: record.email,
    };
  }
}

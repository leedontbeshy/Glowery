import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { signToken, getTokenExpiration } from '@/common/utils/jwt';
import { registerSchema, loginSchema, RegisterInput, LoginInput } from '@/core/user/user.schema';
import { UserRepository } from '@/core/user/user.repository';
import { basePasswordSchema } from '@/common/schemas/common.schema';

import { TokenRepository } from './token/token.repository';
import { ResetTokenService } from './token/token.service';

export class AuthService {
  static async register(data: RegisterInput) {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    const { email, password,username, full_name, phone, address } = parsed.data;

    const existing = await UserRepository.findUserByEmail(email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserRepository.create({
      email,
      username,
      password: hashedPassword,
      full_name,
      address,
      phone,
    });

    return user;
  }

  static async login(data: LoginInput) {
    //Validate input
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    //Tim user
    const { email, password } = parsed.data;

    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Email does not exsit');
    }

    //So sanh pass
    const match = await verifyPassword(user.password, password);
    if (!match) {
      throw new Error('Wrong Password');
    }

    await UserRepository.updateLastLogin(user.id);

    const token = signToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_EXPIRES_IN as string,
    );

    return {
      message: 'Login Sucessfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        status: user.status,
      },
    };
  }

  static async logout(token: string, user_id: number) {
    const expiresAt = getTokenExpiration(token);
    if (!expiresAt) {
      throw new Error('Invalid token or mising expiration');
    }
    await TokenRepository.addToBlackList(token, user_id, expiresAt);
  }

  static async forgotPassword(email: string): Promise<any> {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return {
        success: true,
        message:
          'If the email exists in the system, you will receive an email with instructions to reset your password.',
      };
    }

    const hasOldToken = await TokenRepository.checkResetToken(email);
    if (hasOldToken) {
      await TokenRepository.deleteExistedToken(email);
    }
    const data = await ResetTokenService.createNewResetToken();

    await TokenRepository.createResetToken(email, data.resetToken, data.expiresAt);

    //Lúc sau phát triển lại bằng cách gửi email
    return data;
  }

  static async resetPassword(resetToken: string, newPassword: string) {
    const parsed = basePasswordSchema.safeParse(newPassword);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }
    const data = await TokenRepository.findValidToken(resetToken);
    if (!data) {
      throw new Error('Invalid or expired reset token');
    }
    await UserRepository.updatePasswordByEmail(data.email, newPassword);
    await TokenRepository.deleteExistedToken(data.email);
    return {
      success: true,
      message: 'Password has been reset successfully.',
    };
  }
}

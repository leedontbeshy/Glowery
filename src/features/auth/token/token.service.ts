import * as crypto from 'crypto';
export class ResetTokenService {
  static async createNewResetToken() {
    const resetToken: string = crypto.randomBytes(32).toString('hex');
    const expiresAt: Date = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    return {
      resetToken,
      expiresAt,
    };
  }
}

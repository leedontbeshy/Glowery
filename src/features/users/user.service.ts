import { UserBasic } from '@/features/users/user.type';
import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { UserRepository } from '@/features/users/user.repository';
import { changePasswordSchema, updateUserSchema } from '@/features/users/user.schema';
import { BadRequestError, NotFoundError } from '@/common/errors/ApiError';

import { ChangePasswordDTO, UpdateUserDTO } from './user.dto';

export class UserService {
    static async getUserInfo(userId: number): Promise<UserBasic | null> {
        const user = await UserRepository.findUserById(userId);
        
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        return user;
    }

    static async updateUserInfo(
        userId: number,
        userData: UpdateUserDTO,
    ): Promise<UserBasic | null> {

        const parsed = updateUserSchema.safeParse(userData);
        if (!parsed.success) {

            throw new BadRequestError(parsed.error.issues[0].message);
        }

        const user = await UserRepository.updateUser(userId, parsed.data);
        
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        return user;

    }

    static async updatePassword(userId: number, passwordData: ChangePasswordDTO) {
        // Validate
        const parsed = changePasswordSchema.safeParse(passwordData);
        if (!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message);
        }

        const { old_password, new_password } = parsed.data;


        const oldHashedPassword = await UserRepository.getPasswordById(userId);
        if (!oldHashedPassword) {
            throw new NotFoundError('User not found');
        }

        const isMatch = await verifyPassword(old_password, oldHashedPassword);
        if (!isMatch) {
            throw new BadRequestError('Old password is incorrect');
        }

        const hashedPassword = await hashPassword(new_password);
        await UserRepository.updatePasswordById(userId, hashedPassword);

    }
}

import { UserBasic } from '@/features/users/user.type';
import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { UserRepository } from '@/features/users/user.repository';
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
        // Data already validated by middleware
        // Only business logic validation here
        
        const user = await UserRepository.updateUser(userId, userData);
        
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        return user;

    }

    static async updatePassword(userId: number, passwordData: ChangePasswordDTO) {
        // Data already validated by middleware
        const { old_password, new_password } = passwordData;

        const oldHashedPassword = await UserRepository.getPasswordById(userId);
        if (!oldHashedPassword) {
            throw new NotFoundError('User not found');
        }

        // Business logic validation: Verify old password
        const isMatch = await verifyPassword(old_password, oldHashedPassword);
        if (!isMatch) {
            throw new BadRequestError('Old password is incorrect');
        }

        const hashedPassword = await hashPassword(new_password);
        await UserRepository.updatePasswordById(userId, hashedPassword);

    }
}

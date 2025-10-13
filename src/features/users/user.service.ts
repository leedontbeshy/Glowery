import { UserBasic } from '@/common/types/user.type';
import { UserRepository } from '@/core/user/user.repository';
import { UpdateUserInput, updateUserSchema } from '@/core/user/user.schema';
export class UserService {
    static async getUserInfo(userId: number): Promise<UserBasic | null> {
        const result = await UserRepository.findUserById(userId);
        return result;
    }

    static async updateUserInfo(
        userId: number,
        userData: UpdateUserInput,
    ): Promise<UserBasic | null> {
        try {
            const parsed = updateUserSchema.safeParse(userData);
            if (!parsed.success) {
                throw new Error(parsed.error.issues[0].message);
            }
            const result = await UserRepository.updateUser(userId, userData);
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}

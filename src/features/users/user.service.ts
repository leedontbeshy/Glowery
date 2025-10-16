import { UserBasic } from '@/common/types/user.type';
import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { UserRepository } from '@/core/user/user.repository';
import { ChangePasswordInput, changePasswordSchema, UpdateUserInput, updateUserSchema } from '@/core/user/user.schema';
export class UserService {
    static async getUserInfo(userId: number): Promise<UserBasic | null> {
        const result = await UserRepository.findUserById(userId);
        return result;
    };

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
    };

    static async updatePassword(userId: number, passworData: ChangePasswordInput ){
        try {
            
            const parsed = changePasswordSchema.safeParse(passworData);
            if (!parsed.success) {
                throw new Error(parsed.error.issues[0].message);
            }

            const {old_password, new_password} = parsed.data;
            const oldHashedPassword = await UserRepository.getPasswordById(userId);
            if (!oldHashedPassword) {
                throw new Error('User password not found');
            }

            const isMatch = await verifyPassword(old_password, oldHashedPassword);
            if(!isMatch){
                throw new Error(`Old password is incorrect`)
            }
            
            const hashedPassword = await hashPassword(new_password);
            await UserRepository.updatePasswordById(userId, hashedPassword);
            return {
                message: "Update password sucessfully!"
            };
        } catch (error: any) {
            throw error;
        }
    };
}

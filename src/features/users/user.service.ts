import { UserBasic } from "@/common/types/user.type";
import { UserRepository } from "@/core/user/user.repository";
import { UpdateUserInput } from "@/core/user/user.schema";
export class UserService {
    static async getUserInfo(userId: number):Promise<UserBasic | null>{
        const result = await UserRepository.findUserById(userId);
        return result;
    };

//    static async updateUserInfo(userId: number, userData: UpdateUserInput): Promise<UserBasic | null>{
//     const result = await UserRepository.updateUser(userId, userData);
//     return result;
//    }
}
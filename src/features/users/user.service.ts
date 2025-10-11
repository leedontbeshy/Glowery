import { UserBasic } from "@/common/types/user.type";
import { UserRepository } from "@/core/user/user.repository";
export class UserService {
    static async getUserInfo(userId: number):Promise<UserBasic | null>{
        const result = await UserRepository.findUserById(userId);
        return result;
    };
}
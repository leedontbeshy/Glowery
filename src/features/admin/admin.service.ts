import { PaginatedUsers } from "@/common/types/pagination.type";

import { AdminRepository } from "./admin.repository";

export class AdminService{
    static async getAllUser(queryParams: any):Promise<PaginatedUsers>{
        
        const { page = 1, limit = 20, search} = queryParams;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let users;
        let totalUsers;

        if(search && search.trim()){
            const result = await AdminRepository.searchUser(search.trim(), limit, offset);
            users = result.users;
            totalUsers = result.total;
        }
        else{
            users = await AdminRepository.getAllUser(parseInt(limit), offset);
            totalUsers = await AdminRepository.getTotalUsersCount();
        }
        
        const totalPages = Math.ceil(totalUsers/ parseInt(limit));
        return {
            users,
            pagination:{
                currentPage: page,
                totalPages,
                totalUsers,
                usersPerPage: parseInt(limit),
                hasNext: parseInt(page) < totalPages,
                hasPrev: parseInt(page) > 1,
            }
        }

        

    }
}
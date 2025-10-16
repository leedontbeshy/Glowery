import { UserBasic } from "@/features/users/user.type";

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;

}

export interface PaginatedUsers{
    users: UserBasic[];
    pagination: PaginationInfo;
}
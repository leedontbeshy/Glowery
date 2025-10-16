import { UserRole } from "../constants/user.enums";

export interface JwtPayLoad {
    id: number,
    email: string,
    role: UserRole,
    username?: string,
    iat?: number,
    exp?: number,
}
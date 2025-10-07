import { UserRole, UserStatus } from "../../common/constants/user.enums";

export interface User{
    id: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus,
    email_verified: boolean;
    last_login_at?: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

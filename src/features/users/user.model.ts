import { UserRole, UserStatus } from '@/common/constants/user.enums';

export interface User {
    id: number;
    email: string;
    password: string;
    username?: string | null;
    full_name: string;
    phone?: string | null;
    avatar?: string | null;
    address?: string | null;
    role: UserRole;
    status: UserStatus;
    email_verified: boolean;
    last_login_at?: Date | null;
    created_at: Date 
    updated_at: Date 
    deleted_at: Date | null;
}

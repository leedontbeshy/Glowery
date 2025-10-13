import { User } from '@/core/user/user.model';

export type UserBasic = Pick<
    User,
    | 'id'
    | 'email'
    | 'address'
    | 'phone'
    | 'full_name'
    | 'created_at'
    | 'status'
    | 'username'
    | 'last_login_at'
    | 'role'
>;

export type UpdateUserData = Partial<Pick<User, 'full_name' | 'phone' | 'address'>>;

//export type passwordData = 

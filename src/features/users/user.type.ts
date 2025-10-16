import { User } from '@/features/users/user.model';

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




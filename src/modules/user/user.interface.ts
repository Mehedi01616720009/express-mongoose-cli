import { USER_ROLES } from './user.constant';

type TUserRole = keyof typeof USER_ROLES;

export interface IUser {
    name: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female';
    address: string;
    password: string;
    role: TUserRole;
    status: 'Active' | 'Inactive';
}

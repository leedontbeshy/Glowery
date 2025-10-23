import { prisma } from "@/common/db/prisma";
import { UserBasic } from "@/features/users/user.type";

import { CreateUserDTO } from "../auth/auth.dto";

import { User } from "./user.model";
import { UpdateUserDTO } from "./user.dto";



export class UserRepository {
    static async findUserByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: {email},
            select:{
                id: true,
                address: true,
                phone:true,
                email: true,
                full_name: true,
                role: true,
                password: true,
                status: true,
                username: true
            }
        });
        return user;
    }

    static async create(data: CreateUserDTO): Promise<User> {
        const user = await prisma.users.create({
            data: {
                email: data.email,
                username: data.email,
                password: data.password,
                full_name: data.full_name,
                address: data.address,
                phone: data.phone,
            }     
        });
        return user;
    }

    static async updateLastLogin(userId: number): Promise<void> {
        await prisma.users.update({
            where:{
                id: userId,
            },
            data:{
                last_login_at: new Date(),
            }
        })
    }

    //User feat
    static async findUserById(userId: number): Promise<UserBasic | null> {
        const userFound = await prisma.users.findUnique({
            where:{
                id: userId
            },
            select:{
                id: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                created_at: true,
                status: true,
                full_name: true,
                last_login_at: true,
                role: true
            }
        });
        return userFound;
    }

    static async updateUser(userId: number, userData: UpdateUserDTO):Promise<any> {
    const user = await prisma.users.update({
        where:{
            id: userId
        },
        data: {
            full_name: userData.full_name,
            address: userData.address,
            phone: userData.phone,
            updated_at: new Date(),
        },
        select:{
            id: true,
            username: true,
            email: true,
            full_name: true,
            address: true,
            phone: true,
            updated_at: true
        }
    });
    return user;
    }

    static async updatePasswordById(userId: number, password: string):Promise<void> {
        await prisma.users.update({
            where: {
                id: userId
            },
            data:{
                password: password
            }
        })
    }

    static async getPasswordById(userId: number): Promise<string | null>  {
        const user = await prisma.users.findUnique({
            where:{id: userId},
            select:{
                password: true
            }
        });
        return user ? user.password : null;
    }
}

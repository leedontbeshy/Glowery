import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema, registerInput, loginInput } from '../users/user.schema';
import { UserRepository } from '../users/user.repository';

export class AuthService{

    static async register(data: registerInput){
        const parsed = registerSchema.safeParse(data);
        if(!parsed.success){
            throw new Error(parsed.error.issues[0].message)
        }

        const {email, password, full_name, phone} = parsed.data;
        
        const existing = await UserRepository.findUserByEmail(email);
        if(existing){
            throw new Error("Email already exists")
        }

        const hashedPassword = await argon2.hash(password);

        const user = await UserRepository.create({
            email,
            password: hashedPassword,
            full_name,
            phone
        })

        return user;
    }

    static async login(data: loginInput){
        //Validate input
        const parsed = loginSchema.safeParse(data);
        if(!parsed.success){
            throw new Error(parsed.error.issues[0].message);
        }

        //Tim user
        const {email, password} = parsed.data;

        const user = await UserRepository.findUserByEmail(email)
        if(!user){
            throw new Error("Email does not exsit");
        }

        //So sanh pass
        const match = await argon2.verify(user.password, password);
        if(!match){
            throw new Error("Wrong Password");
        }

        await UserRepository.updateLastLogin(user.id);

        const token = jwt.sign(
        {
            id: user.id, 
            email: user.email, 
            role: user.role 
        }, 
        process.env.JWT_SECRET as string, 
        {
            expiresIn: "7d"
        });

        return{
            message: "Login Sucessfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                status: user.status
            }
        };
    }
}

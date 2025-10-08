import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { signToken, verifyToken } from '@/common/utils/jwt';
import { registerSchema, loginSchema, registerInput, loginInput } from '@/core/user/user.schema';
import { UserRepository } from '@/core/user/user.repository';

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

        const hashedPassword = await hashPassword(password);

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
        const match = await verifyPassword(user.password, password);
        if(!match){
            throw new Error("Wrong Password");
        }

        await UserRepository.updateLastLogin(user.id);

        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_EXPIRES_IN as string)

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

import * as argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await argon2.hash(password);
    } catch (error) {
        throw new Error('Could not hash password');
    }
};

export const verifyPassword = async (plain: string, hashed: string): Promise<boolean> => {
    try {
        return await argon2.verify(hashed, plain);
    } catch {
        return false;
    }
};


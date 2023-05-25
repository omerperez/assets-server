import argon2 from "argon2";
import jwt from "jsonwebtoken";
import userService from "./user.service";

const login = async (mobile: string, password: string): Promise<string> => {
    const user = await userService.findByMobile(mobile);
    try {
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatch: boolean = await argon2.verify(user.password, password);
        if (isPasswordMatch) {
            throw new Error('Incorrect password');
        }
        const { firstName, lastName, mobile, email } = user;
        const { SECRET_TOKEN } = process.env;
        return jwt.sign({ userId: mobile, firstName, lastName, email }, SECRET_TOKEN as string, { expiresIn: '6h' });
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

const verify = (token: string) => {
    try {
        const { SECRET_TOKEN } = process.env;
        const decoded: string | jwt.JwtPayload
            = jwt.verify(token, SECRET_TOKEN as string);
        return decoded;
    } catch (error) {
        console.error('Verify error:', error);
        throw error;
    }
}

const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
}

const authService = {
    login, verify, hashPassword
}

export default authService;
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserJwtPayload } from "../data/interfaces/user.interfaces";
import { IUser } from "../models/interfaces/user.interface";
import userService from "./user.service";

const login = async (mobile: string, password: string): Promise<{
    user: Omit<IUser, 'password'>,
    token: string
}> => {
    const user = await userService.findByMobile(mobile);
    try {
        if (!user) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const isPasswordMatch: boolean = await argon2.verify(user.password, password);
        if (!isPasswordMatch) {
            throw Object.assign(new Error('Incorrect password'), { statusCode: 401 });
        }
        const { password: _, ...userWithoutPassword } = user.toObject();
        const { _id: id, firstName, lastName, mobile: userMobile, email } = userWithoutPassword;
        const { SECRET_TOKEN } = process.env;
        const token = jwt.sign({ id, mobile: userMobile, firstName, lastName, email }, SECRET_TOKEN as string, { expiresIn: '6h' });
        return {
            user: userWithoutPassword,
            token
        };
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
        return decoded as UserJwtPayload;
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
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { CustomError } from "../data/builders/customError";
import { IUserSchema, UserJwtPayload } from "../data/interfaces/user.interfaces";
import userService from "./user.service";

class AuthService {

    async login(mobile: string, password: string): Promise<{
        user: Omit<IUserSchema, 'password'>,
        token: string
    }> {
        try {
            const user = await userService.findByMobile(mobile);
            if (!user) {
                throw new CustomError('User not found', 404);
            }

            const isPasswordMatch = await argon2.verify(user.password, password);
            if (!isPasswordMatch) {
                throw new CustomError('Incorrect password', 401);
            }

            const { _id: id, firstName, lastName, mobile: userMobile, email, apartments, tenants, __v, $locals, $assertPopulated, $clone, $getAllSubdocs, $ignore, ...otherProps } = user.toObject();
            const { SECRET_TOKEN } = process.env;
            const token = jwt.sign({ id, mobile: userMobile, firstName, lastName, email }, SECRET_TOKEN as string, { expiresIn: '6h' });

            const userWithoutPassword = {
                _id: id,
                firstName,
                lastName,
                mobile: userMobile,
                email,
                ...otherProps
            };

            return {
                user: userWithoutPassword,
                token
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    verify(token: string): UserJwtPayload {
        try {
            const { SECRET_TOKEN } = process.env;
            const decoded = jwt.verify(token, SECRET_TOKEN as string);
            return decoded as UserJwtPayload;
        } catch (error) {
            console.error('Verify error:', error);
            throw error;
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }
}

export default new AuthService();

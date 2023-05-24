import userRepository from "../../repositories/user.repo";
import { RegisterUserBody } from "../data/interfaces/user.interfaces";
import authService from "./authentication.service";

const register = async (user: RegisterUserBody) => {
    try {
        const isExistingUser = await userRepository.isExistingUser(user.mobile, user.email);
        if (isExistingUser) {
            throw new Error('Mobile or email already exists');
        }
        const hashPassword = await authService.hashPassword(user.password);
        user.password = hashPassword;
        return await userRepository.createUser(user);
    } catch (error) {
        console.error('Verify error:', error);
        throw error;
    }
}

const userService = {
    register
}

export default userService;
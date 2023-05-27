import { Types } from "mongoose";
import { RegisterUserDto } from "../data/dto/user.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { IUser } from "../models/interfaces/user.interface";
import userRepository from "../repositories/user.repo";
import authService from "./authentication.service";

const findById = async (id: string) => {
    return await userRepository.findById(id);
}

const findByMobile = async (mobile: string): Promise<IUser | null> => {
    return await userRepository.findByMobile(mobile);
}

const register = async (user: RegisterUserDto) => {
    try {
        const isExistingUser = await userRepository.isExistingUser(user.mobile, user.email);
        if (isExistingUser) {
            throw Object.assign(new Error('Mobile or email already exists'), { statusCode: 409 });
        }
        const hashPassword = await authService.hashPassword(user.password);
        user.password = hashPassword;
        return await userRepository.createUser(user);
    } catch (error) {
        console.error('Verify error:', error);
        throw error;
    }
}

const updateUser = async (update: IUser) => {
    return await userRepository.update(update);
}
const addApartment = (user: IUser, apartmentId: Types.ObjectId | IApartmentSchema) => {
    if (!Array.isArray(user.apartments)) {
        user.apartments = [];
    }
    user.apartments.push(apartmentId);
    return user;
}

const userService = {
    findById, findByMobile, register, updateUser, addApartment
}

export default userService;
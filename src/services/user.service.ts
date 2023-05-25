import userRepository from "../repositories/user.repo";
import { RegisterUserBody } from "../data/interfaces/user.interfaces";
import authService from "./authentication.service";
import { IUser } from "../models/interfaces/user.interface";
import { Types } from "mongoose";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";

const findById = async (id: string) => {
    return await userRepository.findById(id);
}

const findByMobile = async (mobile: string) => {
    return await userRepository.findByMobile(mobile);
}

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
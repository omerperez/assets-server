import { RegisterUserBody } from "../data/interfaces/user.interfaces";
import { IUser } from "../models/interfaces/user.interface";
import { UserEntity as userSchema } from "../models/user.entity";

const findById = async (id: string): Promise<IUser | null> => {
    try {
        return await userSchema.findById(id)
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
}


const findByMobile = async (mobile: string): Promise<IUser | null> => {
    try {
        return await userSchema.findOne({ mobile: mobile })
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

const isExistingUser = async (mobile: string, email: string): Promise<boolean> => {
    try {
        const existingUser = await userSchema.findOne({ $or: [{ mobile }, { email }] });
        if (existingUser) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in check if user exist:', error);
        throw error;
    }
}

const createUser = async (user: RegisterUserBody): Promise<IUser> => {
    try {
        const newUser = new userSchema(user);
        const savedUser: IUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error('Error create user:', error);
        throw error;
    }
}

const update = async (user: IUser) => {
    try {
        const currentUser = await userSchema.findById(user._id);
        if (!currentUser) {
            throw new Error('User not found');
        }
        Object.assign(currentUser, user);
        await currentUser.save();
        return currentUser;
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}


const userRepository = {
    findById, findByMobile, isExistingUser, createUser, update,
}

export default userRepository
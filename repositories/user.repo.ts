import { RegisterUserBody } from "../src/data/interfaces/user.interfaces";
import { IUser } from "../src/models/interfaces/user.interface";
import { UserEntity as userSchema } from "../src/models/user.entity";

const findUserByMobile = async (mobile: string): Promise<IUser | null> => {
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

const userRepository = {
    findUserByMobile, isExistingUser, createUser
}

export default userRepository
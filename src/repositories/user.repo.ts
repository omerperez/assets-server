import { RegisterUserDto } from "../data/dto/user.dto";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import { IUser } from "../models/interfaces/user.interface";
import { UserEntity as userSchema } from "../models/user.entity";

const findById = async (id: string): Promise<IUserSchema | null> => {
    try {
        return await userSchema.findById(id).exec();
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
};

const findByMobile = async (mobile: string): Promise<IUser | null> => {
    try {
        return await userSchema.findOne({ mobile });
    } catch (error) {
        console.error('Error finding user by mobile:', error);
        throw error;
    }
};

const isExistingUser = async (mobile: string, email: string): Promise<boolean> => {
    try {
        const existingUser = await userSchema.findOne({ $or: [{ mobile }, { email }] });
        return !!existingUser;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
};

const createUser = async (user: RegisterUserDto): Promise<IUser> => {
    try {
        const newUser = new userSchema(user);
        const savedUser: IUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const updateUser = async (user: IUser): Promise<IUser> => {
    try {
        const currentUser = await userSchema.findById(user._id);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        Object.assign(currentUser, user);
        await currentUser.save();
        return currentUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const userRepository = {
    findById,
    findByMobile,
    isExistingUser,
    createUser,
    update: updateUser,
};

export default userRepository;

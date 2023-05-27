import { UserJwtPayload } from "../data/interfaces/user.interfaces";
import { CreateApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import apartmentRepository from "../repositories/apartment.repo";
import userService from "./user.service";

const create = async (createApartment: CreateApartmentDto, images: string[], user: UserJwtPayload): Promise<IApartmentSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const newApartment = await apartmentRepository.create(createApartment, images, currentUser._id);
        const { _id: apartmentId } = newApartment;
        const updateUser = userService.addApartment(currentUser, apartmentId);
        await userService.updateUser(updateUser)
        return newApartment;
    } catch (error) {
        console.error('Create apartment error:', error);
        throw error;
    }
}

const getAll = async (userId: string) => {
    const user = (await userService.findById(userId)).populate('apartments');
    return (await user).apartments;
}

const findById = async (apartmentId: string, userId: string): Promise<IApartmentSchema> => {
    try {
        const apartment = await apartmentRepository.findById(apartmentId);
        if (apartment.owner.toString() !== userId) {
            throw Object.assign(new Error('Ownership verification failed'), { statusCode: 403 });
        }
        return apartment;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const apartmentService = {
    create, getAll, findById
}

export default apartmentService;
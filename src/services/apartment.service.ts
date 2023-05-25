import { CreateApartmentBody, IApartmentSchema } from "../data/interfaces/apartment.interface";
import apartmentRepository from "../repositories/apartment.repo";
import userService from "./user.service";

const create = async (createApartment: CreateApartmentBody): Promise<IApartmentSchema> => {
    try {
        const { owner: ownerMobile } = createApartment;
        const currentUser = await userService.findByMobile(ownerMobile);
        if (!currentUser) {
            throw new Error('User not found');
        }
        createApartment.owner = currentUser._id;
        const newApartment = await apartmentRepository.create(createApartment);
        const { _id: apartmentId } = newApartment;
        const updateUser = userService.addApartment(currentUser, apartmentId);
        await userService.updateUser(updateUser)
        return newApartment;
    } catch (error) {
        console.error('Create apartment error:', error);
        throw error;
    }
}

const apartmentService = {
    create
}

export default apartmentService;
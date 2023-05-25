import { CreateApartmentBody, IApartmentSchema } from "../data/interfaces/apartment.interface";
import { ApartmentEntity as apartmentSchema } from "../models/apartment.entity";

const findById = async (id: string): Promise<IApartmentSchema | null> => {
    try {
        return await apartmentSchema.findById(id).populate([{ path: 'tenants' }, { path: 'currentTenant' }]);
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
}

const uploadImagesToS3 = async (): Promise<string[]> => {
    return [
        "asd", "asd",
    ]
}

const create = async (createApartment: CreateApartmentBody): Promise<IApartmentSchema> => {
    try {
        const images = await uploadImagesToS3();
        const currentApartment = {
            ...createApartment,
            isDelete: false,
            images,
        };
        const newApartment = new apartmentSchema(currentApartment);
        const savedApartment: IApartmentSchema = await newApartment.save();
        return savedApartment;
    } catch (error) {
        console.error('Error create apartment:', error);
        throw error;
    }
}

const apartmentRepository = {
    findById, create
}

export default apartmentRepository;
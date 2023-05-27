import { Types } from "mongoose";
import { CreateApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { ApartmentEntity as apartmentSchema } from "../models/apartment.entity";

const findById = async (id: string): Promise<IApartmentSchema | null> => {
    try {
        return await apartmentSchema.findById(id)
        // .populate([
        //     { path: 'tenants', options: { omitUndefined: true } },
        //     { path: 'currentTenant', options: { omitUndefined: true } }
        // ]);
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
}

const create = async (createApartment: CreateApartmentDto, images: string[], userId: Types.ObjectId): Promise<IApartmentSchema> => {
    try {
        const currentApartment = {
            ...createApartment,
            isDelete: false,
            images,
            owner: userId,
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
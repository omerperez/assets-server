import { Types } from "mongoose";
import { CreateApartmentDto, EditApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { ApartmentEntity as apartmentSchema } from "../models/apartment.entity";
import { ITenantSchema } from "../data/interfaces/tenant.interface";

const findById = async (id: string): Promise<IApartmentSchema | null> => {
    try {
        const apartment = await apartmentSchema.findById(id)
            .populate([
                { path: 'tenants', options: { omitUndefined: true } },
                { path: 'currentTenant', options: { omitUndefined: true } }
            ]);
        const removeDeletedTenants = apartment.tenants.filter((tenant: ITenantSchema) => tenant.isDelete === false);
        apartment.tenants = removeDeletedTenants;
        const { currentTenant } = apartment;
        if (currentTenant && (currentTenant as ITenantSchema).isDelete) {
            apartment.currentTenant = undefined;
        }
        return apartment;
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

const edit = async (updateApartment: EditApartmentDto, imagesArray: string[], userId: Types.ObjectId): Promise<IApartmentSchema | null> => {
    try {
        const { id, images, ...updatedProperties } = updateApartment;
        const existingApartment = await findById(updateApartment.id);
        if (!existingApartment) {
            throw new Error('Apartment not found');
        }
        const updateObject = {
            ...updateApartment,
            images: updateApartment.images.concat(imagesArray),
            comment: updatedProperties.comment
        }
        delete updateObject.id;
        return await apartmentSchema.findOneAndUpdate(existingApartment._id, updateObject, { new: true });
    } catch (error) {
        console.error('Error edit apartment:', error);
        throw error;
    }
}

const deleteApartment = async (apartmentId: string): Promise<void> => {
    try {
        const existingApartment = await findById(apartmentId);
        if (!existingApartment) {
            throw new Error('Apartment not found');
        }
        const updateObject = {
            isDelete: true
        }
        return await apartmentSchema.findOneAndUpdate(existingApartment._id, updateObject, { new: true });
    } catch (error) {
        console.error('Error edit apartment:', error);
        throw error;
    }
}

const update = async (apartment: IApartmentSchema) => {
    try {
        const currentApartment = await findById(apartment._id);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        Object.assign(currentApartment, apartment);
        await currentApartment.save();
        return currentApartment;
    } catch (error) {
        console.error('Error update apartment:', error);
        throw error;
    }
}

const apartmentRepository = {
    findById, create, edit, deleteApartment, update
}

export default apartmentRepository;
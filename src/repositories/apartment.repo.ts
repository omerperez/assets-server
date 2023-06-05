import { FilterQuery, Types } from "mongoose";
import { CreateApartmentDto, EditApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { ApartmentEntity as apartmentSchema } from "../models/apartment.entity";

const populateApartments = (query: any) => {
    return query.populate([
        { path: 'tenants', options: { omitUndefined: true } },
        { path: 'currentTenant', options: { omitUndefined: true } }
    ]);
};

const find = async (filter: FilterQuery<IApartmentSchema>, selectText?: string): Promise<IApartmentSchema[]> => {
    try {
        let query = apartmentSchema.find(filter);
        if (selectText) {
            query = query.select(selectText);
        }
        const apartments = await populateApartments(query);
        return apartments;
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
};

const findById = async (id: string | Types.ObjectId): Promise<IApartmentSchema | null> => {
    try {
        const apartment = await populateApartments(apartmentSchema.findById(id));
        return removeDeletedObjectsFromApartment(apartment);
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
};

const removeDeletedObjectsFromApartment = (apartment: IApartmentSchema): IApartmentSchema => {
    if (apartment) {
        apartment.tenants = apartment.tenants.filter((tenant: ITenantSchema) => !tenant.isDelete);
        if (apartment.currentTenant && (apartment.currentTenant as ITenantSchema).isDelete) {
            apartment.currentTenant = undefined;
        }
    }
    return apartment;
};

const create = async (apartmentData: CreateApartmentDto, images: string[], userId: Types.ObjectId): Promise<IApartmentSchema> => {
    try {
        const newApartment = new apartmentSchema({
            ...apartmentData,
            isDeleted: false,
            images,
            owner: userId,
            tenants: [],
        });
        const savedApartment = await newApartment.save();
        return savedApartment;
    } catch (error) {
        console.error('Error creating apartment:', error);
        throw error;
    }
};

const edit = async (updateApartment: EditApartmentDto, imagesArray: string[], userId: Types.ObjectId): Promise<IApartmentSchema | null> => {
    try {
        const { id, images, ...updatedProperties } = updateApartment;
        const existingApartment = await findById(updateApartment.id);
        if (!existingApartment) {
            throw new Error(`Apartment with ID ${updateApartment.id} not found`);
        }
        const updateObject = {
            ...updateApartment,
            images: updateApartment.images.concat(imagesArray),
            comment: updatedProperties.comment
        };
        delete updateObject.id;
        return await apartmentSchema.findByIdAndUpdate(existingApartment._id, updateObject, { new: true });
    } catch (error) {
        console.error('Error editing apartment:', error);
        throw error;
    }
};

const update = async (apartmentId: string | Types.ObjectId, updateObject: Partial<IApartmentSchema>): Promise<IApartmentSchema | null> => {
    try {
        const currentApartment = await findById(apartmentId);
        if (!currentApartment) {
            throw Object.assign(new Error(`Apartment with ID ${apartmentId} not found`), { statusCode: 404 });
        }
        return await apartmentSchema.findByIdAndUpdate(currentApartment._id, updateObject, { new: true });
    } catch (error) {
        console.error('Error updating apartment:', error);
        throw error;
    }
};

const deleteApartment = async (apartmentId: string): Promise<void> => {
    try {
        const existingApartment = await findById(apartmentId);
        if (!existingApartment) {
            throw new Error(`Apartment with ID ${apartmentId} not found`);
        }
        const updateObject = {
            isDeleted: true
        };
        await apartmentSchema.findByIdAndUpdate(existingApartment._id, updateObject);
    } catch (error) {
        console.error('Error deleting apartment:', error);
        throw error;
    }
};

const apartmentRepository = {
    findById,
    create,
    edit,
    deleteApartment,
    update,
    find
};

export default apartmentRepository;

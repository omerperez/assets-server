import { FilterQuery, Types } from "mongoose";
import { CreateApartmentDto, EditApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { UserJwtPayload } from "../data/interfaces/user.interfaces";
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
        await userService.addApartment(currentUser, apartmentId);
        return newApartment;
    } catch (error) {
        console.error('Create apartment error:', error);
        throw error;
    }
}

const getAll = async (userId: string) => {
    const user = (await userService.findById(userId)).populate('apartments');
    const apartments = (await user).apartments as IApartmentSchema[];
    return apartments.filter((apartment) => !apartment.isDelete)
}

const find = async (userId: string, findObject: FilterQuery<IApartmentSchema>, selectText?: string): Promise<(IApartmentSchema)[]> => {
    try {
        const apartments = await apartmentRepository.find({
            ...findObject,
            owner: userId
        }, selectText);
        if (!apartments || apartments.length === 0) {
            throw Object.assign(new Error('Apartments not found'), { statusCode: 404 });
        }
        return apartments;
    } catch (error) {
        console.error('Error finding apartment service:', error);
        throw error;
    }
}

const findById = async (apartmentId: string, userMobile: string): Promise<IApartmentSchema> => {
    try {
        const apartment = await apartmentRepository.findById(apartmentId);
        const user = await userService.findByMobile(userMobile);
        if (!apartment.owner.equals(user._id)) {
            throw Object.assign(new Error('Ownership verification failed'), { statusCode: 403 });
        }
        return apartment;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const edit = async (updateApartment: EditApartmentDto, images: string[], user: UserJwtPayload): Promise<IApartmentSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        return await apartmentRepository.edit(updateApartment, images, currentUser._id);
    } catch (error) {
        console.error('Create apartment error:', error);
        throw error;
    }
}

const deleteApartment = async (apartmentId: string, user: UserJwtPayload): Promise<void> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        if (!currentUser.apartments.find((apartment: Types.ObjectId) => apartment.equals(apartmentId))) {
            throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
        }
        return await apartmentRepository.deleteApartment(apartmentId);
    } catch (error) {
        console.error('Delete apartment error:', error);
        throw error;
    }
}

const update = async (apartmentId: string | Types.ObjectId, updateObject: Partial<IApartmentSchema>): Promise<IApartmentSchema | null> => {
    return await apartmentRepository.update(apartmentId, updateObject);
}

const addTenant = async (apartment: IApartmentSchema, tenantId: Types.ObjectId | ITenantSchema) => {
    if (!Array.isArray(apartment.tenants)) {
        apartment.tenants = [];
    }
    if (apartment.currentTenant) {
        apartment.tenants.push(apartment.currentTenant);
    }
    apartment.tenants.push(tenantId);
    return await update(apartment._id, {
        currentTenant: tenantId,
        tenants: apartment.tenants,
    });
}

const apartmentService = {
    create, getAll, findById, edit, deleteApartment, update, addTenant, find
}

export default apartmentService;
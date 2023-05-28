import { Types } from "mongoose";
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
        return await apartmentRepository.deleteApartment(apartmentId, currentUser._id);
    } catch (error) {
        console.error('Create apartment error:', error);
        throw error;
    }
}

const update = async (apartment: IApartmentSchema) => {
    return await apartmentRepository.update(apartment);
}

const addTenant = async (apartment: IApartmentSchema, tenantId: Types.ObjectId | ITenantSchema) => {
    const currentTenant = apartment.currentTenant;
    if (!currentTenant) {
        apartment.currentTenant = tenantId;
        return await update(apartment);
    } else if (!Array.isArray(apartment.tenants)) {
        apartment.tenants = [];
    }
    apartment.tenants.push(currentTenant);
    apartment.currentTenant = tenantId;
    return await update(apartment);
}

const apartmentService = {
    create, getAll, findById, edit, deleteApartment, update, addTenant
}

export default apartmentService;
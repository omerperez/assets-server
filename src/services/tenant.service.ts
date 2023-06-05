import { Types } from "mongoose";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import tenantRepository from "../repositories/tenant.repo";
import apartmentService from "./apartment.service";
import userService from "./user.service";

const findById = async (tenantId: string | Types.ObjectId) => {
    return await tenantRepository.findById(tenantId);
}

const create = async (tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const currentApartment = await apartmentService.findById(tenant.apartmentId, user.mobile);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        const newTenant = await tenantRepository.create(tenant, currentApartment._id, currentUser);
        const { _id: tenantId } = newTenant;
        await userService.addTenant(currentUser, tenantId);
        await apartmentService.addTenant(currentApartment, tenantId);
        return newTenant;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}

const update = async (tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const currentApartment = await apartmentService.findById(tenant.apartmentId, user.mobile);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        const updateTenant = await tenantRepository.update(tenant, currentUser);
        return updateTenant;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}

const changeTenant = async (tenantId: string, apartmentId: string, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const findTenant = await tenantRepository.findById(tenantId);
        if (!findTenant) {
            throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
        }
        const currentApartment = await apartmentService.findById(apartmentId, user.mobile);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        await apartmentService.update(currentApartment._id, {
            currentTenant: findTenant._id,
        })
        return findTenant;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}


const deleteTenant = async (tenantId: string, user: IUserSchema): Promise<void> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const currentTenant = currentUser.tenants.find((tenant: Types.ObjectId) => tenant.equals(tenantId));
        if (!currentTenant) {
            throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
        }
        return await tenantRepository.deleteTenant(tenantId);
    } catch (error) {
        console.error('Delete tenant error:', error);
        throw error;
    }
}

const tenantService = {
    findById, create, update, changeTenant, deleteTenant
}

export default tenantService;
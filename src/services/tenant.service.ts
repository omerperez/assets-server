import { Types } from "mongoose";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import tenantRepository from "../repositories/tenant.repo";
import apartmentService from "./apartment.service";
import userService from "./user.service";
import { CustomError } from "../data/builders/customError";

class TenantService {
    async findById(tenantId: string | Types.ObjectId): Promise<ITenantSchema> {
        return await tenantRepository.findById(tenantId);
    }

    async create(tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            const currentApartment = await apartmentService.findById(tenant.apartmentId, user.mobile);
            if (!currentApartment) {
                throw new CustomError('Apartment not found', 404);
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

    async update(tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            const currentApartment = await apartmentService.findById(tenant.apartmentId, user.mobile);
            if (!currentApartment) {
                throw new CustomError('Apartment not found', 404);
            }
            const updateTenant = await tenantRepository.update(tenant, currentUser);
            return updateTenant;
        } catch (error) {
            console.error('Create tenant error:', error);
            throw error;
        }
    }

    async changeTenant(tenantId: string, apartmentId: string, user: IUserSchema): Promise<ITenantSchema> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            if (!currentUser) {
                throw new CustomError('User not found', 404);
            }
            const findTenant = await tenantRepository.findById(tenantId);
            if (!findTenant) {
                throw new CustomError('Tenant not found', 404);

            }
            const currentApartment = await apartmentService.findById(apartmentId, user.mobile);
            if (!currentApartment) {
                throw new CustomError('Apartment not found', 404);
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

    async deleteTenant(tenantId: string, user: IUserSchema): Promise<void> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            if (!currentUser) {
                throw new CustomError('User not found', 404);
            }
            const currentTenant = currentUser.tenants.find((tenant: Types.ObjectId) => tenant.equals(tenantId));
            if (!currentTenant) {
                throw new CustomError('Access Denied', 401);
            }
            return await tenantRepository.deleteTenant(tenantId);
        } catch (error) {
            console.error('Delete tenant error:', error);
            throw error;
        }
    }
}

export default new TenantService();

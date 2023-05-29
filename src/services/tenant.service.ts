import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { UserJwtPayload } from "../data/interfaces/user.interfaces";
import tenantRepository from "../repositories/tenant.repo";
import apartmentService from "./apartment.service";
import userService from "./user.service";

const create = async (tenant: CreateTenantDto, user: UserJwtPayload): Promise<ITenantSchema> => {
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

const update = async (tenant: CreateTenantDto, user: UserJwtPayload): Promise<ITenantSchema> => {
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

const tenantService = {
    create, update
}

export default tenantService;
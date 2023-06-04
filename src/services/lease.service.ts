import { EditExpenseDto } from "../data/dto/expense.dto";
import { CreateLeaseDto } from "../data/dto/lease.dto";
import { ILeaseSchema } from "../data/interfaces/lease.interface";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { UserJwtPayload } from "../data/interfaces/user.interfaces";
import leaseRepository from "../repositories/lease.repo";
import leaseApartmentRepository from "../repositories/lease_apartment.repo";
import apartmentService from "./apartment.service";
import userService from "./user.service";

const create = async (lease: CreateLeaseDto, files: string[], user: UserJwtPayload): Promise<ILeaseSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const currentApartment = await apartmentService.findById(lease.apartmentId, user.mobile);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        const currentTenant = currentApartment.currentTenant as ITenantSchema;
        const tenants = currentApartment.tenants as ITenantSchema[];
        if (!currentTenant._id.equals(lease.tenantId) && !tenants.find((tenant) => tenant._id.equals(lease.tenantId))) {
            throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
        }
        const newLease = await leaseRepository.create(lease, files);
        await leaseApartmentRepository.create(
            currentApartment._id, lease.tenantId, newLease._id, currentUser._id
        )
        return newLease;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}

const update = async (updateExpense: EditExpenseDto, files: string[], user: UserJwtPayload): Promise<ILeaseSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const expense = await leaseRepository.update(updateExpense, files);
        return expense;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}

const leaseService = {
    create, update,
}

export default leaseService;
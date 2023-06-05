import { FilterQuery } from "mongoose";
import { CustomError } from "../data/builders/customError";
import { EditExpenseDto } from "../data/dto/expense.dto";
import { CreateLeaseDto } from "../data/dto/lease.dto";
import { ILeaseSchema } from "../data/interfaces/lease.interface";
import { ILeaseApartmentSchema } from "../data/interfaces/relationship.interface";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import leaseRepository from "../repositories/lease.repo";
import leaseApartmentRepository from "../repositories/lease_apartment.repo";
import apartmentService from "./apartment.service";
import userService from "./user.service";

class LeaseService {
    async create(lease: CreateLeaseDto, files: string[], user: IUserSchema): Promise<ILeaseSchema> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            const currentApartment = await apartmentService.findById(lease.apartmentId, user.mobile);
            if (!currentApartment) {
                throw new CustomError('Apartment not found', 404);
            }
            const currentTenant = currentApartment.currentTenant as ITenantSchema;
            const tenants = currentApartment.tenants as ITenantSchema[];
            if (!currentTenant._id.equals(lease.tenantId) && !tenants.find((tenant) => tenant._id.equals(lease.tenantId))) {
                throw new CustomError('Tenant not found', 404);
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

    async update(updateExpense: EditExpenseDto, files: string[], user: IUserSchema): Promise<ILeaseSchema> {
        try {
            const { id: ownerId } = user;
            const currentUser = await userService.findById(ownerId);
            if (!currentUser) {
                throw new CustomError('User not found', 404);
            }
            const expense = await leaseRepository.update(updateExpense, files);
            return expense;
        } catch (error) {
            console.error('Create tenant error:', error);
            throw error;
        }
    }

    async find(findObject: FilterQuery<ILeaseApartmentSchema>): Promise<ILeaseApartmentSchema[]> {
        return await leaseApartmentRepository.find(findObject);
    }

    async findPopulatedLeaseApartments(findObject: FilterQuery<ILeaseApartmentSchema>): Promise<ILeaseApartmentSchema[]> {
        return await leaseApartmentRepository.findPopulatedLeasesApartment(findObject);
    }
}

export default new LeaseService();

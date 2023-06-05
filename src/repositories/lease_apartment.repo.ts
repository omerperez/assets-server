import { FilterQuery, Types } from "mongoose";
import { ILeaseApartmentSchema } from "../data/interfaces/relationship.interface";
import { LeaseApartmentEntity as leaseApartmentSchema } from "../models/leaseApartment.entity";

const createLeaseApartment = async (apartmentId: Types.ObjectId | string, tenantId: Types.ObjectId | string, leaseId: Types.ObjectId | string, ownerId: Types.ObjectId | string): Promise<ILeaseApartmentSchema> => {
    try {
        const newLeaseApartment = new leaseApartmentSchema({
            lease: leaseId,
            apartment: apartmentId,
            owner: ownerId,
            tenant: tenantId
        });

        return await newLeaseApartment.save();
    } catch (error) {
        console.error('Error creating lease relationship:', error);
        throw error;
    }
};

const findLeaseApartments = async (findObject: FilterQuery<ILeaseApartmentSchema>): Promise<ILeaseApartmentSchema[]> => {
    try {
        return await leaseApartmentSchema.find(findObject);
    } catch (error) {
        console.error('Error finding lease apartments:', error);
        throw error;
    }
};

const findPopulatedLeaseApartments = async (findObject: FilterQuery<ILeaseApartmentSchema>): Promise<ILeaseApartmentSchema[]> => {
    try {
        const leaseApartments = await findLeaseApartments(findObject);
        return leaseApartmentSchema.populate(leaseApartments, [
            { path: 'apartment', select: 'name' }
        ]);
    } catch (error) {
        console.error('Error finding populated lease apartments:', error);
        throw error;
    }
};

const leaseApartmentRepository = {
    create: createLeaseApartment,
    find: findLeaseApartments,
    findPopulatedLeasesApartment: findPopulatedLeaseApartments
};

export default leaseApartmentRepository;

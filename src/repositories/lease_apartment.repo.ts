import { Types } from "mongoose";
import { ILeaseApartmentSchema } from "../data/interfaces/relationship.interface";
import { LeaseApartmentEntity as leaseApartmentSchema } from "../models/leaseApartment.entity";

const create = async (apartmentId: Types.ObjectId | string, tenantId: Types.ObjectId | string, leaseId: Types.ObjectId | string, ownerId: Types.ObjectId | string): Promise<ILeaseApartmentSchema> => {
    try {
        const newExpense = new leaseApartmentSchema({
            lease: leaseId,
            apartment: apartmentId,
            owner: ownerId,
            tenant: tenantId
        })
        const savedObject: ILeaseApartmentSchema = await newExpense.save();
        return savedObject;
    } catch (error) {
        console.error('Error create lease relationship:', error);
        throw error;
    }
}

const leaseApartmentRepository = {
    create
}

export default leaseApartmentRepository
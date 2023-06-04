import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ILeaseApartmentSchema } from "../data/interfaces/relationship.interface";


const leaseApartment = new MongooseSchema<ILeaseApartmentSchema>({
    lease: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Lease'
    },
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    },
    tenant: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tenant'
    },
    owner: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    }
})

const LeaseApartmentEntity = mongoose.model<ILeaseApartmentSchema>('LeaseApartment', leaseApartment);
export { LeaseApartmentEntity };


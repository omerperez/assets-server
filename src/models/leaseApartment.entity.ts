import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ILeaseApartment } from "./interfaces/relationship.interface";


const leaseApartment = new MongooseSchema<ILeaseApartment>({
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

const LeaseApartmentEntity = mongoose.model<ILeaseApartment>('LeaseApartment', leaseApartment);
export { LeaseApartmentEntity };


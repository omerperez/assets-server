import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ITenantApartment } from "../data/interfaces/relationship.interface";


const tenantApartmentSchema = new MongooseSchema<ITenantApartment>({
    tenant: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tenant'
    },
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    }
})

const tenantApartmentEntity = mongoose.model<ITenantApartment>('TenantApartment', tenantApartmentSchema);
export { tenantApartmentEntity };


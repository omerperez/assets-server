import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ITenant } from "./interfaces/tenant.interface";

const tenantSchema = new MongooseSchema<ITenant>({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    anotherMobile: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: Number,
        required: true,
    },
    birthday: {
        type: Date,
        required: false,
    },
    enteryDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    },
    owner: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    }
})

const TenantEntity = mongoose.model<ITenant>('Tenant', tenantSchema);

export { TenantEntity };
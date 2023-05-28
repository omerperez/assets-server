import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ITenantSchema } from "../data/interfaces/tenant.interface";

const tenantSchema = new MongooseSchema<ITenantSchema>({
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
        type: String,
        required: false,
    },
    enteryDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    isDelete: {
        type: Boolean,
        required: true,
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

const TenantEntity = mongoose.model<ITenantSchema>('Tenant', tenantSchema);

export { TenantEntity };

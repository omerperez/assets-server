import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";

const apartmentSchema = new MongooseSchema<IApartmentSchema>({
    owner: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    floor: {
        type: Number,
        require: false,
    },
    apartmentNumber: {
        type: Number,
        require: false,
    },
    postCode: {
        type: String,
        require: false,
    },
    price: {
        type: Number,
        require: true,
    },
    area: {
        type: Number,
        require: true,
    },
    toiletCount: {
        type: Number,
        require: true,
    },
    isAnimalsConfirm: {
        type: Number,
        require: true,
    },
    includedPayments: {
        type: [String],
        require: false,
    },
    images: {
        type: [String],
        require: false,
    },
    mainImageIndex: {
        type: Number,
        require: false,
    },
    comment: {
        type: String,
        require: false,
    },
    currentTenant: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tenant'
    },
    tenants: [{
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tenant'
    }],
    expenses: [{
        type: MongooseSchema.Types.ObjectId,
        ref: 'Expense'
    }],
    currentLease: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Lease'
    },
    isDelete: {
        type: Boolean,
        required: true
    },
})
const ApartmentEntity = mongoose.model<IApartmentSchema>('Apartment', apartmentSchema);
export { ApartmentEntity };

import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IApartment } from "./interfaces/apartment.interface";

const apartmentSchema = new MongooseSchema<IApartment>({
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
    isDelete: {
        type: Boolean,
        required: true
    },
    currentTenant: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tenant'
    },
})
const ApartmentEntity = mongoose.model<IApartment>('Apartment', apartmentSchema);
export { ApartmentEntity };

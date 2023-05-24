import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IUser } from "./interfaces/user.interface";

const userSchema = new MongooseSchema<IUser>({
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
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    apartments: [
        {
            type: MongooseSchema.Types.ObjectId,
            ref: 'Apartment'
        }
    ],
    tenants: [
        {
            type: MongooseSchema.Types.ObjectId,
            ref: 'Tenant'
        }
    ]
})

const UserEntity = mongoose.model<IUser>('User', userSchema);

export { UserEntity };
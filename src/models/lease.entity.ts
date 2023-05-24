import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ILease } from "./interfaces/lease.interface";

const leaseSchema = new MongooseSchema<ILease>({
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    files: {
        type: [String],
        require: false,
    },
    editDate: {
        type: Date,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        require: true,
    },
}, {
    timestamps: { createdAt: 'createDate' },
})

const LeaseEntity = mongoose.model<ILease>('Lease', leaseSchema);
export { LeaseEntity };

import mongoose, { Schema as MongooseSchema } from "mongoose";
import { ILeaseSchema } from "../data/interfaces/lease.interface";

const leaseSchema = new MongooseSchema<ILeaseSchema>({
    startDate: {
        type: String,
        require: true,
    },
    endDate: {
        type: String,
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
    createDate: {
        type: Date,
        require: true,
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

const LeaseEntity = mongoose.model<ILeaseSchema>('Lease', leaseSchema);
export { LeaseEntity };

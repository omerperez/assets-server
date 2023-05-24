import { Document } from 'mongoose';

interface ILease extends Document {
    startDate: Date;
    endDate: Date;
    price: number;
    files: string[];
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
}

export { ILease };

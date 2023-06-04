import { Document } from 'mongoose';

interface ILeaseSchema extends Document {
    startDate: string;
    endDate: string;
    price: number;
    files: string[];
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
}

export { ILeaseSchema };

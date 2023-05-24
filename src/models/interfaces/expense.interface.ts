import { Document, Types } from 'mongoose';
import { IApartment } from './apartment.interface';

interface IExpense extends Document {
    name: string;
    price: number;
    description?: string;
    files?: string[]
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
    apartment: IApartment | Types.ObjectId;
}

export { IExpense }
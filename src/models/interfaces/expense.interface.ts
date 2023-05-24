import { Document, Types } from 'mongoose';
import { IApartment } from './apartment.interface';

interface IExpense extends Document {
    name: string;
    price: number;
    description?: string;
    files?: string[]
    apartment: IApartment | Types.ObjectId;
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
    isExpense: boolean;
}

export { IExpense };

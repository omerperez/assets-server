import { Document, Types } from 'mongoose';
import { IApartmentSchema } from '../../data/interfaces/apartment.interface';

interface IExpense extends Document {
    name: string;
    price: number;
    description?: string;
    files?: string[]
    apartment: IApartmentSchema | Types.ObjectId;
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
    isExpense: boolean;
}

export { IExpense };

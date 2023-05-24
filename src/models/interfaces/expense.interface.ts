import { Document } from 'mongoose';

interface IExpense extends Document {
    name: string;
    price: number;
    description?: string;
    files?: string[]
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
    isExpense: boolean;
}

export { IExpense };

import { Document, Types } from 'mongoose';
import { IUser } from '../../models/interfaces/user.interface';
import { IExpense } from '../../models/interfaces/expense.interface';
import { ILease } from '../../models/interfaces/lease.interface';
import { ITenantSchema } from './tenant.interface';

interface IApartmentSchema extends Document {
    owner: Types.ObjectId | IUser;
    name: string;
    city: string;
    neighborhood?: string;
    street: string;
    number: number;
    floor?: number;
    apartmentNumber?: number;
    postCode?: string;
    price: number;
    area: number;
    rooms: number;
    toiletCount: number;
    isAnimalsConfirm: number;
    includedPayments: string[];
    images: string[]
    mainImageIndex: number;
    comment?: string;
    currentTenant?: Types.ObjectId | ITenantSchema;
    tenants: (Types.ObjectId | ITenantSchema)[];
    expenses: (Types.ObjectId | IExpense)[];
    currentLease: (Types.ObjectId | ILease);
    isDelete: boolean;
}

export { IApartmentSchema };

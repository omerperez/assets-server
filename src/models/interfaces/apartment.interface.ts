import { Document, Types } from 'mongoose';
import { ITenant } from './tenant.interface';
import { IUser } from './user.interface';
import { IExpense } from './expense.interface';
import { ILease } from './lease.interface';

interface IApartment extends Document {
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
    toiletCount: number;
    isAnimalsConfirm: number;
    includedPayments: string[];
    images: string[]
    mainImageIndex: number;
    comment?: string;
    currentTenant: Types.ObjectId | ITenant;
    tenants: (Types.ObjectId | ITenant)[];
    expenses: (Types.ObjectId | IExpense)[];
    currentLease: (Types.ObjectId | ILease);
    isDelete: boolean;
}

export { IApartment };

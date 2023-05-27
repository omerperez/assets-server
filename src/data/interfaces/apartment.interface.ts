import { Document, Types } from 'mongoose';
import { ITenant } from '../../models/interfaces/tenant.interface';
import { IUser } from '../../models/interfaces/user.interface';
import { IExpense } from '../../models/interfaces/expense.interface';
import { ILease } from '../../models/interfaces/lease.interface';

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
    currentTenant: Types.ObjectId | ITenant;
    tenants: (Types.ObjectId | ITenant)[];
    expenses: (Types.ObjectId | IExpense)[];
    currentLease: (Types.ObjectId | ILease);
    isDelete: boolean;
}

export { IApartmentSchema };

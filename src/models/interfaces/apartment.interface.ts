import { Document, Types } from 'mongoose';
import { IUser } from './user.interface';
import { ITenant } from './tenant.interface';

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
    isDelete: boolean;
    currentTenant: Types.ObjectId | ITenant;
    tenants: (Types.ObjectId | ITenant)[]
}

export { IApartment };

import { Document, Types } from 'mongoose';
import { IApartment } from './apartment.interface';
import { IUser } from './user.interface';

interface ITenant extends Document {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    anotherMobile: string;
    email: string;
    gender: number;
    birthday: Date,
    enteryDate: Date,
    endDate: Date,
    apartment: Types.ObjectId | IApartment
    owner: Types.ObjectId | IUser
}

export { ITenant };

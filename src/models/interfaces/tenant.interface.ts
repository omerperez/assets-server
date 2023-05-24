import { Document, Types } from 'mongoose';
import { IUser } from './user.interface';
import { IApartmentSchema } from '../../data/interfaces/apartment.interface';

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
    apartment: Types.ObjectId | IApartmentSchema
    owner: Types.ObjectId | IUser
}

export { ITenant };

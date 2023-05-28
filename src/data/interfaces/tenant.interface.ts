import { Document, Types } from 'mongoose';
import { IApartmentSchema } from '../../data/interfaces/apartment.interface';
import { IUserSchema } from './user.interfaces';

interface ITenantSchema extends Document {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    anotherMobile: string;
    email: string;
    gender: number;
    birthday: string,
    enteryDate: string,
    endDate: string,
    isDelete: boolean,
    apartment: Types.ObjectId | IApartmentSchema
    owner: Types.ObjectId | IUserSchema
}

export { ITenantSchema };

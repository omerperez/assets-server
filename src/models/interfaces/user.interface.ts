import { Document, Types } from 'mongoose';
import { ITenant } from './tenant.interface';
import { IApartmentSchema } from '../../data/interfaces/apartment.interface';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    apartments: (IApartmentSchema | Types.ObjectId)[];
    tenants: (ITenant | Types.ObjectId)[];
}

export { IUser };

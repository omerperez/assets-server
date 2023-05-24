import { Document, Types } from 'mongoose';
import { IApartment } from './apartment.interface';
import { ITenant } from './tenant.interface';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    apartments: (IApartment | Types.ObjectId)[];
    tenants: (ITenant | Types.ObjectId)[];
}

export { IUser };

import { Document, Types } from 'mongoose';
import { ITenantSchema } from '../../data/interfaces/tenant.interface';
import { IApartmentSchema } from '../../data/interfaces/apartment.interface';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    apartments: (IApartmentSchema | Types.ObjectId)[];
    tenants: (ITenantSchema | Types.ObjectId)[];
}

export { IUser };

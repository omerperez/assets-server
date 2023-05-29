import { Document, Types } from 'mongoose';
import { IApartmentSchema } from './apartment.interface';
import { ITenantSchema } from "./tenant.interface";


interface IUserSchema extends Document {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    apartments: (IApartmentSchema | Types.ObjectId)[];
    tenants: (ITenantSchema | Types.ObjectId)[];
}

interface UserJwtPayload {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    email: string;
}

export { IUserSchema, UserJwtPayload }
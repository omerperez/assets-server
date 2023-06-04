import { Types } from "mongoose"
import { IExpenseSchema } from "../interfaces/expense.interface"
import { ITenantSchema } from "../interfaces/tenant.interface"
import { ILeaseSchema } from "./lease.interface"
import { IUser } from "../../models/interfaces/user.interface"
import { IApartmentSchema } from "../interfaces/apartment.interface"

interface IExpenseApartmentSchema {
    apartment: IApartmentSchema | Types.ObjectId;
    expense: IExpenseSchema | Types.ObjectId;
    owner: IUser | Types.ObjectId;
}

interface ITenantApartment {
    apartment: IApartmentSchema | Types.ObjectId;
    tenant: ITenantSchema | Types.ObjectId;
}

interface ILeaseApartmentSchema {
    apartment: IApartmentSchema | Types.ObjectId;
    lease: ILeaseSchema | Types.ObjectId;
    tenant: ITenantSchema | Types.ObjectId;
    owner: IUser | Types.ObjectId;
}

export { IExpenseApartmentSchema, ITenantApartment, ILeaseApartmentSchema };
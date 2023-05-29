import { Types } from "mongoose"
import { IExpense } from "./expense.interface"
import { ITenantSchema } from "../../data/interfaces/tenant.interface"
import { ILease } from "./lease.interface"
import { IUser } from "./user.interface"
import { IApartmentSchema } from "../../data/interfaces/apartment.interface"

interface IExpenseApartment {
    apartment: IApartmentSchema | Types.ObjectId;
    expenses: IExpense | Types.ObjectId;
    owner: IUser | Types.ObjectId;
}

interface ITenantApartment {
    apartment: IApartmentSchema | Types.ObjectId;
    tenant: ITenantSchema | Types.ObjectId;
}

interface ILeaseApartment {
    apartment: IApartmentSchema | Types.ObjectId;
    lease: ILease | Types.ObjectId;
    tenant: ITenantSchema | Types.ObjectId;
    owner: IUser | Types.ObjectId;
}

export { IExpenseApartment, ITenantApartment, ILeaseApartment };
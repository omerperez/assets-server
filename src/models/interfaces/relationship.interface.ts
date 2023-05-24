import { Types } from "mongoose"
import { IExpense } from "./expense.interface"
import { ITenant } from "./tenant.interface"
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
    tenant: ITenant | Types.ObjectId;
}

interface ILeaseApartment {
    apartment: IApartmentSchema | Types.ObjectId;
    lease: ILease | Types.ObjectId;
    tenant: ITenant | Types.ObjectId;
    owner: IUser | Types.ObjectId;
}

export { IExpenseApartment, ITenantApartment, ILeaseApartment };
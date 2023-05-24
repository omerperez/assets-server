import { Types } from "mongoose"
import { IApartment } from "./apartment.interface"
import { IExpense } from "./expense.interface"
import { ITenant } from "./tenant.interface"
import { ILease } from "./lease.interface"

interface IExpenseApartment {
    apartment: IApartment | Types.ObjectId
    expenses: IExpense | Types.ObjectId
}

interface ITenantApartment {
    apartment: IApartment | Types.ObjectId
    tenant: ITenant | Types.ObjectId
}

interface ILeaseApartment {
    apartment: IApartment | Types.ObjectId;
    lease: ILease | Types.ObjectId
}

export { IExpenseApartment, ITenantApartment, ILeaseApartment };
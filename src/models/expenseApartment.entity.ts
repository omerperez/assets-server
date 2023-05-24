import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IExpenseApartment } from "./interfaces/relationship.interface";


const expenseApartment = new MongooseSchema<IExpenseApartment>({
    expenses: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Expense'
    },
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    }
})

const ExpenseApartmentEntity = mongoose.model<IExpenseApartment>('ExpenseApartment', expenseApartment);
export { ExpenseApartmentEntity };


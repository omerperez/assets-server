import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IExpenseApartmentSchema } from "../data/interfaces/relationship.interface";

const expenseApartment = new MongooseSchema<IExpenseApartmentSchema>({
    expense: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Expense'
    },
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    },
    owner: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    }
})

const ExpenseApartmentEntity = mongoose.model<IExpenseApartmentSchema>('ExpenseApartment', expenseApartment);
export { ExpenseApartmentEntity };


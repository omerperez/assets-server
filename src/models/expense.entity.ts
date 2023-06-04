import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IExpenseSchema, } from "../data/interfaces/expense.interface";

const expenseSchema = new MongooseSchema<IExpenseSchema>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: false,
    },
    description: {
        type: String,
        require: false,
    },
    files: {
        type: [String],
        require: false,
    },
    createDate: {
        type: Date,
        require: true,
    },
    editDate: {
        type: Date,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        require: true,
    },
    isExpense: {
        type: Boolean,
        require: true,
    },
})

const ExpenseEntity = mongoose.model<IExpenseSchema>('Expense', expenseSchema);
export { ExpenseEntity };

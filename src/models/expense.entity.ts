import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IExpense, } from "./interfaces/expense.interface";

const expenseSchema = new MongooseSchema<IExpense>({
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
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: "Apartment"
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
    }
}, {
    timestamps: { createdAt: 'createDate' },
})

const ExpenseEntity = mongoose.model<IExpense>('Expense', expenseSchema);
export { ExpenseEntity };

import mongoose, { Schema as MongooseSchema } from "mongoose";
import { IExpense, } from "./interfaces/expense.interface";

const expenseSchema = new MongooseSchema<IExpense>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
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
    apartment: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Apartment'
    }
})

const ReleaseEntity = mongoose.model<IExpense>('Expense', expenseSchema);
export { ReleaseEntity };

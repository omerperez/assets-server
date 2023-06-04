import { CreateExpenseDto, EditExpenseDto } from "../data/dto/expense.dto";
import { IExpenseSchema } from "../data/interfaces/expense.interface";
import { ExpenseEntity as expenseSchema } from "../models/expense.entity";

const create = async (expense: CreateExpenseDto, files: string[]): Promise<IExpenseSchema> => {
    try {
        const currentExpense = new expenseSchema({
            ...expense,
            files,
            isDelete: false,
            editDate: new Date(),
            createDate: new Date(),
        });
        const savedExpense: IExpenseSchema = await currentExpense.save();
        return savedExpense;
    } catch (error) {
        console.error('Error create tenant:', error);
        throw error;
    }
}

const findByObjectId = async (id: string): Promise<IExpenseSchema | null> => {
    try {
        return await expenseSchema.findById(id).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
}

const findById = async (id: string): Promise<IExpenseSchema | null> => {
    try {
        return await expenseSchema.findOne({ id }).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
}

const update = async (editExpense: EditExpenseDto, files: string[]): Promise<IExpenseSchema> => {
    try {
        const existingExpense = await findById(editExpense.id);
        if (!existingExpense) {
            throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
        }
        const updateExpense = {
            ...editExpense,
            files: editExpense.files.concat(files)
        }
        return await expenseSchema.findOneAndUpdate(existingExpense._id, updateExpense, { new: true });
    } catch (error) {
        console.error('Update tenant error:', error);
        throw error;
    }
}

const expenseRepository = {
    create, update
}

export default expenseRepository
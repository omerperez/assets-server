import { CreateExpenseDto, EditExpenseDto } from "../data/dto/expense.dto";
import { IExpenseSchema } from "../data/interfaces/expense.interface";
import { ExpenseEntity as expenseSchema } from "../models/expense.entity";

const create = async (expense: CreateExpenseDto, files: string[]): Promise<IExpenseSchema> => {
    try {
        const newExpense = new expenseSchema({
            ...expense,
            files,
            isDelete: false,
            editDate: new Date(),
            createDate: new Date(),
        });
        const savedExpense: IExpenseSchema = await newExpense.save();
        return savedExpense;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};

const findById = async (id: string): Promise<IExpenseSchema | null> => {
    try {
        return await expenseSchema.findById(id).exec();
    } catch (error) {
        console.error(`Error finding expense by ID (${id}):`, error);
        throw error;
    }
};

const update = async (editExpense: EditExpenseDto, files: string[]): Promise<IExpenseSchema> => {
    try {
        const existingExpense = await findById(editExpense.id);
        if (!existingExpense) {
            throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
        }
        const updatedFiles = [...existingExpense.files, ...files]; // Consider handling duplicates here
        const updateExpense = {
            ...editExpense,
            files: updatedFiles,
        };
        return await expenseSchema.findOneAndUpdate(existingExpense._id, updateExpense, { new: true });
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};


const expenseRepository = {
    create,
    findById,
    update
};

export default expenseRepository;

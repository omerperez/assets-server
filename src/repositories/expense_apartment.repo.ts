import { FilterQuery, Types } from "mongoose";
import { IExpenseApartmentSchema } from "../data/interfaces/relationship.interface";
import { ExpenseApartmentEntity as expenseApartmentSchema } from "../models/expenseApartment.entity";

const find = async (findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> => {
    try {
        return await expenseApartmentSchema.find(findObject);
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
}

const findPopulatedExpenses = async (findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> => {
    try {
        const expenses = await find(findObject);
        const populatedExpenses = await expenseApartmentSchema.populate(expenses, [
            { path: 'expense' },
            { path: 'apartment', select: 'name' }
        ]);

        return populatedExpenses;
    } catch (error) {
        console.error('Error finding apartment:', error);
        throw error;
    }
}

const create = async (apartmentId: Types.ObjectId | string, expenseId: Types.ObjectId | string, ownerId: Types.ObjectId | string): Promise<IExpenseApartmentSchema> => {
    try {
        const newExpense = new expenseApartmentSchema({
            expense: expenseId,
            apartment: apartmentId,
            owner: ownerId
        })
        const savedObject: IExpenseApartmentSchema = await newExpense.save();
        return savedObject;
    } catch (error) {
        console.error('Error create expense relationship:', error);
        throw error;
    }
}

const expenseApartmentRepository = {
    create, find, findPopulatedExpenses
}

export default expenseApartmentRepository
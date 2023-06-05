import { FilterQuery, Types } from "mongoose";
import { IExpenseApartmentSchema } from "../data/interfaces/relationship.interface";
import { ExpenseApartmentEntity as expenseApartmentSchema } from "../models/expenseApartment.entity";

const find = async (findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> => {
    try {
        return await expenseApartmentSchema.find(findObject);
    } catch (error) {
        console.error('Error finding expense apartment:', error);
        throw error;
    }
};

const findPopulatedExpensesApartment = async (findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> => {
    try {
        const expenses = await find(findObject);
        const populatedExpenses = await expenseApartmentSchema.populate(expenses, [
            { path: 'expense' },
            { path: 'apartment', select: 'name' },
        ]);

        return populatedExpenses;
    } catch (error) {
        console.error('Error finding populated expenses apartment:', error);
        throw error;
    }
};

const createExpenseApartment = async (apartmentId: Types.ObjectId | string, expenseId: Types.ObjectId | string, ownerId: Types.ObjectId | string): Promise<IExpenseApartmentSchema> => {
    try {
        const newExpenseApartment = new expenseApartmentSchema({
            expense: expenseId,
            apartment: apartmentId,
            owner: ownerId,
        });
        const savedExpenseApartment: IExpenseApartmentSchema = await newExpenseApartment.save();
        return savedExpenseApartment;
    } catch (error) {
        console.error('Error creating expense apartment:', error);
        throw error;
    }
};

const expenseApartmentRepository = {
    create: createExpenseApartment,
    find,
    findPopulatedExpensesApartment,
};

export default expenseApartmentRepository;

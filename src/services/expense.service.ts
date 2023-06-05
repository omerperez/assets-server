import { FilterQuery, Types } from "mongoose";
import { CreateExpenseDto, EditExpenseDto } from "../data/dto/expense.dto";
import { IExpenseSchema, IExpensesCountPerApartmentResponse } from "../data/interfaces/expense.interface";
import { IExpenseApartmentSchema } from "../data/interfaces/relationship.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import expenseRepository from "../repositories/expense.repo";
import expenseApartmentRepository from "../repositories/expense_apartment.repo";
import apartmentService from "./apartment.service";
import tenantService from "./tenant.service";
import userService from "./user.service";

const create = async (expense: CreateExpenseDto, files: string[], user: IUserSchema): Promise<IExpenseSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const currentApartment = await apartmentService.findById(expense.apartmentId, user.mobile);
        if (!currentApartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 404 });
        }
        const newExpense = await expenseRepository.create(expense, files);
        await expenseApartmentRepository.create(
            currentApartment._id, newExpense._id, currentUser._id
        )
        return newExpense;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}

const update = async (updateExpense: EditExpenseDto, files: string[], user: IUserSchema): Promise<IExpenseSchema> => {
    try {
        const { id: ownerId } = user;
        const currentUser = await userService.findById(ownerId);
        if (!currentUser) {
            throw Object.assign(new Error('User not found'), { statusCode: 404 });
        }
        const expense = await expenseRepository.update(updateExpense, files);
        return expense;
    } catch (error) {
        console.error('Create tenant error:', error);
        throw error;
    }
}
async function findPopulatedExpensesApartment(findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> {
    return await expenseApartmentRepository.findPopulatedExpensesApartment(findObject)
}

async function getApartmentsWithExpenses(userMobile: string, apartmentId: string): Promise<any> {
    try {
        const apartment = await apartmentService.findById(apartmentId, userMobile);
        if (!apartment) {
            throw Object.assign(new Error('Apartment not found'), { statusCode: 403 });
        }
        const expenses = await expenseApartmentRepository
            .findPopulatedExpensesApartment({ apartment: apartmentId });

        return {
            apartmentId: apartment._id,
            apartmentName: apartment?.name,
            expenses,
        };
    } catch (error) {
        console.error(error);
        return [];
    }
}

const find = async (findObject: FilterQuery<IExpenseApartmentSchema>): Promise<IExpenseApartmentSchema[]> => {
    return await expenseApartmentRepository.find(findObject);
}

async function getExpensesCountForeachApartment(userId: string): Promise<IExpensesCountPerApartmentResponse[]> {
    try {
        const apartments = await apartmentService.find(userId, { owner: userId }, "name");
        const apartmentIds = apartments.map((apartment) => apartment._id);

        const expenses = await find({ apartment: { $in: apartmentIds } });

        const result = await Promise.all(
            apartmentIds.map(async (apartmentId) => {
                const apartmentExpenses = expenses.filter(
                    (expense) => expense.apartment._id.toString() === apartmentId.toString()
                );

                const currentApartment = apartments.find((apartment) => apartment._id.toString() === apartmentId.toString());
                const currentTenantId = currentApartment?.currentTenant;

                let currentTenant = null;
                if (currentTenantId) {
                    currentTenant = await tenantService.findById(currentTenantId as Types.ObjectId);
                }
                const obj: IExpensesCountPerApartmentResponse = {
                    apartmentId: apartmentId.toString(),
                    apartmentName: currentApartment?.name,
                    expenseCount: apartmentExpenses.length,
                    currentTenantId: "",
                    currentTenantName: ""
                }
                if (currentTenant) {
                    obj.currentTenantId = currentTenant.id
                    obj.currentTenantName = `${currentTenant.firstName} ${currentTenant.lastName}`
                }
                return obj
            })
        );
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const expenseService = {
    create, find, update, getApartmentsWithExpenses, getExpensesCountForeachApartment, findPopulatedExpensesApartment
}

export default expenseService;